<template>
  <div class="base">
    <!-- 注册登录界面 -->
    <div class="loginAndRegist">
      <!--登录表单-->
      <div  class="loginArea">
        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear
        >
          <!-- 标语 -->
          <div v-show="isShow" class="title">
            LOGIN
          </div>
        </transition>
        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear
        >
          <!-- 密码框和用户名框 -->
          <div v-show="isShow" class="pwdArea">
            <div style="flex: 1;justify-content: center;display: flex;align-items: center">
              <el-input class="username" v-model="loginUser.name" style="width: 220px" prefix-icon="el-icon-user" size="medium" placeholder="用户名"></el-input>
            </div>
            <div style="flex: 1;justify-content: center;display: flex;align-items: center">
              <el-input placeholder="密码"  v-model="loginUser.password" style="width: 220px" prefix-icon="el-icon-lock" size="medium" show-password></el-input>
            </div>
          </div>
        </transition>
        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear
        >
          <!-- 登录注册按钮 -->
          <div v-show="isShow" class="btnArea">
<!--            <el-button type="success" round style="background-color: #409eff;letter-spacing: 5px" @click="UserLogin"  >登录</el-button>-->
            <el-button type="primary" style="width:200px;letter-spacing: 5px" @click="UserLogin"  >登录</el-button>

          </div>
        </transition>
      </div>
      <!-- 注册表单 -->
      <div class="registArea">
        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear
        >
          <!--  注册表头-->
          <div v-show="!isShow" class="rigestTitle">
            用户注册
          </div>
        </transition>
        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear
        >
          <!--            注册表单-->
          <div  v-show="!isShow" class="registForm">
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
              <el-input placeholder="请输入邮箱" style="width: 250px;" prefix-icon="el-icon-lock" size="medium" v-model="regUser.email"></el-input>
            </div>
            <div style="flex: 1;display: flex;justify-content: center;align-items: center">
              <el-input placeholder="请输入验证码" style="width: 163px;margin-left: 10px" size="medium" v-model="regUser.captcha"></el-input>
              <el-button type="primary" plain style="text-align: center;margin-left: 7px" size="small" @click="getCaptcha">获取验证码</el-button>
            </div>

          </div>
        </transition>
        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear
        >
          <!--            注册按钮-->
          <div  v-show="!isShow" class="registBtn">
            <el-button type="primary" style="width:200px" @click="userRegister">注册</el-button>
          </div>
        </transition>
      </div>
      <!-- 信息展示界面 -->
      <div id="aaa" class="showInfo"
           :style="{
             borderTopRightRadius:styleObj.bordertoprightradius,
             borderBottomRightRadius:styleObj.borderbottomrightradius,
             borderTopLeftRadius:styleObj.bordertopleftradius,
             borderBottomLeftRadius:styleObj.borderbottomleftradius,
             right:styleObj.rightDis
            }"
           ref="showInfoView">

        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear
        >
          <!-- 没有用户输入用户名或者找不到用户名的时候 -->
          <div v-show="isShow" style="display: flex;flex-direction: column;align-items: center;justify-content: center;width: 100%;height: 100%">
            <!-- 欢迎语 -->
            <div style="flex: 2;display: flex;align-items: center;font-size: 26px;color: #ffffff;font-weight: bold;">
              欢迎使用理财大师
            </div>
            <!-- 欢迎图片 -->
            <div style="flex: 2">
              <el-button type="primary"  style="border: 1px solid #ffffff;border-radius: 10px;margin-top: 30px;"  @click="changeToRegiest">还没有账户？点击注册</el-button>
            </div>
          </div>
        </transition>
        <!-- 用户输入用户名时展示头像以及姓名 -->
        <!--           <div>-->

        <!--           </div>-->
        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear
        >
          <!-- 用户注册的时候展示信息 -->
          <div v-show="!isShow" style="display: flex;flex-direction: column;align-items: center;justify-content: center;width: 100%;height: 100%">
            <!-- 欢迎语 -->
            <div style="flex: 2;display: flex;align-items: center;font-size: 26px;color: #FFFFFF;font-weight: bold">
              欢迎注册
            </div>
            <!-- 欢迎图片 -->
            <div style="flex: 2">
              <el-button type="primary"  style=";border: 1px solid #ffffff;margin-top: 30px;border-radius: 7px" medium @click="changeToLogin">已有账户？点击登录</el-button>
            </div>
          </div>
        </transition>
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

export default {

  name:'Login',
  data(){
    return{
      //看看用不用转成用户对象
      loginUser:{
        name:"",
        password:""
      },

      admins:{},
      ////看看用不用转成用户对象
      regUser:{
        regUsername:'',
        regRePwd:'',
        regPwd:'',
        email:'',
        captcha:'',
        selectValue:"",
      },
      styleObj:{
        bordertoprightradius:'15px',
        borderbottomrightradius: '15px',
        bordertopleftradius:'0px',
        borderbottomleftradius:'0px',
        rightDis:'0px'
      },
      isShow:true
    }
  },
  created() {
  },
  methods:{
    changeToRegiest(){
      this.styleObj.bordertoprightradius= '0px'
      this.styleObj.borderbottomrightradius='0px'
      this.styleObj.bordertopleftradius='15px'
      this.styleObj.borderbottomleftradius='15px'
      this.styleObj.rightDis='50%'
      this.isShow = !this.isShow
    },
    changeToLogin(){
      this.styleObj.bordertoprightradius= '15px'
      this.styleObj.borderbottomrightradius='15px'
      this.styleObj.bordertopleftradius='0px'
      this.styleObj.borderbottomleftradius='0px'
      this.styleObj.rightDis='0px'
      this.isShow = !this.isShow
    },
    //用户登录
    UserLogin(){
      login({ password: this.loginUser.password, userAccount: this.loginUser.name }).then(res=>{
        // console.log(res.code)
        if(res.code===200){
          this.loginAdmin=res.data
          // console.log(res)
          // this.onSuccess();
          this.$router.push("/")
        }
        else if(res.code==='400'){
          this.$message.error("账号或密码错误!")
        }
        else{
          this.$notify.error(res.msg)
        }
      }).catch(err=>{
        //异常处理
        console.log(err)
        this.$message.error(err.data)
      })
      // this.loginAdmin=true
      // this.$router.push("/")
    },
    //获取验证码
    getCaptcha(){
      getCaptcha({email:this.regUser.email}).then(res=>{
        console.log(res)
        if(res.code===200){
          this.$message.success("验证码发送成功");
        }
      }).catch(err=>{
        //异常处理
        // console.log(err)
        // this.$message.error("验证码发送失败")
      })
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
      else{
        register({password:this.regUser.regPwd,userAccount:this.regUser.regUsername,email:this.regUser.email,captcha:this.regUser.captcha}).then(res=>{
          console.log(res.code)
          if(res.code===200){
            this.loginAdmin=res.data
            console.log(res)
            // this.onSuccess();
            // this.$router.push("/login1")
            this.$message.success("注册成功")
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

<style>
/* @import '../assets/css/Login.css' */
.base{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("images/background.png");
  background-size: 100%;
}
.loginAndRegist{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.loginArea{
  background-color: rgba(255,255,255,0.8);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  height: 400px;
  width: 350px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
.registArea{
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  height: 400px;
  width: 350px;
  background-color: rgba(255,255,255,0.8);
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content:center ;
  align-items: center;
}
.showInfo{
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  position: absolute;
  height: 400px;
  width: 350px;
  z-index:2;
  top: 0;
  right: 0;
  background-image: url("images/welcome.png");
  background-size:100%;
  /*background-color: rgba(0,0,0,0);*/
}
.showInfo:hover{
  background-size: 100%;
  background-position: -30px -30px;
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
  flex: 2;
  display: flex;
  flex-direction: column;
  color: #409eff;
  font-weight: normal;
  font-size: 16px;
  margin-top: 10px;
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
  border: 2px solid #409eff;
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


</style>