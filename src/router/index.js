import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
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
    path: '/login1',
    name: 'Login1',
    component: ()=>import('@/views/login/Login1.vue'),
  },
  {
    path: '/login2',
    name: 'Login2',
    component: ()=>import('@/views/login/Login2.vue'),
  },
  {
    path: '/person',
    name: 'person',
    component: ()=>import('@/views/user/persondetail.vue'),
  },
    //------------------------1_Layout-------------------------
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect:'/home',

    //------------------------1_Layout下面子布局-------------------------
    children:[
      //------------------------2_HOME首页-------------------------
      {path: 'home', name: 'home', component: HomeView},
      // ---------------------2_User-----------------------------
      {path: 'userList', name: 'userList', component: () => import('@/views/user/User.vue')},
      {path: 'addUser', name: 'addUser', component: () => import('@/views/user/AddUser.vue')},

      // ---------------------2_Class量化课堂-----------------------------
      {path: '/class', name: 'class', component: ()=>import('@/views/class/class.vue'),},


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
