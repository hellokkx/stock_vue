<template>
  <div>
    <!--搜索表单-->
    <div style="margin: 20px">
      <el-input style="width: 200px" placeholder="请输入股票名称" v-model="input.name"></el-input>
      <el-input style="width: 200px;margin-left: 10px" placeholder="请输入股票代码" v-model="input.symbol"></el-input>
      <el-button style="margin-left: 5px" type="info" plain @click="getDataBySymbolORName">
        <i class=" el-icon-search"></i>
        <span>搜索</span>
      </el-button>
      <el-button style="margin-left: 5px" type="warning" plain @click="reset">
        <i class=" el-icon-refresh"></i>
        <span>重置</span>
      </el-button>
    </div>

    <div class="container">
<!--      表格-->
      <el-table
          :data="paginatedData"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
          :default-sort="{ prop: 'symbol', order: 'transactionDate' }"
          style="margin-top: 10px;margin-bottom: 1px;margin-left: 20px"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="symbol" label="股票代码" align="center"></el-table-column>
        <el-table-column prop="name" label="股票名称" align="center"></el-table-column>
        <el-table-column prop="area" label="所属地区" align="center"></el-table-column>
        <el-table-column prop="industry" label="所属行业" align="center"></el-table-column>
        <el-table-column prop="listdate" label="上市日期" align="center"></el-table-column>
        <el-table-column label="添加收藏" align="left" header-align="50px">
          <template v-slot="scope">
            <el-button type="success" plain @click="add(scope.row)">收藏</el-button>
          </template>
        </el-table-column>
      </el-table>

<!--      分页处理-->
      <el-pagination
          background
          layout="total, prev, pager, next"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          :total="tableData.length"
          @current-change="handlePageChange"
          style="margin-top: 20px;margin-left: 20px"
      ></el-pagination>
    </div>

    <!-- 收藏夹选择 Dialog -->
    <el-dialog :visible.sync="dialogVisible" title="添加至收藏夹" width="400px">
      <el-select v-model="selectedCollectionId" placeholder="请选择收藏夹" size="medium" style="width: 300px;margin-left: 30px">
        <el-option
            v-for="item in collectionOptions"
            :key="item.collectionid"
            :label="item.collectionname"
            :value="item.collectionid">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submitCollection">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>


<script>
import axios from 'axios'
import {addToCollection, getStocklist, getStockByName,getStockBySymbol,getCollection} from "@/api";
import Cookies from "js-cookie";

export default {
  name: 'StockList',
  data() {
    return {
      user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {},
      // 表格属性
      tableData: [],
      currentPage: 1,  // 当前页
      pageSize: 8,    // 每页显示的行数
      input: {
        name:'',
        symbol:''
      },
      dialogVisible: false,
      selectedCollectionId: '',
      collectionOptions: [
        { collectionid: '1', collectionname: '收藏夹1' },
        { collectionid: '3', collectionname: '收藏夹3' },
        // 添加更多选项
      ]
    };
  },
  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.tableData.slice(start, end);
    },
  },
  created() {
    // this.getVolumes();
    this.token = localStorage.getItem('token')
    console.log("token" + this.token)
    this.getData();
  },
  methods: {
    //-------------------------------------- 获取股票数据---------------------------------------------
    getData() {
      getStocklist().then(res => {
        if (res.code === 200) {
          this.tableData = this.formatData(res.response);
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        // 异常处理
        console.log(err)
        this.$message.error(err.data)
      })
    },

    //----------------------------------- 将某只股票添加到收藏夹内------------------------------------
    add(row) {
      this.selectedRow = row;
      this.dialogVisible = true;

      /* 获取收藏夹名称 */
      var userid=this.user.userid
      var collectionname=''
      getCollection({userid,collectionname}).then(res => {
        if (res.code === 200) {
          this.collectionOptions = res.response
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        // 异常处理
        console.log(err)
        this.$message.error(err.data)
      })

    },
    submitCollection() {
      if (!this.selectedCollectionId) {
        this.$message.error('请选择一个收藏夹');
        return;
      }
      this.addToCollection(this.selectedRow.symbol, this.selectedCollectionId);
      this.dialogVisible = false;
      this.selectedCollectionId=''
    },
    addToCollection(symbol, collectionid) {
      // 调用后端接口添加至收藏夹
      addToCollection({ symbol, collectionid }).then(res => {
        if (res.code === 200) {
          this.$message.success("收藏成功");
          this.getData(); // 重新加载数据
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        console.log(err);
        this.$message.error(err.data);
      });
    },

    cancel(){
      this.dialogVisible = false
      this.selectedCollectionId=''
    },

    //---------------------------------------分页处理-------------------------------------------------
    handlePageChange(val) {
      this.currentPage = val;
    },

    //------------------------------------------根据id获取用户数据--------------------------------------
    getDataBySymbolORName() {
      if (this.input.name !== '') {
        var name=this.input.name
        getStockByName({ name: name }).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.tableData = this.formatData(res.response);
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.data)
        })
      }
      else if (this.input.symbol !== '') {
        var symbol=this.input.symbol
        getStockBySymbol({ symbol: symbol }).then(res => {
          if (res.code === 200) {
            this.tableData = this.formatData(res.response);
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.data)
        })
      } else {
        this.$message.info("当前查询内容为空")
      }
    },

    //-----------------------------------处理日期数据----------------------------------------
    formatData(data) {
      return data.map(item => {
        let listdate = new Date(item.listdate);
        let year = listdate.getFullYear();
        let month = (listdate.getMonth() + 1).toString().padStart(2, '0');
        let day = listdate.getDate().toString().padStart(2, '0');
        return {
          ...item,
          listdate: `${year}-${month}-${day}`,
          ...item
        };
      });
    },

    //------------------------------------------重置------------------------------------------
    reset(){
      this.input.symbol=''
      this.input.name=''
      this.getData()
    },

    handleSelectionChange(){},
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
.getSelect {
  margin-left: 10px;
}
</style>

