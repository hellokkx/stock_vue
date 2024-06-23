import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import Layout from '../views/Layout.vue'
import Cookies from "js-cookie";


Vue.use(VueRouter)

const routes = [
    //----------------------1_Login-------------------------------
  {path: '/login', name: 'Login', component: ()=>import('@/views/login/Login.vue'),},
  {path: '/adminlogin', name: 'AdminLogin', component: ()=>import('@/views/admin/AdminLogin.vue'),},
  {path: '/register', name: 'Register', component: ()=>import('@/views/login/Register.vue'),},
    //------------------------1_UserLayout-------------------------
  {path: '/', name: 'Layout', component: Layout, redirect:'/home',
    children:[
      //------------------------2_HOME-------------------------
      {path: 'home', name: 'Home', component: HomeView},
      // ---------------------2_User-----------------------------
      {path: 'userList', name: 'UserList', component: () => import('@/views/user/User.vue')},
      {path: 'Analysis', name: 'AddUser', component: () => import('@/views/user/Index.vue')},
      //---------------------2_SelfStock--------------------------
      {path: 'stockList', name: 'StockList', component: () => import('@/views/stock/StockList.vue')},
      {path: 'selfSelectStock', name: 'SelfStock', component: () => import('@/views/selfStock/SelfSelectStock.vue')},
      {path: 'detail', name: 'Detail', component: () => import('@/views/stock/detail.vue')},

      //---------------------2_Strategy--------------------------
      {path: 'strategy', name: 'strategy', component: () => import('@/views/strategy/strategy.vue')},
      {path: 'userStrategy', name: 'userStrategy', component: () => import('@/views/strategy/userStrategy.vue')},

      //---------------------2_Star--------------------------
      {path: 'starList', name: 'starList', component: () => import('@/views/stock/StarList.vue')},
      // {path: 'selfStar', name: 'selfStar', component: () => import('@/views/star/StockList.vue')},

      //---------------------2_Class--------------------------
      {path: 'class', name: 'class', component: () => import('@/views/class/class.vue')},

      //---------------------2_Predict--------------------------
      {path: 'stockDetail', name: 'stockDetail', component: () => import('@/views/predict/StockDataDetail.vue')},
      {path: 'predictStock', name: 'predictStock', component: () => import('@/views/predict/PredictStock.vue')},
      {path: 'predictStock', name: 'predictStock', component: () => import('@/views/predict/PredictStock.vue')},
      {path: 'algorithm', name: 'algorithm', component: () => import('@/views/algorithm/userAlgorithm.vue')},

      //---------------------2_Predict--------------------------
      {path: 'personal-center',name: 'PersonalCenter',component: () => import('@/views/user/PersonalCenter.vue')},
    ]
  },
  {
    path:"*",
    component:()=>import('@/views/404.vue')
  },

    //--------------------------1-Admin-------------------------
  {path: '/admin', name: 'Admin', component: ()=>import('@/views/admin/AdminLayout.vue'), redirect:'/admin/adminhome',
    children:[
      //------------------------2_HOME-------------------------
      {path: 'adminhome', name: 'Home', component: ()  => import('@/views/admin/AdminHome.vue')},
      // ---------------------2_User-----------------------------
      {path: 'User', name: 'User', component: () => import('@/views/user/User.vue')},
      // ---------------------2_Strategy-----------------------------
      {path: 'checkStrategy', name: 'AdminStrategy', component: () => import('@/views/strategy/checkStrategy.vue')},
      {path: 'Strategy', name: 'Strategy', component: () => import('@/views/strategy/adminStrategy.vue')},
      //---------------------2_Stock--------------------------
      {path: 'stockList', name: 'StockList', component: () => import('@/views/admin/AdminStockList.vue')},
      //---------------------2_Algorithm--------------------------
      {path: 'checkAlgorithm', name: 'CheckAlgorithm', component: () => import('@/views/algorithm/CheckAlgorithm.vue')},
      {path: 'Algorithm', name: 'Algorithm', component: () => import('@/views/algorithm/adminAlgorithm.vue')},
      //---------------------2_SelfStock--------------------------
      {path: 'selfSelectStock', name: 'SelfStock', component: () => import('@/views/selfStock/SelfSelectStock.vue')},
      {path: 'selfSelectStock2', name: 'SelfStock', component: () => import('@/views/selfStock/SelfSelectStock.vue')},
    ]
  },
    //-------------------------1_UserProfile---------------------------
  {path: '/UserProfile', name: 'AccountSettingModal', component: ()=>import('@/views/user/PersonalCenter.vue')},

]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path==='/login') next()
  // const admin=Cookies.get("admin")
  // if(!admin && to.path!=='/login') return next("/login") //强制退回到登录页面
  next()
})



export default router
