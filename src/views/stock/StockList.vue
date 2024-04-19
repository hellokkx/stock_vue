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
            <el-button type="success" plain @click="add(scope.row.symbol)">收藏</el-button>
          </template>
        </el-table-column>

      </el-table>
      <div class="pagination">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="query.pageIndex"
            :page-size="query.pageSize"
            :total="pageTotal"
            @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {addCollection, getStocklist} from "@/api";
import Cookies from "js-cookie";

export default {
  name: 'StockList',
  data() {
    return {
      user:Cookies.get('user')?JSON.parse(Cookies.get('user')):{},
      query: {
        address: '上海股票',
        pageIndex: 1,
        pageSize: 10
      },
      //表格属性
      stockCode: 'sh600297',
      tableData: [],
      multipleSelection: [],
      pageTotal: 1,
      form: {},
      idx: -1,
      options: '',
      selectCode: '',
      //股票属性
      area:'',
      industry:'',
      listdate: '',
      name:'',
      symbol:'',
      tsCode: ''
    };
  },
  created() {
    // this.getVolumes();
    this.getData();
  },
  methods: {
    //获取股票数据
    getData() {
      getStocklist().then(res=>{
        // console.log(res.code)
        if(res.code===200){
          console.log(res)
          this.tableData=res.stockList
          // this.$message.success("查询成功")

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

    add(symbol){
      var userId=this.user.userid
      addCollection({symbol,userId}).then(res=>{
        // console.log(res.code)
        if(res.code===200){
          console.log(res)
          this.$message.success("收藏成功")
          this.getData()
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
