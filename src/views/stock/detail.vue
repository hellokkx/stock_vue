<template>
  <div style="margin:10px">
    <!--搜索表单-->
    <div style="margin-bottom: 5px">
      <el-button style="" plain @click="$router.push('StarList')">
        <i class=""></i>
        <span>返回</span>
      </el-button>
    </div>

    <div style="text-align: center;width: 800px;margin-left: 10px">
      <h3>{{this.$route.query.collectionname}}</h3>
      <el-table :data="tableData" stripe row-key="oid" border default-expand-all center>

        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="symbol" label="股票代码" width="80" align="center"></el-table-column>
        <el-table-column prop="name" label="股票名称" align="center"></el-table-column>
        <el-table-column prop="area" label="所属地区" align="center"></el-table-column>
        <el-table-column prop="industry" label="所属行业" align="center"></el-table-column>
        <el-table-column prop="listdate" label="上市日期" align="center"></el-table-column>

        <el-table-column label="操作" align="left" header-align="50px" width="">
          <template v-slot="scope">
            <el-button type="info" plain @click="del(scope.row.symbol)">取消收藏</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


  </div>
</template>

<script>
// @ is an alias to /src
import request from "@/utils/request";
import Cookies from "js-cookie";
import {deleteStarCollection, getCollectionStar} from "@/api";

export default {
  name: 'OrderList',
  data(){
    return{
      user:Cookies.get('user')?JSON.parse(Cookies.get('user')):{},
      tableData:[],
    }
  },
  created() {
    this.load()
  },
  methods: {
    load(){
      this.getCollectionStar()
    },

    //获取当前收藏夹内的数据
    getCollectionStar(){
      const collectionid=this.$route.query.collectionid
      getCollectionStar({collectionid}).then(res=>{
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

    //用户删除收藏夹
    del(symbol){
      const collectionid=this.$route.query.collectionid
      deleteStarCollection({symbol,collectionid}).then(res=>{
        console.log("res"+res)
        if(res.code===200){
          this.$message.success("取消收藏成功");
          this.load()
        }
      }).catch(err=>{
        //异常处理
        console.log(err)
        this.$message.error(err.data)
      })
    },

  }



}
</script>

<style scoped>

</style>