import torch
from torch import nn, optim
import torch.nn.functional as F
from block.embed_block import embed
from block.TVA_block import TVA_block_att, cross_att2
from block.decoder_block import TVADE_block , self_att
from block.revin import RevIN



class DSFormer(nn.Module):
    def __init__(self, Input_len, out_len, num_id = 4, num_layer = 1, dropout = 0.15, muti_head = 1, num_samp = 2, IF_node = True):
        """
        Input_len: History length
        out_len：future length
        num_id：number of variables
        num_layer：number of layer. 1 or 2
        muti_head：number of muti_head attention. 1 to 4
        dropout：dropout. 0.15 to 0.3
        num_samp：muti_head subsequence. 2 or 3
        IF_node:Whether to use node embedding. True or False
        """
        super(DSFormer, self).__init__()

        if IF_node:
            self.inputlen = 2 * Input_len // num_samp
        else:
            self.inputlen = Input_len // num_samp

        ### embed and encoder
        self.RevIN = RevIN(num_id)
        self.embed_layer = embed(Input_len,num_id,num_samp,IF_node)
        self.encoder = TVA_block_att(self.inputlen,num_id,num_layer,dropout, muti_head,num_samp)
        self.laynorm = nn.LayerNorm([self.inputlen])
        self.laynorm2 = nn.LayerNorm([Input_len])

        ### decorder
        self.decoder = TVADE_block(self.inputlen, num_id, dropout, muti_head)
        #self.decoder2 = TVADE_block(Input_len, num_id, dropout, muti_head)
        self.output = nn.Conv1d(in_channels = self.inputlen, out_channels=out_len, kernel_size=1)
        #add
        self.linear1 = nn.Conv1d(in_channels = self.inputlen, out_channels=Input_len, kernel_size=1)
        self.linear2 = nn.Conv1d(in_channels=num_id, out_channels=num_id, kernel_size=1)
        #in&out channel都是指-2
        self.linear3 = nn.Conv1d(in_channels=self.inputlen * 2, out_channels=self.inputlen, kernel_size=1)

        self.linear4 = nn.Conv1d(in_channels=num_id * 2, out_channels=num_id, kernel_size=1)
        #self.self_att = self_att(self.inputlen,dropout)
        self.cross = cross_att2(self.inputlen,dropout,muti_head)

    def forward(self, x):
        # Input [B,H,N]: B is batch size. N is the number of variables. H is the history length
        # Output [B,L,N]: B is batch size. N is the number of variables. L is the future length
        ### embed
        x = self.RevIN(x,'norm').transpose(-2,-1) #归一化
                                                  #Batch, feather, history
        #print("x shape",x.shape)

        x_1, x_2 = self.embed_layer(x) # 采样
                                                  #Batch, feather, c=2, self.inputlen
        #print("x_1 shape", x_1.shape,"x_2 shape", x_2.shape)

        ### encoder
        x_1 = self.encoder(x_1)
                                                  #Batch, feather, self.inputlen
        #print("encodered x_1 shape", x_1.shape)

        x_2 = self.encoder(x_2)

        # x = x_1 + x_2         #原来的
        # x = self.laynorm(x)
        #######################################  仿照多头注意力  #######################################################

        x = torch.cat((x_1, x_2), dim=1)  # Batch, feather * 2, self.inputlen
        x = self.linear4(x)

        ###################################原来的mlp######################################################
        # add
        # x_1, x_2 = x_1.transpose(-2, -1), x_2.transpose(-2, -1)
        #
        # #print("transposed x_1 shape", x_1.shape)
        #
        # x = torch.cat((x_1, x_2), dim=1) #Batch, self.inputlen * 2, feather
        #
        # #x = self.self_att(x)
        #
        #
        # x = self.linear3(x)
        # x = x.transpose(-2,-1)
        # x = self.laynorm(x)
                                        #Batch, feather, self.inputlen
        ##################################### cross_att ####################################################

        # x = self.cross(x_1,x_2)

        #add
        #print("中间",x.shape) #[batch_size, feature, input_len]

        # x = x.transpose(-2,-1) # this is for linear1
        # x = self.linear1(x)
        # x = x.transpose(-2, -1)

        # x_3 = self.linear2(x) #可以叠加 x = self.decoder(x)
        #
        # x = self.decoder(x_3) + x
        # x = self.laynorm(x)


        ### decorder         #接收[batch_size, feature, self.inputlen]
        x = self.decoder(x)
                             #输出[batch_size, feature, self.inputlen]


                                            # 接收[batch_size, input_len, feature ]
        x = self.output(x.transpose(-2,-1))
                                            # [batch_size, future , feature]
        #print("output输出", x.shape)

        x = self.RevIN(x, 'denorm')  #反归一化

        return x

if __name__ == "__main__":
    input_len = 90
    output_len = 90
    features = 5
    batch_size = 32

    # 示例用法
    model = DSFormer(Input_len=input_len, out_len=output_len, num_id=features, num_layer=1, dropout=0.15, muti_head=1,
                     num_samp=3, IF_node=True)
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    model.to(device)


    input_tensor = (torch.randn(batch_size, input_len, features)).to('cuda')  # 32 是批量大小，100 是历史长度，5 是变量数量
    output_tensor = (model(input_tensor)).to('cuda')  # 输出张量的形状为 [32, 10, 5]，其中 10 是未来长度

    # 打印输出结果
    print("输入张量的形状：", input_tensor.shape)
    print("输出张量的形状：", output_tensor.shape)

    # 画图
    import matplotlib.pyplot as plt
    import numpy as np

    # 选择一个变量
    var_index = 0

    # 选择一个样本
    sample_index = 0

    # 将张量从计算图中分离出来
    input_tensor_np = input_tensor.detach().cpu().numpy()
    output_tensor_np = output_tensor.detach().cpu().numpy()

    # # 设置字体(如果有中文的话)
    # plt.rcParams["font.family"] = "SimSun"

    # 画出历史数据和预测数据
    # plt.plot(np.arange(input_len), input_tensor_np[sample_index, :, var_index], label="history data")
    # plt.plot(np.arange(input_len, input_len + output_len), output_tensor_np[sample_index, :, var_index],
    #          label="predict data")
    # plt.legend()
    #plt.show()


