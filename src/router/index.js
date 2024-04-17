import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import Layout from '../views/home/Layout.vue'
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
    path: '/login1',
    name: 'Login1',
    component: ()=>import('@/views/login/Login1.vue'),
  },
  {
    path: '/login2',
    name: 'Login2',
    component: ()=>import('@/views/login/Login2.vue'),
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
      {path: 'stockList', name: 'StockList', component: () => import('@/views/home/StockList.vue')},
      {path: 'selfSelectStock', name: 'SelfStock', component: () => import('@/views/home/SelfSelectStock.vue')},
    ]
  },
  {
    path:"*",
    component:()=>import('@/views/404.vue')
  }

]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path==='/login1') next()
  // const admin=Cookies.get("admin")
  // if(!admin && to.path!=='/login') return next("/login") //强制退回到登录页面
  next()
})



export default router
