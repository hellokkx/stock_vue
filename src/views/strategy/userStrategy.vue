<template>
  <div>


    <el-card style="width: 1030px; margin-left: 20px;margin-top: 10px">
      <div class="container">
        <!--      <div class="handle-box">-->
        <h3 style="margin-left: 20px">精选策略</h3>

        <el-table
            :data="tableData"
            border
            stripe
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
            @selection-change="handleSelectionChange"
            :default-sort = "{prop: 'symbol', order: 'transactionDate'}"
        >

          <el-table-column prop="strid" label="id" width="55" align="center"></el-table-column>
          <el-table-column prop="strname" label="策略名" align="center"></el-table-column>
          <el-table-column prop="account" label="上传者账号" align="center"></el-table-column>
          <!--        <el-table-column prop="symbol" label="全球唯一标识符" align="center"></el-table-column>-->
<!--          <el-table-column prop="ifpass" label="是否在策略池中" align="center"></el-table-column>-->
          <el-table-column prop="strdate" label="上传日期" align="center"></el-table-column>
          <el-table-column prop="strgrade" label="策略等级" align="center"></el-table-column>
          <el-table-column prop="introduction" label="策略简介" align="center"></el-table-column>

          <el-table-column label="精选策略" width="150" align="center">
            <template v-slot="scope">
              <el-button type="info" plain @click="visable(scope.row)">预览</el-button>
              <el-button type="primary" plain @click="downloadStrategy(scope.row)">下载</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </el-card>

    <!-- 审核盒子 -->
    <el-dialog :visible.sync="auditVisible" width="60%" style="margin-top: -40px">
      <div class="box-container">
        <!--        Code部分-->
        <div class="code">
          <div class="toolbar">
            <h3 style="flex-grow: 1;  display: flex;  justify-content: center;margin-left: 65px">{{ strategy.name }}</h3>
            <div style="display: flex;justify-content: flex-end;">
              <el-button icon="el-icon-search"></el-button>
              <el-button icon="el-icon-setting"></el-button>
            </div>
          </div>
          <div class="code-window">
            <pre v-html="highlightedCode"><code>{{ code }}</code></pre>
          </div>
        </div>
      </div>


    </el-dialog>


  </div>
</template>

<script>
import Prism from 'prismjs';
import 'prismjs/components/prism-python'; // 导入Python语言的语法规则
import 'prismjs/themes/prism-tomorrow.css';
import {addToCollection, checkStrategy, getStocklist, getUserStrategy} from "@/api";
import Cookies from "js-cookie";

export default {
  name: 'StockList',
  data() {
    return {
      strifpass:'',
      strategrade:'',
      auditVisible:false,
      user:Cookies.get('user')?JSON.parse(Cookies.get('user')):{},
      //表格属性
      tableData: [],
      strategy: {
        name: '',
        account: '',
        id:'',
      },
      code: '',
    };
  },

  //-------------------------------------代码高亮----------------------------------
  computed: {
    highlightedCode() {
      let fileName = "低估价值选股策略.py";
      if(this.strategy.id<15){
        fileName = this.strategy.name + ".py";
      }
      // const fileName =  "code.py";
      const filePath = "http://localhost:8080/code/" + fileName; // 使用 public/code 路径

      console.log(filePath);

      // 发送 AJAX 请求获取代码内容
      fetch(filePath)
          .then(response => response.text())
          .then(data => {
            this.code = data; // 将代码内容存储在组件的 data 中
          })
          .catch(error => {
            console.error('Error fetching code:', error);
            this.$message.error('无法下载代码文件');
          });

      let language = Prism.languages.python; // 你的代码的语言
      return Prism.highlight(this.code, language,'python');
    },
  },

  created() {
    this.token = localStorage.getItem('token')
    console.log("token"+this.token)
    this.getData();
  },

  methods: {
    visable(row){
      this.auditVisible=true
      this.strifpass=row.ifpass
      this.strategrade=row.strgrade
      this.strategy = { name: row.strname, account: row.account, id: row.strid};
    },

    //-------------------------------------------获取策略数据------------------------------------
    getData() {
      var strname=''
      getUserStrategy({strname}).then(res=>{
        if(res.code===200){
          console.log(res)
          this.tableData=res.response

          // 遍历数据，处理日期属性
          this.tableData.forEach(item => {
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


    //------------------------------------取消------------------------------
    cancel(){
      this.auditVisible=false
      this.strategrade=''
      this.ifpass=''
    },

    //------------------------------------下载策略数据---------------------------------------
    downloadStrategy(row) {
      console.log('Download:', row);
      const fileName = row.strname + ".py";
      // const filePath = "/code/" + fileName; // 注意，这里使用相对路径

      let filePath = "http://localhost:8080/code/" + "小市值策略.py"; // 注意，这里使用相对路径
      if(row.strid<14){
        filePath = "http://localhost:8080/code/" + fileName; // 注意，这里使用相对路径
      }
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

  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  max-width: 900px;
  padding: 0px;
  margin-right: 50px;
}
.handle-box {
  margin-bottom: 20px;
}

.table {
  width: 100%;
  font-size: 14px;
}
.mr10 {
  /*margin-right: 10px;*/
}
.getSelect{
  margin-left: 10px;
}

.info-row {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 17px;
  margin-left: 25px;
}

.info-row .label {
  flex: 2;
  display: flex;
  justify-content: flex-start; /* 左对齐 */
  align-items: center;
  font-weight: bold; /* 加粗 */
}

.info-row .content {
  flex: 3;
  display: flex;
  align-items: flex-start;
}

.dialog-footer{
  text-align: center;
  margin-top: 40px;
}
.toolbar {
  display: flex;
  justify-content: center;
  align-items: center;
}
.code-window {
  background-color: black;
  color: white;
  padding: 10px;
  height: 380px;
  overflow: auto;
}
.code-window pre {
  margin: 0;
}
.code-window code {
  font-family: monospace;
}


.box-container {
  display: flex;
  justify-content: space-between;
}

.code {
  margin-top: -25px;
  width: 100%;
}


</style>
