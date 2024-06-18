import pandas as pd
from torch.utils.data import Dataset, DataLoader
import torch
import torch.nn as nn
import torch.optim as optim
from DSFormer import DSFormer
from tqdm import tqdm

def train(dataloader, model, loss_fn, optimizer):
    size = len(dataloader.dataset)
    model.train()
    for batch, (X, y) in enumerate(dataloader):
        X, y = X.to(device), y.to(device)

        optimizer.zero_grad()
        # Compute prediction error
        pred = model(X)
        loss = loss_fn(pred, y)

        # Backpropagation
        loss.backward()
        optimizer.step()


        if batch % 100 == 0:
            loss, current = loss.item(), (batch + 1) * len(X)
            # loss.item()将tensor转化为python浮点数（即提取实际的损失值）
            #计算到目前为止已处理的样本总数（假设X表示您的数据集）。batch + 1考虑了当前正在处理的批次
            print(f"loss: {loss:>7.3f}  [{current:>7d}/{size:>7d}]   (trained/total)")
            # {loss: > 7f}：将损失值格式化为带有7位小数的浮点数。
            #>   表示右对齐。这意味着数字将在字段内右对齐，填充空格在数字的左侧。
            #7   表示字段的宽度为7个字符。如果数字不足7个字符，将使用空格填充。
            #.3f 表示浮点数的格式，保留3位小数。

            # {current: > 7d}：将当前样本数格式化为至少7位数字（右对齐）的整数。
            # {size: > 7d}：将总数据集大小（假设size表示总样本数）格式化为至少7位数字（右对齐）的整数。

def test(dataloader, model, loss_fn):
    size = len(dataloader.dataset)# 获取测试数据集的总样本数（只不过这里没用）
    num_batches = len(dataloader)# 获取数据加载器中的批次数
    model.eval()# 将模型设置为评估模式（不进行梯度更新）
    test_loss = 0# 初始化测试损失和正确预测的计数
    with torch.no_grad():# 在不计算梯度的上下文中进行测试
        for X, y in dataloader:
            X, y = X.to(device), y.to(device)
            pred = model(X)
            test_loss += loss_fn(pred, y).item()#这里要注意看看loss_fn是怎么定义的
    test_loss /= num_batches # 计算平均损失

    print(f"Test Error: \n Avg loss: {test_loss:>8f} \n")


class MultivariateTimeSeriesDataset(Dataset):
    def __init__(self, csv_file, history_window=50, future_window=50):
        """
        Args:
            csv_file (str): 数据集文件的路径。
            history_window (int): 历史窗口大小。
            future_window (int): 未来窗口大小。
        """
        data = pd.read_csv(csv_file)
        del data['date']  # 删除第一列

        # 将数据转换为NumPy数组
        numpy_data = data.values

        # 将NumPy数组转换为PyTorch张量
        self.data = torch.tensor(numpy_data, dtype=torch.float32)

        self.history_window = history_window
        self.future_window = future_window
        self.num_id = len(self.data[0])

    def __len__(self):
        return len(self.data) - self.history_window - self.future_window + 1
        #使得可以使用 len(object)

    def __getitem__(self, idx): #这个方法允许对象使用索引，切片
        # 获取历史窗口和未来窗口的数据
        history_data = self.data[idx:idx + self.history_window]
        future_data = self.data[idx + self.history_window:idx + self.history_window + self.future_window]

        return history_data, future_data
        # 这个方法允许对象使用索引，切片
        #例如：object = class()
        #     object[x]


if __name__ == "__main__" :

    history_win = 10
    future_win = 10

    # Get cpu, gpu or mps device for training.
    device = (
        "cuda"
        if torch.cuda.is_available()
        else "mps"
        if torch.backends.mps.is_available()
        else "cpu"
        # 'cpu'
    )
    print(f"Using {device} device")

    # 创建数据集实例
    dataset = MultivariateTimeSeriesDataset('./raw_data/ETTh1/ETTh1.csv', history_window=history_win, future_window=future_win)

    num_variables = dataset.num_id

    batch_size = 16
    train_loader = DataLoader(dataset, batch_size=batch_size, shuffle=True, num_workers=4, drop_last=True)

    model = DSFormer(Input_len=history_win, out_len=future_win, num_id=num_variables, num_layer=1, dropout=0.2, muti_head=1, num_samp=2,
                     IF_node=True).to(device)
    #print(model)

    # 假设你已经有了一个 DSFormer 实例 model
    loss_fn = nn.MSELoss()
    optimizer = optim.SGD(model.parameters(), lr=1e-3)

    # # 训练模型
    # num_epochs = 1
    # model.train()
    # for epoch in range(num_epochs):
    #     for data, targets in train_loader:
    #         data, targets = data.to(device), targets.to(device)
    #         optimizer.zero_grad()
    #         outputs = model(data)
    #         loss = loss_fn(outputs, targets)
    #         loss.backward()
    #         optimizer.step()

    epochs = 5
    for t in range(epochs):
        print(f"Epoch {t + 1}\n-------------------------------")
        #训练
        train(train_loader, model, loss_fn, optimizer)

        # #测试
        # test(test_dataloader, model, loss_fn)

        # 预测
        # model.eval()
        # with torch.no_grad():
        #     test_data = torch.randn(batch_size, 10, 7)  # 准备你的测试数据
        #     predictions = model(test_data.to(device))
        #     print(predictions)
        #     print(predictions.shape)

    print("Done!")







