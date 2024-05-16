<template>
  <div>

    <div class="container">
      <!--搜索表单-->
      <div style="margin-bottom: 20px">
        <el-input style="width: 200px" placeholder="请输入id" v-model="input.id"></el-input>
        <el-input style="width: 200px;margin-left: 10px" placeholder="请输入用户名" v-model="input.useraccount"></el-input>
<!--        <el-input style="width: 240px" placeholder="请输入id"></el-input>-->
        <el-button style="margin-left: 5px" type="info" plain @click="getDataByid">
          <i class=" el-icon-search"></i>
          <span>搜索</span>
        </el-button>
        <el-button style="margin-left: 5px" type="warning" plain @click="reset">
          <i class=" el-icon-refresh"></i>
          <span>重置</span>
        </el-button>
      </div>


      <el-table
          :data="tableData"
          border
          stripe
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
          :default-sort = "{prop: 'userid', order: 'transactionDate'}"
      >
<!--        <el-table-column type="selection" width="55" align="center"></el-table-column>-->
        <el-table-column prop="userid" label="用户id" width="70" align="center"></el-table-column>
        <el-table-column prop="account" label="账号" align="center"></el-table-column>
        <el-table-column prop="ifbanned" label="权限等级" align="center"></el-table-column>
        <!--        <el-table-column prop="symbol" label="全球唯一标识符" align="center"></el-table-column>-->
        <el-table-column prop="nickname" label="昵称" width="150" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="150" align="center"></el-table-column>
        <el-table-column prop="address" label="地址" align="center"></el-table-column>
        <el-table-column prop="signal" label="标志" align="center"></el-table-column>
        <el-table-column prop="birthday" label="生日" width="150" align="center"></el-table-column>

        <el-table-column label="操作" align="left" header-align="50px">
          <template v-slot="scope">
            <el-button type="danger" plain @click="del(scope.row.userid)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <div class="pagination">
<!--        <el-pagination-->
<!--            background-->
<!--            layout="total, prev, pager, next"-->
<!--            :current-page="query.pageIndex"-->
<!--            :page-size="query.pageSize"-->
<!--            :total="pageTotal"-->
<!--            @current-change="handlePageChange"-->
<!--        ></el-pagination>-->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {deleteUser, getStocklist, getUserList,getUserById,getUserByAccount} from "@/api";

export default {
  name: 'StockList',
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 10,
        pageTotal:1,
      },
      //表格属性
      tableData: [],
      input:{
        useraccount:'',
        id:'',
      },
    };
  },
  created() {
    this.token = localStorage.getItem('token')
    this.getData();
  },

  methods: {
    //重置
    reset(){  //重置
      this.input.id=''
      this.input.useraccount=''
      this.getData()
    },
    //获取用户数据
    getData() {
      getUserList().then(res=>{
        console.log("res"+res)
        if(res.code===200){
          console.log(res)
          this.tableData=res.response
          // this.$message.success("查询成功")
          // 遍历数据，处理日期属性
          this.tableData.forEach(item => {
            // 将日期字符串转换为 Date 对象
            let birthday = new Date(item.birthday);

            // 获取年月日信息
            let year = birthday.getFullYear();
            let month = (birthday.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1
            let day = birthday.getDate().toString().padStart(2, '0');

            // 拼接日期字符串
            item.birthday = `${year}-${month}-${day}`;
          });

        }
        else{
          this.$message.error(res.msg)
        }
      }).catch(err=>{
        //异常处理
        console.log(err)
        this.$message.error(err.data)
      })
    },


    //根据id获取用户数据
    getDataByid() {
      console.log("gettokken"+this.token)
      if(this.input.id!==''){
        getUserById({userId:this.input.id}).then(res=>{
          console.log("res"+res)
          if(res.code===200){
            console.log(res)
            const responseData = {
              userid: res.response.userid,
              account: res.response.account,
              birthday:res.response.birthday,
              email:res.response.email,
              ifbanned:res.response.ifbanned,
              nickname:res.response.nickname,
              sex:res.response.sex,
              signal:res.response.signal,
              address:res.response.address
              // 其他属性...
            };

            const dataList = [responseData];
            console.log(dataList)

            this.tableData=dataList

            // 遍历数据，处理日期属性
            this.tableData.forEach(item => {
              // 将日期字符串转换为 Date 对象
              let birthday = new Date(item.birthday);

              // 获取年月日信息
              let year = birthday.getFullYear();
              let month = (birthday.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1
              let day = birthday.getDate().toString().padStart(2, '0');

              // 拼接日期字符串
              item.birthday = `${year}-${month}-${day}`;
            });

          }
          else{
            this.$message.error(res.msg)
          }
        }).catch(err=>{
          //异常处理
          console.log(err)
          this.$message.error(err.data)
        })
      }
      else if(this.input.account!==''){
        getUserByAccount({userAccount:this.input.useraccount}).then(res=>{
          console.log("res"+res)
          if(res.code===200){
            console.log(res)
            const responseData = {
              userid: res.response.userid,
              account: res.response.account,
              birthday:res.response.birthday,
              email:res.response.email,
              ifbanned:res.response.ifbanned,
              nickname:res.response.nickname,
              sex:res.response.sex,
              signal:res.response.signal,
              address:res.response.address
              // 其他属性...
            };

            const dataList = [responseData];
            console.log(dataList)

            this.tableData=dataList

            // 遍历数据，处理日期属性
            this.tableData.forEach(item => {
              // 将日期字符串转换为 Date 对象
              let birthday = new Date(item.birthday);

              // 获取年月日信息
              let year = birthday.getFullYear();
              let month = (birthday.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1
              let day = birthday.getDate().toString().padStart(2, '0');

              // 拼接日期字符串
              item.birthday = `${year}-${month}-${day}`;
            });

          }
          else{
            this.$message.error(res.msg)
          }
        }).catch(err=>{
          //异常处理
          console.log(err)
          this.$message.error(err.data)
        })
      }
      else{
        this.$message.info("当前查询内容为空")
      }
    },

    //删除用户数据
    del(id){
      console.log(id)

      deleteUser({id}).then(res=>{
        if(res.code===200){
          console.log(res)
          this.$message.success("删除成功")


          // 遍历数据，处理日期属性
          this.tableData.forEach(item => {
            // 将日期字符串转换为 Date 对象
            let birthday = new Date(item.birthday);

            // 获取年月日信息
            let year = birthday.getFullYear();
            let month = (birthday.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1
            let day = birthday.getDate().toString().padStart(2, '0');

            // 拼接日期字符串
            item.birthday = `${year}-${month}-${day}`;
          });

        }
      }).catch(err=>{
        //异常处理
        console.log(err)
        this.$message.error(err.data)
      })

    },

    addStockList(){

    },
    deleteStockList(){

    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val);
      this.getData();
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  max-width: 98%;
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
</style>
