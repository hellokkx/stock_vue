<template>

  <div class="c1" style="height: 100vh;overflow: hidden;position: relative">

    <div style="width: 400px;height: 400px;background-color:white;
    border-radius:10px;margin:150px auto; margin-left:50px; padding: 40px 40px">
      <div style="margin-top: 30px; margin-bottom:35px; text-align: center;
      font-size: 25px;font-weight: bold;color: #0e74d3">
        管理员登录
      </div>

      <el-form :model="admin" ref="loginForm">
        <el-form-item prop="username">
          <el-input placeholder="请输入账号" prefix-icon="el-icon-user" size="medium" v-model="admin.account"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="请输入密码" show-password style="margin-top:5px" prefix-icon="el-icon-lock" size="medium" v-model="admin.username"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button style="width: 100%;margin-top:10px" size="medium" type="primary" @click="adminlogin">登录</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import Cookies from 'js-cookie';
import {getUserRole,login, getCaptcha} from "@/api";

export default {
  name: "Login",
  data(){
    return{
      admin:{}
    }
  },
  methods:{
    //管理员登录
    adminlogin(){
      login({password: this.admin.username, userAccount: this.admin.account}).then(res => {
        console.log(res);
        if (res.code === 200) {
          localStorage.setItem("token", res.token);
          console.log(res.token)
          console.log(localStorage.getItem("token"))

          getUserRole().then(res => {
            //获取当前用户权限等级
            const authority=res.response
            localStorage.setItem("authority",authority)

            if(authority==='User'||authority==='Vip'){
              this.$message.warning("当前用户权限不足！")
              this.admin.username=''
              this.admin.account=''
            }
            else{
              this.$message.success(authority+"登录成功");
              this.admin.username=''
              this.admin.account=''
              this.$router.push("/admin")
            }
          });
        }
        else{
          this.$message.error(res.msg)
        }
      });


    },
  }
}
</script>

<style scoped>

.c1{
  background-image: url("@/views/login/images/background1.png");
  background-color: black;
  /* 背景图垂直、水平均居中 */
  background-position: center center;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  /*background-attachment: fixed;*/
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
  /*background-color: #ecf5ff;*/
}
.cover{
  width: fit-content;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 1000;
}
</style>