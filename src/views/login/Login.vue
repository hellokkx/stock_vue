<template>

  <div class="c1" style="height: 100vh;overflow: hidden;position: relative">

    <el-card class="cover" v-if="loginAdmin">

      <slide-verify :l="42"
                    :r="10"
                    :w="310"
                    :h="155"
                    :accuracy="6"
                    slider-text="向右滑动"
                    @success="onSuccess"
                    @fail="onFail"
                    @refresh="onRefresh"
      ></slide-verify>

    </el-card>

    <div style="width: 500px;height: 400px;background-color:white;
    border-radius:10px;margin:150px auto;padding: 40px 60px">
      <div style="margin: 30px;text-align: center;
      font-size: 30px;font-weight: bold;color: #409eff">
        登录
      </div>

      <el-form :model="admin" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input placeholder="请输入账号" prefix-icon="el-icon-user" size="medium" v-model="admin.username"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="请输入密码" show-password style="margin-top:5px" prefix-icon="el-icon-lock" size="medium" v-model="admin.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button style="width: 100%;margin-top:5px" size="medium" type="primary" plain @click="login">登录</el-button>
        </el-form-item>

      </el-form>
      <div style="display: flex;margin-left: 20px">
        <div>
          忘记密码
        </div>
        <div style="margin-left: 200px">
          注册账号
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import request from "@/utils/request";
import Cookies from 'js-cookie';
import axios from "axios";
import {login} from "@/api/index";
import request from "@/api/request"

export default {
  name: "Login",
  data(){
    return{
      admin:{},
      loginAdmin:false,
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},

        ],
      }
    }
  },
  methods:{
    login(){
      this.$refs['loginForm'].validate((valid) => {

        if(valid){

          //添加userAccount和password到请求体

          const requestBody={
            userAccount:this.admin.username,
            password: this.admin.password,
          }
          // request.post('/admin/login',this.admin).then(res =>{

          // axios.post('https://183.232.249.91:11514/login', requestBody)
          //     .then(res =>{
          //       console.log(res)
          //   if(res.code==='200'){
          //     this.loginAdmin=res.data
          //     this.onSuccess();
          //   }
          //   else{
          //     this.$notify.error(res.msg)
          //   }
          // })
          login({ password: this.admin.password, userAccount: this.admin.username }).then(res=>{
                  console.log(res.code)
              if(res.code===200){
                this.loginAdmin=res.data
                // console.log(res)
                this.onSuccess();
              }
              else{
                this.$notify.error(res.msg)
              }
          })
          // this.loginAdmin=true
          this.onSuccess();
        }
      })
    },
    //-------------------滑块--------------------

    onSuccess(){
      this.$notify.success("登录成功")
      if(this.loginAdmin!==null){
        Cookies.set('admin',JSON.stringify(this.loginAdmin))
      }
      this.$router.push('/home')
    },
    onFail(){
      this.msg = ''
    },
    onRefresh(){
      console.log('refresh')
    }
  }
}
</script>

<style scoped>

  .c1{
    background-color: #ecf5ff;
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