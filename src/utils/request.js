import axios from 'axios';
import { Alert } from 'react-native'
import StorageUtil from './storage';

// 超时设置
const service = axios.create({
    baseURL: 'http://10.28.128.123:8080/',
    // 请求超时时间
    timeout: 5000,
});

// baseURL
// axios.defaults.baseURL = 'http://10.28.128.123:8080/';


// http request 拦截器
// 每次请求都为http头增加Authorization字段，其内容为token
service.interceptors.request.use(
    async config => {
        let token = await StorageUtil.get('loginToken')
        if (token) {
            config.headers['x-token'] = token
        }
        console.log('config', config);
        return config
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
// 针对响应代码确认跳转到对应页面
service.interceptors.response.use(
    response => {
        console.log('responsedata', response);
        return Promise.resolve(response.data)
    },
    error => {
        if (axios.isCancel(error)) {
            return Promise.reject('Request canceled', error.message)
        } else if (error.response) {
            console.log('请求时错误拦截error', error.response.data)
            switch (error.response.status) {
                case 401:
                    Promise.resolve(error.response.data)
                    break
                case 403:
                    Promise.resolve(error.response.data)
                    break
                case 404:
                    Promise.resolve(error.response.data)
                    break
                case 406:
                    Promise.resolve(error.response.data)
                    break
                case 500:
                    Promise.resolve(error.response.data)
                    break
                default:
                    return Promise.reject(error.response.data) 
            }
        }
    }
)

export default service

