<template>
  <div>

    <div class="container">
      <div class="handle-box">
        <el-button
            type="primary"
            class="handle-add mr10"
            @click="delAllSelection"
        >批量添加</el-button>
        <el-select  v-model="selectCode"
                    clearable
                    filterable
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
          :default-sort = "{prop: 'stockId', order: 'transactionDate'}"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="stockId" label="ID" align="center"></el-table-column>
        <el-table-column prop="stockName" label="股票名称" align="center"></el-table-column>
        <el-table-column prop="stockSymbol" label="股票代码" width="100" align="center"></el-table-column>
        <el-table-column prop="area" label="所属地区" width="110" align="center"></el-table-column>
        <el-table-column prop="industry" label="所属行业" align="center"></el-table-column>
        <el-table-column prop="listDate" label="上市日期" align="center"></el-table-column>
        <el-table-column prop="tsCode" label="全球唯一标识符" align="center"></el-table-column>

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
export default {
  name: 'stockDetail',
  data() {
    return {
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
      listDate: {},
      name:'',
      symbol:'',
      tscode: ''
      //交易属性
      // id: '',
      // trade_date: '',
      // open: '',
      // close: '',
      // high: '',
      // low: '',
      // pre_close: '',
      // vol: '',
      // amount: ''
    };
  },
  created() {
    this.getVolumes();
    this.getData();
  },
  methods: {
    //获取股票数据
    getData() {
       axios.get('https://183.232.249.91:11514/swagger-ui.html#/stock/getAllStock')
          .then(response => {
             this.tableData = response.data;
           })
           .catch(error => {
             console.error(error);
           });
    },



    //得到select选框当前选中
    // getSelectValue(value){
    //   this.stockCode = this.options[this.selectCode].label;
    //   this.query.pageIndex = 1;
    //   this.getData();
    // },
    // 多选操作
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // },
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
  margin-right: 10px;
}
</style>
