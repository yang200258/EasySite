import axios from 'axios';
// import { Alert } from 'react-native'


let token = '';
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
    config => {
        if (token) {
            config.headers['x-token'] = token
        }
        config.headers['Cache-Control'] = 'no-cache'
        config.headers['Pragma'] = 'no-cache'
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
        console.log('err', error);
        if (axios.isCancel(error)) {
            console.log(error)
            return Promise.reject("Ajax Abort: 该请求在axios拦截器中被中断")
        } else if (error.response) {
            console.log('请求时错误拦截error', error)
            return Promise.reject(error.response.data)
        }
    }
)

export default service

