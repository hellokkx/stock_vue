// import axios from 'axios'
// import router from "@/router";
// import Cookies from "js-cookie";
//
// const request=axios.create({
//     baseURL:'https://183.232.249.91:11514/', //后台地址
//     timeout:5000
// })
//
// //request拦截器
// //拦截请求
// request.interceptors.request.use(
//     config=>{
//         config.headers['Content-Type']='application/json;charset=utf-8';
//         // const admin=Cookies.get('admin')
//         // console.log(admin)
//         // if(!admin){
//         //     router.push('/login')
//         // }
//
//         //config.headers['token']=user.token;
//         return config
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );
//
//
// //response拦截器
// request.interceptors.response.use(
//     response=>{
//         let res=response.data;
//         if(typeof res === 'string'){
//             res = res? JSON.parse(res) : res
//         }
//         return res;
//     },
//     error => {
//         console.log('err' + error)
//         return Promise.reject(error)
//     }
//
// )
//
// export default request
//
//
//
//
