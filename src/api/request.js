
import axios from 'axios';
import router from '../router';

// 超时时间5秒
axios.defaults.timeout = 5000;
// 允许跨域
axios.defaults.withCredentials = true;

// 设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 设置get请求头
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 基础url
axios.defaults.baseURL = 'http://47.115.207.110:10010'; // 云服务器2

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次请求前从localStorage中获取token
        const token = localStorage.getItem('token');
        // const token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUm9vdCIsImV4cCI6MTcxOTQ3Njk1NiwiaWF0IjoxNzE4ODcyMTU2LCJ1c2VybmFtZSI6IjEyMzQ1NiJ9.c52BnfbHrSIKTiVCv_L4DJrjpsJTaZFbQoOFLLfBoSo";

        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
axios.interceptors.response.use(
    (response) => {
        // 返回的状态码为200，接口请求成功
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 接口请求失败
    (error) => {
        if (error.response.status) {
            switch (error.response.status) {
                // 201: 已注册
                case 201:
                    break;
                // 401: 未登录
                case 401:
                    router.replace({
                        path: '/',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                    break;
                // 403: token过期
                case 403:
                    router.replace({
                        path: '/',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                    break;
                // 404: 请求不存在
                case 404:
                    break;
                // default:
            }
            return Promise.reject(error.response);
        }
    }
);

// 封装get方法
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params: params })
            .then(res => { resolve(res.data); })
            .catch(err => { reject(err); })
    });
}

// 封装post方法
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(res => { resolve(res.data); })
            .catch(err => { reject(err); })
    });
}
