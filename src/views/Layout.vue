<template>
  <div>
    <!--头部区域-->
    <div style="height: 55px;line-height: 55px;background-color:white;margin-bottom: 2px;display: flex">

      <div style="width: 500px">
        <img src="../assets/pook.jpg" alt="" style="width: 40px;margin-left: 10px;position: relative;top: 10px;left:10px">
        <span style="margin-left: 25px;font-weight: 550; font-size: 22px">理财大师</span>
      </div>
      <div style="flex: 1;text-align: right;margin-right: 20px">

        <el-dropdown size="medium">
            <!-- 添加头像 -->
          <span class="el-dropdown-link" style="cursor: pointer">
            <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="User Avatar" class="user-avatar">
            {{ user.account }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>

          <el-dropdown-menu slot="dropdown" style="margin-top:-5px;">
            <el-dropdown-item>
              <div style="width: 70px;text-align: center;" @click="jumptoPerson">
                个人中心
              </div>
            </el-dropdown-item>
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
          <el-menu-item index="/home">
            <i class="el-icon-s-home"></i>
            <span>首页</span>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>大盘指数</span>
            </template>
            <el-menu-item index="/addUser">上证指数</el-menu-item>
            <el-menu-item index="2">深证指数</el-menu-item>
            <el-menu-item index="3">创业板指数</el-menu-item>
            <el-menu-item index="4">科创50</el-menu-item>
          </el-submenu>


          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>股票信息</span>
            </template>
            <el-menu-item index="/stockList">所有股票</el-menu-item>
            <el-menu-item index="/starList">收藏夹</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>自选股</span>
            </template>
            <el-menu-item index="/selfSelectStock">自定义自选股自组合1</el-menu-item>
            <el-menu-item index="/selfSelectStock2">自定义自选股自组合2</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>走势预测</span>
            </template>
            <el-menu-item index="3">自选股走势预测</el-menu-item>
            <el-menu-item index="3">自定义走势预测</el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>精选策略</span>
            </template>
            <el-menu-item index="3">初级策略</el-menu-item>
            <el-menu-item index="3">中级策略</el-menu-item>
            <el-menu-item index="3">高级策略</el-menu-item>
            <el-menu-item index="3">VIP策略</el-menu-item>
          </el-submenu>

          <el-menu-item index="/class">
              <i class="el-icon-location"></i>
              <span>量化课堂</span>
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
      user:Cookies.get('user') ? JSON.parse(Cookies.get('user')):{}
    }
  },
  methods:{
    logout(){
      //清除浏览器用户数据
      Cookies.remove('user')
      this.$router.push('/login')
    },
    jumptoPerson(){
      this.$router.push('/login')
    },

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