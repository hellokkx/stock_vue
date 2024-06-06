<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card style="width: 500px; margin-left: 20px;">
          <div slot="header" class="clearfix">
            <span class="bold-text">VIP 策略管理</span>
          </div>
          <el-table :data="vipStrategies" style="width: 100%;">
            <el-table-column prop="strname" label="策略名称">
              <template slot-scope="scope">
                <span class="bold-text">{{ scope.row.strname }}</span>
              </template>
            </el-table-column>
<!--            <el-table-column prop="ifpass" label="审核"></el-table-column>-->
            <el-table-column prop="strdate" label="上传日期"></el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="downloadStrategy(scope.row)">下载</el-button>
                <el-button type="danger" size="small" @click="deleteStrategy(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 20px; text-align: center;">
            <el-button type="info" plain @click="openCreateStrategyDialog" style="width: 70%">新建策略</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="width: 500px; margin-right: 20px;">
          <div slot="header" class="clearfix">
            <span class="bold-text">普通策略管理</span>
          </div>
          <el-table :data="normalStrategies" style="width: 100%;">
            <el-table-column prop="strname" label="策略名称">
            <template slot-scope="scope">
                <span class="bold-text">{{ scope.row.strname }}</span>
              </template>
            </el-table-column>
<!--            <el-table-column prop="ifpass" label="审核"></el-table-column>-->
            <el-table-column prop="strdate" label="上传日期"></el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="downloadStrategy(scope.row)">下载</el-button>
                <el-button type="danger" size="small" @click="deleteStrategy(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 20px; text-align: center;">
            <el-button type="info" plain @click="openCreateStrategyDialog" style="width: 70%">新建策略</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="上传策略" :visible.sync="dialogVisible" width="35%">
      <el-form :model="form">
        <el-form-item label="策略名" label-width="80px">
          <el-input v-model="form.name" placeholder="请输入策略名" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="策略代码" label-width="80px">
          <div>
            <el-upload
                class="upload-demo"
                action="#"
                :limit="1"
                :on-success="handleSuccess"
                :before-remove="beforeRemove"
                :on-exceed="handleExceed"
                multiple
                :auto-upload="false"
            >
              <!-- 使用v-if指令根据fileList是否为空来动态显示提示 -->
              <template v-if="noFileinList" slot="tip">
                <div class="el-upload__tip">暂无文件上传</div>
              </template>
              <el-button size="small" type="primary" @click="clearno">点击上传</el-button>
            </el-upload>
            <el-tag
                v-for="(file, index) in fileList"
                :key="index"
                closable
                @close="handleClose(index)"
                type="info"
                hit
            >{{ file.name }}</el-tag>
          </div>
        </el-form-item>
        <el-form-item label="策略等级" label-width="80px">
          <el-select v-model="form.level" placeholder="请选择策略">
            <el-option label="普通策略" value="User"></el-option>
            <el-option label="VIP策略" value="Vip"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="createStrategy">新建策略</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getStrategy,uploadStrategy} from "@/api";

export default {
  data() {
    return {
      noFileinList:true,
      vipStrategies: [],
      normalStrategies: [],
      // strategyApproval: [
      //   { name: '多因子进阶策略', userId: '0120301023', account: '1238797123', nickname: '小红', address: '广东深圳' },
      // ],
      dialogVisible: false,
      form: {
        name: '',
        code: '',
        level: ''
      },
      fileList: []  // 初始化 fileList
    };
  },
  mounted() {
    this.getStrategyData()
  },

  methods: {
    //获取策略数据
    getStrategyData() {
      var strname=''
      getStrategy({strname}).then(res=>{
        if(res.code===200){
          console.log(res)

          // 筛选出strgreade为"User"的数据作为VIP策略数据
          this.vipStrategies = res.response.filter(item => item.strgrade === "Vip");
          this.normalStrategies = res.response.filter(item => item.strgrade === "User");

          // 遍历数据，处理日期属性
          this.vipStrategies.forEach(item => {
            // 将日期字符串转换为 Date 对象
            let date = new Date(item.strdate);

            // 获取年月日信息
            let year = date.getFullYear();
            let month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1
            let day = date.getDate().toString().padStart(2, '0');

            // 拼接日期字符串
            item.strdate = `${year}-${month}-${day}`;
          });

          // 遍历数据，处理日期属性
          this.normalStrategies.forEach(item => {
            // 将日期字符串转换为 Date 对象
            let date = new Date(item.strdate);

            // 获取年月日信息
            let year = date.getFullYear();
            let month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1
            let day = date.getDate().toString().padStart(2, '0');

            // 拼接日期字符串
            item.strdate = `${year}-${month}-${day}`;
          });
        }
        else{
          this.$notify.error(res.msg)
        }
      }).catch(err=>{
        //异常处理
        console.log(err)
        this.$message.error(err.data)
      })
    },

    downloadStrategy(row) {
      console.log('Download:', row);
      const fileName = row.strname + ".py";
      // const filePath = "/code/" + fileName; // 注意，这里使用相对路径
      const filePath = "http://localhost:8080/code/" + fileName; // 注意，这里使用相对路径

      console.log(filePath);

      // 创建一个隐藏的a标签
      const link = document.createElement('a');
      link.href = filePath;
      link.download = fileName;

      // 将a标签添加到文档中并触发点击事件
      document.body.appendChild(link);
      link.click();

      // 点击完成后从文档中移除a标签
      document.body.removeChild(link);
    },

    deleteStrategy(row) {
      console.log('Delete:', row);
    },

    //----------------------------------------新建策略---------------------------------------
    createStrategy() {
      console.log('Create Strategy', this.form);
      // form.name,form.level
      var strname=this.form.name
      var strgrade=this.form.level
      uploadStrategy({strname,strgrade}).then(res=>{
        if(res.code===200){
          console.log(res)
          this.dialogVisible = false;
        }
      }).catch(err=>{
        //异常处理
        console.log(err)
        this.$message.error(err.data)
      })
      this.form.name=''
      this.form.level=''
    },

    //-----------------------------------------------------------------------------------
    reviewStrategy(row) {
      console.log('Review:', row);
    },
    openCreateStrategyDialog() {
      this.fileList = []; // 清空 fileList
      this.dialogVisible = true;
    },
    cancel(){
      this.dialogVisible = false;
      this.fileList = []; // 清空 fileList
      this.form.name='';
      this.form.level=''
    },
    clearno() {
      this.noFileinList=false
    },
    handleSuccess(response, file) {
      this.fileList.push(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleClose(index) {
      this.fileList.splice(index, 1);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
  }
};
</script>

<style scoped>
.el-card {
  padding: 5px;
}

/*.el-button {*/
/*  margin-right: 3px;*/
/*}*/

.bold-text {
  font-weight: bold;
}

.dialog-footer {
  text-align: right;
}
</style>
