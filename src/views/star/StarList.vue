<template>
  <div style="margin-top: 10px;margin-right: 20px;margin-left:10px">


    <!--搜索表单-->
    <div style="margin-bottom: 20px">
      <el-input style="width: 240px" placeholder="请输入股票名称" v-model="params.dname"></el-input>
      <el-button style="margin-left: 5px" type="info" plain @click="load">
        <i class=" el-icon-search"></i>
        <span>搜索</span>
      </el-button>
      <el-button style="margin-left: 5px" type="warning" plain @click="reset">
        <i class=" el-icon-refresh"></i>
        <span>重置</span>
      </el-button>
    </div>

    <div class="table">
      <!--stripe显示斑马纹-->
      <el-table :data="tableData" stripe row-key="oid" border default-expand-all>
<!--        <el-table-column prop="userid" label="用户id"></el-table-column>-->
        <el-table-column prop="collectionid" label="收藏id"></el-table-column>
        <el-table-column prop="symbol" label="收藏股票代码"></el-table-column>
        <el-table-column prop="collectionname" label="收藏股票名称"></el-table-column>
        <!--      <el-table-column prop="detail" label="详情"></el-table-column>-->

        <el-table-column label="操作" align="left" header-align="50px">
          <template v-slot="scope">
            <el-button type="danger" plain @click="del(scope.row.symbol,scope.row.userid)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>


    <div style="margin-top: 20px">
      <el-pagination
          background
          :current_page="params.pageNum"
          :page-size="params.pageSize"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :total="total">
      </el-pagination>
    </div>


  </div>
</template>

<script>
// @ is an alias to /src
import request from "@/utils/request";
import Cookies from "js-cookie";
import {deleteCollection, getCaptcha, getCollection, getCollectionlist} from "@/api";

export default {
  name: 'StarList',
  data(){
    return{
      user:Cookies.get('user')?JSON.parse(Cookies.get('user')):{},
      tableData:[],
      total:0,
      params:{
        pageNum:1,
        pageSize:10,
        userId:"2",
        name:Cookies.get('user') ? JSON.parse(Cookies.get('user')).username:{},
      },
      userid:4,
    }
  },
  created() {
    this.load()
  },
  methods: {

    load(){
      this.getCollection()
    },
    getCollection(){
      console.log("here is userid"+this.user.userid)
      var userId=this.user.userid
      getCollection({userId}).then(res=>{
        console.log(res)
        if(res.code===200){
          this.tableData=res.collection
          // this.$message.success("查询成功");
        }
      }).catch(err=>{
        //异常处理
        console.log(err)
        this.$message.error(err.data)
      })
    },
    reset(){  //重置
      this.params={
        pageNum:1,
        pageSize:10,
      }
      this.load()
    },

    //用户删除股票
    del(symbol,userId){
      // var userId=this.user.userid
      deleteCollection({symbol,userId}).then(res=>{
        console.log(res)
        if(res.code===200){
          this.tableData=res.collection
          this.$message.success("取消收藏成功");
          this.load()
        }
      }).catch(err=>{
        //异常处理
        console.log(err)
        this.$message.error(err.data)
      })
    },
    handleCurrentChange(pageNum){
      //点击分页按钮触发分页
      this.params.pageNum=pageNum
      this.load()
    },
  }
}
</script>

<style scoped>

.table{
  width: 60%;
}
</style>