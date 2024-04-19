<template>
  <div>

    <div class="container">
      <div class="handle-box">
        <el-button
            type="primary"
            class="handle-add mr10"
            @click="addStockList"
        >批量添加</el-button>
        <el-button
            type="danger"
            class="handle-add mr10"
            @click="deleteStockList"
        >批量删除</el-button>
        <el-select  v-model="selectCode"
                    clearable
                    filterable
                    class="getSelect"
                    @change="getSelectValue()"
                    placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
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
        <el-table-column type="selection" width="55" align="center"></el-table-column>
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
import {deleteUser, getStocklist, getUserList} from "@/api";

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
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //获取用户数据
    getData() {
      getUserList().then(res=>{
        if(res.code===200){
          console.log(res)
          this.tableData=res.userList
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
          this.$notify.error(res.msg)
        }
      }).catch(err=>{
        //异常处理
        console.log(err)
        this.$message.error(err.data)
      })
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
