<template>
  <div>
    <!--头部区域-->
    <div style="height: 55px;line-height: 55px;background-color:white;margin-bottom: 2px;display: flex">

      <div style="width: 500px">
        <img src="../../assets/pook.jpg" alt="" style="width: 40px;margin-left: 10px;position: relative;top: 10px;left:10px">
        <span style="margin-left: 25px;font-weight: 550; font-size: 22px">理财大师</span>
      </div>
      <div style="flex: 1;text-align: right;margin-right: 20px">

        <el-dropdown size="medium">
            <!-- 添加头像 -->
          <span class="el-dropdown-link" style="cursor: pointer">
            <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="User Avatar" class="user-avatar">
<!--            {{ admin.account }}-->
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>

          <el-dropdown-menu slot="dropdown" style="margin-top:-5px;">
            <el-dropdown-item>
              <div style="width: 70px;text-align: center;" @click="logout">
                退出
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>


      </div>

    </div>

    <!--侧边栏和主体-->
    <div style="display: flex">
      <!--侧边栏-->
      <div
          style="width: 180px;min-height:calc(100vh - 62px); overflow: hidden;margin-right: 2px;background-color:white;">
        <el-menu :default-active="$route.path" router class="el-menu-demo">
          <!--通过路由router的方式进行页面切换-->
<!--          <el-menu-item index="/admin/adminhome">-->
<!--            <i class="el-icon-s-home"></i>-->
<!--            <span>首页</span>-->
<!--          </el-menu-item>-->

          <el-submenu index="1" v-if="authority === 'StrE'||authority === 'Root'">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>策略处理</span>
            </template>
            <el-menu-item index="/admin/checkStrategy">
<!--              <i class="el-icon-user"></i>-->
              <span>策略审核</span>
            </el-menu-item>
            <el-menu-item index="/admin/Strategy">
<!--              <i class="el-icon-user"></i>-->
              <span>策略管理</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2" v-if="authority === 'AlgE'||authority === 'Root'">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>算法处理</span>
            </template>
            <el-menu-item index="/admin/checkAlgorithm">
              <!-- <i class="el-icon-user"></i> -->
              <span>算法审核</span>
            </el-menu-item>
            <el-menu-item index="/admin/Algorithm">
              <!-- <i class="el-icon-user"></i> -->
              <span>算法管理</span>
            </el-menu-item>
          </el-submenu>


          <el-menu-item index="/admin/User" v-if="authority === 'Root'">
            <i class="el-icon-user"></i>
            <span>用户管理</span>
          </el-menu-item>

          <el-menu-item index="/admin/stockList">
            <i class="el-icon-data-analysis"></i>
            <span>股票管理</span>
          </el-menu-item>



        </el-menu>


      </div>

      <!--主体-->
      <div style="flex: 1;background-color:white;background-color:white;padding: 10px;">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>

import Cookies from 'js-cookie';

export default {
  name: "Layout",
  data(){
    return{
      user:Cookies.get('user') ? JSON.parse(Cookies.get('user')):{},
      authority: localStorage.getItem("authority")
    }
  },
  methods:{
    logout(){
      //清除浏览器用户数据
      Cookies.remove('user')
      this.$router.push('/adminlogin')
    }
  }
}
</script>

<style scoped>
.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 5px;
  vertical-align: middle;
}
</style>