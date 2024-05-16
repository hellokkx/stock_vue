import axios from 'axios';
import router from '../router';

//超时时间5秒
axios.defaults.timeout = 5000;
//允许跨域
axios.defaults.withCredentials = true;

//请求头
// 设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.headers.post['Authorization'] = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUm9vdCIsImV4cCI6MTcxNjA1MjMxOSwiaWF0IjoxNzE1NDQ3NTE5LCJ1c2VybmFtZSI6IjEyMzQ1NiJ9.vtwSTQZ0RWvH5_swjrzRlyC0yaHN5pBhSomrEaFC4QI"; // 假设使用JWT token，需要将token存在localStorage中
axios.defaults.headers.post['Authorization'] = localStorage.getItem('token'); // 假设使用JWT token，需要将token存在localStorage中

// 设置get请求头
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.headers.get['Authorization'] = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUm9vdCIsImV4cCI6MTcxNjA1MjMxOSwiaWF0IjoxNzE1NDQ3NTE5LCJ1c2VybmFtZSI6IjEyMzQ1NiJ9.vtwSTQZ0RWvH5_swjrzRlyC0yaHN5pBhSomrEaFC4QI"; // 假设使用JWT token，需要将token存在localStorage中
axios.defaults.headers.get['Authorization'] = localStorage.getItem('token'); // 假设使用JWT token，需要将token存在localStorage中
console.log("heretk"+localStorage.getItem('token'))

//基础url
axios.defaults.baseURL = 'http://124.71.22.245:10010'; // 云服务器
// axios.defaults.baseURL = 'http://172.29.19.133:10010/';//dez
// axios.defaults.baseURL = 'http://172.29.15.120:10010/';//lzw
// axios.defaults.baseURL = 'https://183.232.249.91:11514/';
//响应拦截器
axios.interceptors.response.use(
    (response) => {
        //返回的状态码为200，接口请求成功
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    //接口请求失败
    (error) => {
        if (error.response.status) {
            switch (error.response.status) {
                //201:已注册
                case 201:
                    break;
                //401:未登录
                case 401:
                    router.replace({
                        path: '/',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                    break;
                //403:token过期
                case 403:
                    router.replace({
                        path: '/',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                    break;
                //404:请求不存在
                case 404:
                    break;
                //default:
            }
            return Promise.reject(error.response);
        }
    }
)

//封装get方法
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params: params })
            .then(res => { resolve(res.data); })
            .catch(err => { reject(err); })
    })
}

//封装post方法
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(res => { resolve(res.data); })
            .catch(err => { reject(err); })
    })
}
