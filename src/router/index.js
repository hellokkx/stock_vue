import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import Layout from '../views/Layout.vue'
import Cookies from "js-cookie";


Vue.use(VueRouter)

const routes = [
    //----------------------1_Login-------------------------------
  {
    path: '/login',
    name: 'Login',
    component: ()=>import('@/views/login/Login.vue'),
  },
  {
    path: '/register',
    name: 'Login2',
    component: ()=>import('@/views/login/Register.vue'),
  },
    //------------------------1_Layout-------------------------
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect:'/home',
    children:[
      //------------------------2_HOME-------------------------
      {path: 'home', name: 'Home', component: HomeView},
      // ---------------------2_User-----------------------------
      {path: 'userList', name: 'UserList', component: () => import('@/views/user/User.vue')},
      {path: 'addUser', name: 'AddUser', component: () => import('@/views/user/Index.vue')},
      //---------------------2_SelfStock--------------------------
      {path: 'stockList', name: 'StockList', component: () => import('@/views/stock/StockList.vue')},
      {path: 'selfSelectStock', name: 'SelfStock', component: () => import('@/views/stock/SelfSelectStock.vue')},
      //---------------------2_Star--------------------------
      {path: 'starList', name: 'starList', component: () => import('@/views/star/StarList.vue')},
      // {path: 'selfStar', name: 'selfStar', component: () => import('@/views/star/StockList.vue')},
    ]
  },
  {
    path:"*",
    component:()=>import('@/views/404.vue')
  },



    //--------------------------Admin-------------------------
  {
    path: '/admin',
    name: 'Admin',
    component: ()=>import('@/views/admin/AdminLayout.vue'),
    redirect:'/admin/adminhome',

    children:[
      //------------------------2_HOME-------------------------
      {path: 'adminhome', name: 'Home', component: ()  => import('@/views/admin/AdminHome.vue')},
      // ---------------------2_User-----------------------------
      {path: 'User', name: 'User', component: () => import('@/views/user/User.vue')},
      {path: 'addUser', name: 'AddUser', component: () => import('@/views/user/Index.vue')},
      //---------------------2_Stock--------------------------
      {path: 'stockList', name: 'StockList', component: () => import('@/views/stock/StockList.vue')},
      {path: 'starList', name: 'starList', component: () => import('@/views/star/StarList.vue')},

      //---------------------2_SelfStock--------------------------
      {path: 'selfSelectStock', name: 'SelfStock', component: () => import('@/views/stock/SelfSelectStock.vue')},
      {path: 'selfSelectStock2', name: 'SelfStock', component: () => import('@/views/stock/SelfSelectStock.vue')},
    ]
  },

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
