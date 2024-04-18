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

    <!--stripe显示斑马纹-->
    <el-table :data="tableData" stripe row-key="oid" default-expand-all>
      <el-table-column prop="userid" label="用户id"></el-table-column>
      <el-table-column prop="collectionid" label="收藏id"></el-table-column>
      <el-table-column prop="tscode" label="收藏股票代码"></el-table-column>
      <el-table-column prop="collectionname" label="收藏股票名称"></el-table-column>
      <el-table-column prop="symbol" label="全球唯一标识符"></el-table-column>
      <!--      <el-table-column prop="detail" label="详情"></el-table-column>-->

      <el-table-column label="操作" align="left" header-align="50px">
        <template v-slot="scope">
          <el-button type="danger" plain @click="del(scope)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

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
import {getCollectionlist} from "@/api";

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
        userid:'4',
        name:Cookies.get('user') ? JSON.parse(Cookies.get('user')).username:{},
      },
      userid:'4',
    }
  },
  created() {
    this.load()
    this.getCollection()
  },
  methods: {

    load(){

    },
    getCollection(){
      console.log(this.params.userid)
      getCollectionlist(4).then(res=>{
        // console.log(res.code)
        if(res.code===200){
          console.log(res)
          this.tableData=res.stockList
          console.log(res.data)
          console.log(this.tableData)
          // this.$message.success("查询成功")
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
    reset(){  //重置
      this.params={
        pageNum:1,
        pageSize:10,
        name:Cookies.get('user') ? JSON.parse(Cookies.get('user')).username:{},
      }
      this.load()
    },
    del(){

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

</style>