

let common_url = 'http://10.28.128.123:8080/';
let token = '';

const fetchRequest = async (url,method,params='') => {
    let headers = {
        "Content-Type": "application/json;charset=UTF-8",
        "x-token":token  //用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
    };
    console.log('请求参数',url,params);
    if(params === '') {
        try {
            let res = await timeout(fetch(common_url + url,{method,headers}));
            return res.json();
        }catch(err) {
            console.log(err);
            return err;
        }
    } else {
        try {
            let res = await timeout(fetch(common_url + url,{method,headers,body: JSON.stringify(params)}));
            return res.json();
        }catch(err) {
            console.log(err);
            return err;
        }
    }
}
//超时设置
const timeout = async (fn,time=10000) => {
    let timeout_fn = null;

    let timeout_promise = new Promise((resolve,reject) => {
        timeout_fn = () => {
            reject('请求超时！')
        }
    })
    let abortable_promise = Promise.race([
        fn,timeout_promise
    ])
    setTimeout(() => {
        timeout_fn();
    },time)


    return abortable_promise
}