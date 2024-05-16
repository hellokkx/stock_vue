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

      </div>
      <el-table
          :data="tableData"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
          :default-sort = "{prop: 'symbol', order: 'transactionDate'}"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="symbol" label="股票代码" align="center"></el-table-column>
        <el-table-column prop="name" label="股票名称" align="center"></el-table-column>
<!--        <el-table-column prop="symbol" label="全球唯一标识符" align="center"></el-table-column>-->
        <el-table-column prop="area" label="所属地区" align="center"></el-table-column>
        <el-table-column prop="industry" label="所属行业" align="center"></el-table-column>
        <el-table-column prop="listdate" label="上市日期" align="center"></el-table-column>

        <el-table-column label="添加收藏" align="left" header-align="50px">
          <template v-slot="scope">
            <el-button type="success" plain @click="add(scope.row)">收藏</el-button>
          </template>
        </el-table-column>

      </el-table>
<!--      <div class="pagination">-->
<!--        <el-pagination-->
<!--            background-->
<!--            layout="total, prev, pager, next"-->
<!--            :current-page="query.pageIndex"-->
<!--            :page-size="query.pageSize"-->
<!--            :total="pageTotal"-->
<!--            @current-change="handlePageChange"-->
<!--        ></el-pagination>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {addToCollection, getStocklist} from "@/api";
import Cookies from "js-cookie";

export default {
  name: 'StockList',
  data() {
    return {
      user:Cookies.get('user')?JSON.parse(Cookies.get('user')):{},
      //表格属性
      tableData: [],

    };
  },
  created() {
    // this.getVolumes();
    this.token = localStorage.getItem('token')
    console.log("token"+this.token)
    this.getData();
  },
  methods: {
    //获取股票数据
    getData() {
      getStocklist().then(res=>{
        if(res.code===200){
          console.log(res)
          this.tableData=res.response

          // 遍历数据，处理日期属性
          this.tableData.forEach(item => {
            // 将日期字符串转换为 Date 对象
            let date = new Date(item.listdate);

            // 获取年月日信息
            let year = date.getFullYear();
            let month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1
            let day = date.getDate().toString().padStart(2, '0');

            // 拼接日期字符串
            item.listdate = `${year}-${month}-${day}`;
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

    //将某只股票添加到收藏夹内
    add(row) {
      this.$prompt('请输入收藏夹ID', '添加至收藏夹', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d+$/,
        inputErrorMessage: '收藏夹ID必须为数字',
        inputPlaceholder: '请输入收藏夹ID'
      }).then(({ value: collectionId }) => {
        // 检查收藏夹ID是否为空
        if (!collectionId.trim()) {
          this.$message.error('收藏夹ID不能为空');
          // return;
        }
        else{
          this.addToCollection(row.symbol,collectionId);
        }
      }).catch(() => {
        // 用户点击取消后的操作
        // 可以不做任何处理
      });
    },
    addToCollection(symbol,collectionid) {
      // 调用后端接口添加至收藏夹
      addToCollection({symbol,collectionid}).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$message.success("收藏成功");
          this.getData(); // 重新加载数据
        }
      }).catch(err => {
        console.log(err);
        this.$message.error(err.data);
      });
    },

    //后面没用的
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
    },
    selectCode(){},
    getSelectValue(){},

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
</style>
