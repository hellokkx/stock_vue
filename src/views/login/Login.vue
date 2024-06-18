<template>

  <div class="base">

<!--    验证码模块-->
<!--    <el-card class="cover" v-if="loginUser.userid">-->
    <el-card class="cover" v-if="loginUser.userid">

<!--      <slide-verify :l="42"-->
<!--                    :r="10"-->
<!--                    :w="310"-->
<!--                    :h="155"-->
<!--                    :accuracy="6"-->
<!--                    slider-text="向右滑动"-->
<!--                    @success="onSuccess"-->
<!--                    @fail="onFail"-->
<!--                    @refresh="onRefresh"-->
<!--      ></slide-verify>-->
      <Verify @success="onSuccess" @error="onFail" :type="1" :height="2"></Verify>
    </el-card>

          <!-- 登录界面 -->
    <div class="loginAndRegist">
      <!--普通登录表单-->
      <div  class="loginArea">
        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear
        >
          <!-- 标语 -->
          <div v-show="isShow" class="title" style="margin-top:30px">
            账号登录
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
              <el-input class="username" v-model="loginUser.userAccount" style="width: 220px" prefix-icon="el-icon-user" size="medium" placeholder="请输入用户名"></el-input>
            </div>
            <div style="flex: 1;justify-content: center;display: flex;align-items: center">
              <el-input placeholder="请输入密码"  v-model="loginUser.password" style="width: 220px" prefix-icon="el-icon-lock" size="medium" show-password></el-input>
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


<!--        忘记密码 点击注册-->
        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear
          >
          <div class="ForgetandReg" v-show="isShow">
            <div>
              <el-link type="primary" @click="$router.push('/register')">没有账号？点击注册</el-link>
            </div>
          </div>
        </transition>

      </div>

      <!-- 邮箱登录表单 -->
      <div class="registArea">
        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear
        >
          <!--  注册表头-->
          <div v-show="!isShow" class="rigestTitle" style="margin-top: 30px">
            邮箱登录
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
              <el-input placeholder="请输入邮箱" style="width: 230px;" prefix-icon="el-icon-message" size="medium" v-model="emailLog.email"></el-input>
            </div>
            <div style="flex: 1;display: flex;justify-content: center;align-items: center">
              <el-input placeholder="请输入验证码" style="width: 143px;margin-left: 10px" prefix-icon="el-icon-lock" size="medium" v-model="emailLog.captcha"></el-input>
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
          <!--            邮箱登录按钮-->
          <div  v-show="!isShow" class="registBtn">
            <el-button type="primary" style="width:200px" @click="emailLogin">邮箱登录</el-button>
          </div>
        </transition>


        <!--        忘记密码 点击注册-->
        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear>
          <div class="ForgetandReg" v-show="!isShow">
            <div>
              <el-link type="primary" @click="$router.push('/register')">没有账号？点击注册</el-link>
            </div>
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
              <el-button type="primary"  style="border: 1px solid #ffffff;margin-top: 90px;"  @click="changeToRegiest">忘记账户？点击邮箱登录</el-button>
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
              欢迎使用邮箱登录
            </div>
            <!-- 欢迎图片 -->
            <div style="flex: 2">
              <el-button type="primary"  style=";border: 1px solid #ffffff;margin-top: 90px" medium @click="changeToLogin">通过账户密码登录</el-button>
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
import {login, register, getCaptcha, emailLogin} from "@/api/index";
import request from "@/api/request"
import "@/assets/css/button.css"
import md5 from 'js-md5'
import Verify from 'vue2-verify'


export default {

  name:'Login',
  data(){
    return{

      //用户登录信息
      loginUser:{
        userAccount:'',
        userid:'',
        password:'',
      },
      emailLog:{
        captcha: '',
        email:''
      },
      styleObj:{
        bordertoprightradius:'0px',
        borderbottomrightradius: '0px',
        bordertopleftradius:'0px',
        borderbottomleftradius:'0px',
        rightDis:'0px'
      },
      isShow:true
    }
  },
  created() {
      this.load()
  },
  methods:{
    changeToRegiest(){
      this.styleObj.bordertoprightradius= '0px'
      this.styleObj.borderbottomrightradius='0px'
      this.styleObj.bordertopleftradius='0px'
      this.styleObj.borderbottomleftradius='0px'
      this.styleObj.rightDis='50%'
      this.isShow = !this.isShow
    },
    changeToLogin(){
      this.styleObj.bordertoprightradius= '0px'
      this.styleObj.borderbottomrightradius='0px'
      this.styleObj.bordertopleftradius='0px'
      this.styleObj.borderbottomleftradius='0px'
      this.styleObj.rightDis='0px'
      this.isShow = !this.isShow
    },
    //用户登录
    UserLogin(){
      if(this.loginUser.name===""){
        this.$message.error("用户名不能为空!")
      }

      // login({ password: md5(this.loginUser.password).substring(8, 24), userAccount: this.loginUser.userAccount }).then(res=>{
      login({ password: this.loginUser.password, userAccount: this.loginUser.userAccount }).then(res=>{
        console.log(res)
        if(res.code===200){
          this.loginUser.userAccount=res.response.account
          this.loginUser.userid=res.response.userid
          //表示把token存储到本地的“token”这个key里面
          localStorage.setItem("token",res.token)
          // this.onSuccess();
        }
        else{
          this.$message.error(res.msg)
        }
      })
    },

    //获取验证码
    getCaptcha(){
      getCaptcha({email:this.emailLog.email}).then(res=>{
        console.log(res)
        if(res.code===200){
          this.$message.success("验证码发送成功");
        }
        else{
          this.$message.error(res.msg)
        }
      })
    },

    //邮箱登录
    emailLogin(){
      if(this.emailLog.email===""){
        this.$message.error("邮箱不能为空！")
        return false
      }
      else if(this.emailLog.captcha===""){
        this.$message.error("验证码不能为空！")
        return false
      }
      else{
        emailLogin({email:this.emailLog.email,captcha:this.emailLog.captcha}).then(res=>{
          console.log("res"+res)
          if(res.code===200){
            console.log(res)
            localStorage.setItem("token",res.token)
            this.loginUser.userAccount=res.response.account
            this.loginUser.userid=res.response.userid
            //表示把res.data.data.token这个value存储到本地的“token”这个key里面
            // this.onSuccess()
          }
          else{
            this.$message.error(res.msg)
          }
        }).catch(err=>{
          //异常处理
          console.log(err)
        })
      }

    },

    //-------------------滑块--------------------
    onSuccess(){
      this.$message.success("登录成功")
      if(this.loginUser!==null){
        Cookies.set('user',JSON.stringify(this.loginUser))
        console.log(JSON.stringify(this.loginUser))
      }
      this.$router.push('/home')
    },
    onFail(){
      this.$message.warning("验证码错误,请重试")
      this.msg = ''
    },
    onRefresh(){
      console.log('refresh')
    },


    //----------------加密处理-------------------
    /**
     * BASE64加密
     * @param str
     * @returns {string}
     */
    base64Encode(str) {
      return btoa(unescape(encodeURIComponent(str)))
    },
    /**
     * BASE64解密
     * @param str
     * @returns {string}
     */
    base64Decode(str) {
      return decodeURIComponent(escape(atob(str)))
    }

  },
  components: {
    Verify
  }

}
</script>

<style scoped>
/* @import '../assets/css/Login.css' */
.base{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("images/background3.png");
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
  background-color: rgba(255,255,255,1);
  /*border-top-left-radius: 15px;*/
  /*border-bottom-left-radius: 15px;*/
  height: 400px;
  width: 340px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
.registArea{
  /*border-top-right-radius: 15px;*/
  /*border-bottom-right-radius: 15px;*/
  height: 400px;
  width: 350px;
  background-color: rgba(255,255,255,1);
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content:center ;
  align-items: center;
}
.showInfo{
  /*border-top-right-radius: 15px;*/
  /*border-bottom-right-radius: 15px;*/
  position: absolute;
  height: 400px;
  width: 350px;
  z-index:2;
  top: 0;
  right: 0;
  background-image: url("images/welcome1.png");
  background-size:100%;
  /*background-color: rgba(0,0,0,0);*/
  background-position: 0px 30px;
}
.showInfo:hover{
  background-size: 100%;
  background-position: -30px 0px;
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
  margin-top: 20px;
  margin-bottom: 5px;


}
.pwdArea input{
  outline: none;
  height: 30%;
  border-radius:7px ;
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
  margin-bottom: 0px;
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
  margin-top: 20px;
  margin-bottom: 5px;
}

.registForm input{
  outline: none;
  height: 30%;
  border-radius:7px ;
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
  margin-bottom: 0px;
}

.ForgetandReg{
  display: flex;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 50px;
  color: #409eff;
  font-size: 12px;
}

.cover{
  padding: 15px;
  width: fit-content;
  height: 32%;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 1000;
}
</style>