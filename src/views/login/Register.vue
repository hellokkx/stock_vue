<template>
  <div class="base">

    <!-- 注册表单 -->
    <div class="registArea">
      <!--  注册表头-->
      <div v-show="isShow" class="rigestTitle">
        用户注册
      </div>

      <!-- 注册表单-->
      <div  v-show="isShow" class="registForm">
        <div style="flex: 1;display: flex;justify-content: center;align-items: center">
          <el-input
              placeholder="请输入用户名"
              v-model="regUser.regUsername"
              style="width: 250px;"
              prefix-icon="el-icon-user" size="medium"
              clearable
          >
          </el-input>
        </div>
        <div style="flex: 1;display: flex;justify-content: center;align-items: center">
          <el-input placeholder="请输入密码" style="width: 250px;" prefix-icon="el-icon-lock" size="medium" v-model="regUser.regPwd" show-password></el-input>
        </div>
        <div style="flex: 1;display: flex;justify-content: center;align-items: center">
          <el-input placeholder="请输入邮箱" style="width: 250px;" prefix-icon="el-icon-message" size="medium" v-model="regUser.email"></el-input>
        </div>
        <div style="flex: 1;display: flex;justify-content: center;align-items: center">
          <el-input placeholder="请输入验证码" style="width: 163px;margin-left: 10px" size="medium" v-model="regUser.captcha"></el-input>
          <el-button type="primary" plain style="text-align: center;margin-left: 7px" size="small" @click="getCaptcha">获取验证码</el-button>
        </div>

      </div>

      <!--            注册按钮-->
      <div  v-show="isShow" class="registBtn">
        <el-button type="primary" style="width:200px" @click="userRegister">注册</el-button>
      </div>

      <div class="ForgetandReg">
        <el-link type="primary" @click="backtoLogin">已有账号？点击登录</el-link>
      </div>

    </div>



  </div>
</template>

<script>
// import 'animate.css';
// eslint-disable-next-line no-unused-vars
import Cookies from 'js-cookie';
import axios from "axios";
import {login,register,getCaptcha} from "@/api/index";
import request from "@/api/request"
import md5 from 'js-md5'

export default {

  name:'Login',
  data(){
    return{
      ////看看用不用转成用户对象
      regUser:{
        regUsername:'',
        regRePwd:'',
        regPwd:'',
        email:'',
        captcha:'',
      },
      isShow:true
    }
  },
  created() {
  },
  methods:{
    //返回登录界面
    backtoLogin(){
      this.$router.push('/login')
    },
    //获取验证码
    getCaptcha(){
      if(this.regUser.email===""){
        this.$message.success("邮箱不能为空!");
      }
      else{
        getCaptcha({email:this.regUser.email}).then(res=>{
          console.log(res)
          if(res.code===200){
            this.$message.success("验证码发送成功");
          }
        }).catch(err=>{
          //异常处理
          this.$message.error("验证码发送失败")
        })
      }
    },
    //用户注册
    userRegister(){
      if(this.regUser.regUsername===""){
        this.$message.error("用户名不能为空！")
        return false
      }
      else if(this.regUser.regPwd===""){
        this.$message.error("密码不能为空！")
        return false
      }
      else if(this.regUser.email===""){
        this.$message.error("邮箱不能为空！")
        return false
      }
      else{
        // register({password:md5(this.regUser.regPwd).substring(8, 24),userAccount:this.regUser.regUsername,email:this.regUser.email,captcha:this.regUser.captcha}).then(res=>{
        register({password:this.regUser.regPwd,userAccount:this.regUser.regUsername,email:this.regUser.email,captcha:this.regUser.captcha}).then(res=>{
          console.log(res.code)
          console.log(res)
          if(res.code===200){
            this.loginAdmin=res.data
            console.log(res)
            this.$message.success("注册成功")
            this.$router.push("/login")
          }
          else{
            this.$notify.error(res.msg)
          }
        }).catch(err=>{
          //异常处理
          // console.log(err)
          this.$message.error(err.data)
        })
      }

    }
  },

}
</script>

<style scoped>
/* @import '../assets/css/Login.css' */
.base{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("images/background1.png");
  background-size: 100%;
}

.registArea{
  /*border-top-right-radius: 15px;*/
  /*border-bottom-right-radius: 15px;*/
  height: 450px;
  width: 370px;
  background-color: rgba(255,255,255,1);
  z-index: 1;
  margin-right: 700px;
  display: flex;
  flex-direction: column;
  justify-content:center ;
  align-items: center;
}
.title{
  width: 70%;
  flex:1;
  border-bottom: 1px solid #409eff;
  display: flex;
  align-items: center;
  color: #409eff;
  font-weight: bold;
  font-size: 24px;
  display: flex;
  justify-content: center;
}
#aaa{
  transition: 0.3s linear;
}
.pwdArea{
  width: 100%;
  flex:2;
  display: flex;
  flex-direction: column;
  display: flex;
  flex-direction: column;
  margin-top: 50px;


}
.pwdArea input{
  outline: none;
  height: 30%;
  border-radius:13px ;
  padding-left: 10px;
  font-size: 12px;
  border: 1px solid gray;
}
.pwdArea input:focus{
  border: 2px solid #409eff;
}
.btnArea{
  flex:1;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 50px;
}
.rigestTitle{
  width: 70%;
  flex: 1;
  color: #409eff;
  font-weight: bold;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #409eff;
}
.registForm{
  flex: 3;
  display: flex;
  flex-direction: column;
  color: #21305e;
  font-weight: normal;
  font-size: 16px;
  margin-top: 25px;
}

.registForm input{
  outline: none;
  height: 30%;
  border-radius:13px ;
  padding-left: 10px;
  font-size: 12px;
  border: 1px solid gray;
}
.registForm input:focus{
  border: 2px solid #21305e;
}
#elselect:focus{
  border: 2px solid #409eff;
}
.registBtn{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ForgetandReg{
  margin-bottom: 40px;
}

</style>