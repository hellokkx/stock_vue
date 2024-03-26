import axios from 'axios';
import router from '../router';

//超时时间5秒
axios.defaults.timeout = 5000;
//允许跨域
axios.defaults.withCredentials = true;
//请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//基础url
axios.defaults.baseURL = 'https://183.232.249.91:11514/';
// axios.defaults.baseURL = 'http://172.26.128.209:9171/';
// axios.defaults.baseURL = 'http://192.168.31.220:9171/';
// axios.defaults.baseURL = 'http://192.168.43.218:9171/';
// axios.defaults.baseURL = 'http://172.29.15.211:9171/';  //lzw
// axios.defaults.baseURL = 'http://172.29.26.249:9171/';  //wqy
// axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;  //lzw


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
