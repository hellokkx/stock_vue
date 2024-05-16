<template>

  <div style="margin-top: 10px;margin-right: 20px;margin-left:10px">
    <!--搜索表单-->
    <div style="margin-bottom: 20px">
      <el-input style="width: 240px" placeholder="请输入收藏夹名称" v-model="params.sname"></el-input>
      <el-button style="margin-left: 5px" type="info" plain @click="load">
        <i class=" el-icon-search"></i>
        <span>搜索</span>
      </el-button>
      <el-button style="margin-left: 5px" type="warning" plain @click="reset">
        <i class=" el-icon-refresh"></i>
        <span>重置</span>
      </el-button>
    </div>

    <div class="add" style="margin-bottom: 10px">
      <el-button type="primary" @click="addStarList">添加收藏夹</el-button>
    </div>

    <el-dialog :visible.sync="dialogVisible" title="收藏夹名称" width="30%" height="300px">
      <el-input v-model="collectionName" placeholder="请输入收藏夹名称"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取消</el-button>
        <el-button type="primary" @click="confirmAdd">确定</el-button>
      </div>
    </el-dialog>

    <div class="table">
      <el-table :data="tableData" stripe row-key="oid" border default-expand-all>
<!--        <el-table-column prop="userid" label="用户id"></el-table-column>-->
        <el-table-column prop="collectionid" label="收藏id" width="100"></el-table-column>
<!--        <el-table-column prop="symbol" label="收藏股票代码"></el-table-column>-->
        <el-table-column prop="collectionname" label="收藏股票名称" width="178"></el-table-column>
        <!--      <el-table-column prop="detail" label="详情"></el-table-column>-->

        <el-table-column label="操作" align="left" header-align="50px" width="350">
          <template v-slot="scope">
            <el-button type="success" plain @click="$router.push('/detail?collectionid='+scope.row.collectionid+'&collectionname='+scope.row.collectionname)">查看详情</el-button>
            <el-button type="primary" plain @click="modify(scope.row)">修改名称</el-button>
            <el-button type="danger" plain @click="del(scope.row.collectionid)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>


<!--    <div style="margin-top: 20px">-->
<!--      <el-pagination-->
<!--          background-->
<!--          :current_page="params.pageNum"-->
<!--          :page-size="params.pageSize"-->
<!--          layout="prev, pager, next"-->
<!--          @current-change="handleCurrentChange"-->
<!--          :total="total">-->
<!--      </el-pagination>-->
<!--    </div>-->


  </div>
</template>

<script>
// @ is an alias to /src
import request from "@/utils/request";
import Cookies from "js-cookie";
import {deleteCollection, getCaptcha, getCollection, addCollection, updateCollection} from "@/api";

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
      dialogVisible: false, // 控制对话框显示隐藏
      collectionName: '',   // 收藏夹名称

    }
  },
  created() {
    this.token =  localStorage.getItem('token')
    this.load()
  },
  methods: {
    load(){
      this.getCollection()
    },
    getCollection(){
      console.log("here is userid"+this.user.userid)
      var userid=this.user.userid
      var collectionname=''
      getCollection({userid,collectionname}).then(res=>{
        console.log(res)
        if(res.code===200){
          this.tableData=res.response
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

    //用户删除收藏夹
    del(collectionid){
      console.log("collectionid"+collectionid)
      deleteCollection({collectionid}).then(res=>{
        console.log("res"+res)
        if(res.code===200){
          this.$message.success("删除收藏夹成功");
          this.load()
        }
      }).catch(err=>{
        //异常处理
        console.log(err)
        this.$message.error(err.data)
      })
    },

    //用户新增收藏夹
    addStarList() {
      this.dialogVisible = true; // 点击按钮时显示对话框
    },
    confirmAdd() {
      //判断非空
      if(this.collectionName===''){
        this.$message.info("收藏夹名字不能为空!")
      }
      else{
        // 调用新增收藏夹接口
        addCollection({ userid: this.user.userid, collectionname: this.collectionName }).then(res => {
          if (res.code === 200) {
            this.$message.success("添加收藏夹成功");
            this.dialogVisible = false; // 关闭对话框
            this.load(); // 重新加载收藏夹列表
            this.collectionName=''
          }
        }).catch(err => {
          console.log(err);
          this.$message.error(err.data);
          this.collectionName=''
        });
      }
    },
    cancelAdd(){
      this.dialogVisible = false,
      this.collectionName=''
    },

    //修改收藏夹名称
    modify(row) {
      // 弹出对话框让用户输入新的收藏夹名字
      this.$prompt('请输入新的收藏夹名字', '修改收藏夹名字', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S+/,
        inputErrorMessage: '收藏夹名字不能为空',
        inputPlaceholder: '请输入收藏夹名字'
      }).then(({ value }) => {
        // 用户点击确认后的操作
        // 调用后端接口修改收藏夹名字
        this.updateCollectionName(row.collectionid, value);
      }).catch(() => {
        // 用户点击取消后的操作
        // 可以不做任何处理
      });
    },
    updateCollectionName(collectionid, collectionname) {
      // 调用后端接口修改收藏夹名字
      updateCollection({ collectionid, collectionname }).then(res => {
        if (res.code === 200) {
          this.$message.success("修改收藏夹名字成功");
          this.load(); // 重新加载收藏夹列表
        }
      }).catch(err => {
        console.log(err);
        this.$message.error(err.data);
      });
    },

    // //分页-目前没用到
    // handleCurrentChange(pageNum){
    //   //点击分页按钮触发分页
    //   this.params.pageNum=pageNum
    //   this.load()
    // },

  }
}
</script>

<style scoped>

.table{
  width: 60%;
}
</style>