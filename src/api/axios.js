import axios from 'axios'
import {
    Loading
} from "element-ui";
import config from '@/config'

// 创建axios实例 application/x-www-data-urlencoded  application/json
let baseURL = '';
if (location.hostname === 'localhost' || location.hostname === 'devweb.saas.maocongwang.com') {
    baseURL = "http://uip.dev.maocongwang.com/api/UIP";
    // baseURL = "http://uip.maocongwang.com/api/UIP"
} else {
    baseURL = "http://uip.maocongwang.com/api/UIP"
    // baseURL = "http://uip.dev.maocongwang.com/api/UIP";
}


/*------------------------------------ Loading加载 ------------------------------------*/
let loading;

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: "拼命加载中...",
        target: document.querySelector(".mainBox")
    });
}
/*------------------------------------ Loading加载 ------------------------------------*/

function endLoading() {
    loading.close(); // 关闭 loading
}

const service = axios.create({
    baseURL: baseURL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

service.interceptors.request.use(
    config => {
        startLoading();
        return Promise.resolve(config);
    },
    error => {
        endLoading();
        return Promise.reject(error);
    }
)

service.interceptors.response.use(
    response => {
        endLoading();
        return response;
    },
    error => {
        endLoading();
        return Promise.reject(error)
    }
)

export default service