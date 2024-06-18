<template>

  <div style="margin-top: 20px;margin-right: 20px;margin-left:40px">
    <!--搜索表单-->
    <div style="margin-bottom: 20px">
      <el-input style="width: 240px" placeholder="请输入收藏夹名称" v-model="sname"></el-input>
      <el-button style="margin-left: 5px" type="info" plain @click="search">
        <i class=" el-icon-search"></i>
        <span>搜索</span>
      </el-button>
      <el-button style="margin-left: 5px" type="warning" plain @click="reset">
        <i class=" el-icon-refresh"></i>
        <span>重置</span>
      </el-button>
    </div>

    <div class="add" style="margin-bottom: 10px;margin-top: 15px">
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
      <el-table :data="paginatedData" stripe row-key="oid" border default-expand-all
                :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }">
        <el-table-column prop="collectionid" label="收藏id" width="75"></el-table-column>
        <el-table-column prop="collectionname" label="收藏股票名称"></el-table-column>

        <el-table-column label="操作" align="center" header-align="center" width="350">
          <template v-slot="scope">
            <el-button type="success" plain @click="$router.push('/detail?collectionid='+scope.row.collectionid+'&collectionname='+scope.row.collectionname)">查看详情</el-button>
            <el-button type="primary" plain @click="modify(scope.row)">修改名称</el-button>
            <el-button type="danger" plain @click="del(scope.row.collectionid)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>


    <div style="margin-top: 20px">
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
        userId:"2",
        name:Cookies.get('user') ? JSON.parse(Cookies.get('user')).username:{},
      },
      sname:'',
      dialogVisible: false, // 控制对话框显示隐藏
      collectionName: '',   // 收藏夹名称
      currentPage: 1,  // 当前页
      pageSize: 7,    // 每页显示的行数

    }
  },
  created() {
    this.token =  localStorage.getItem('token')
    this.user = Cookies.get('user')?JSON.parse(Cookies.get('user')):{}
    this.load()
  },

  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.tableData.slice(start, end);
    },
  },

  methods: {
    load(){
      this.getCollection()
    },

    //---------------------------------------分页处理-------------------------------------------------
    handlePageChange(val) {
      this.currentPage = val;
    },

    //-----------------------------------获取股票收藏夹数据-------------------------------------------
    getCollection(){
      var userid=this.user.userid
      var collectionname=''
      getCollection({userid,collectionname}).then(res=>{
        console.log(res)
        if(res.code===200){
          this.tableData=res.response
        }
      }).catch(err=>{
        //异常处理
        console.log(err)
        this.$message.error(err.data)
      })
    },

    //-----------------------------------根据名称搜索收藏夹数据-------------------------------------------
    search(){
      var userid=this.user.userid
      var collectionname=this.sname
      getCollection({userid,collectionname}).then(res=>{
        console.log(res)
        if(res.code===200){
          this.tableData=res.response
        }
      }).catch(err=>{
        //异常处理
        console.log(err)
        this.$message.error(err.data)
      })
    },

    //-----------------------------------重置-------------------------------------------
    reset(){
      this.params={
        pageNum:1,
        pageSize:10,
      }
      this.load()
    },

    //-----------------------------------用户删除收藏夹-------------------------------------------
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

    //-------------------------------------用户新增收藏夹-------------------------------------
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

    //-------------------------------------修改收藏夹名称-------------------------------------
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
  margin-top:20px;
  width: 60%;
}
</style>