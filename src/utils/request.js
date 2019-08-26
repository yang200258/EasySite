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
    async err => {
        console.log(err)
        return err;
    }
);

// http response 拦截器
// 针对响应代码确认跳转到对应页面
service.interceptors.response.use(
    async response => {
        response.data.code = 200
        console.log('responsedata', response);
        return response.data
    },
    async error => {
        console.log(error.message)
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message)
            return error.message
        } else if (error.response) {
            console.log('请求时错误拦截error', error.response.data)
            return error.response.data
        } else {
            return error
        }
    }
)

export default service

