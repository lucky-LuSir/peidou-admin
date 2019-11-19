/**
 * Created by Mr.Zhou on 2017/8/3.
 */
// import router from '@/router';
import config from '@/config/index.js'
import md5 from 'js-md5';
const qs = require('qs');
import axios from 'axios'
export default {
    install(Vue) {
        Vue.prototype.postData = function (methodId, paramObj, getData = '', setData = '') {
            
            var requestData = paramObj;
            if (!getData) {
                getData = 'getData'
            }
            if (methodId != "1001" && methodId != "4019") {
                requestData.userToken = localStorage.getItem("saastoken");
            }

            var methodParam = JSON.stringify(requestData);

            //调用UIP API 需要的参数
            var nonce = Math.random().toString();
            var timestamp = new Date().getTime().toString();
            var reqParam = {
                methodId: methodId,
                methodParam: methodParam,
                nonce: nonce,
                timestamp: timestamp,
                appid: config.appid
            };
            
            var orderParam = objKeySort(reqParam);

            //拼接key
            var tempStr = objToUrlParam(orderParam) + "&key=" + config.key + "";

            //md5转换
            var hash = md5(tempStr);

            //将签名加入请求参数
            reqParam.signature = hash;
            var self = this;
            return new Promise((resolve, reject) => {
                
                this.$store.dispatch(getData, {
                    'reqParam': qs.stringify(reqParam)
                }).then(response => {
                    if (response.status == 200) {
                        if (response.data.code == 418) {
                            this.$message({
                                type: "error",
                                message: response.data.res.msg
                            })
                        } else if (response.data.code == 0) {
                            setData ? this.$store.commit(setData, response.data.res) : '';
                            resolve(response.data);
                        } else {
                            this.$message({
                                type: "error",
                                message: response.data.res.msg
                            })
                            if (methodId == 4052 && response.data.code == 422) {
                                setData ? this.$store.commit(setData, response.data.res) : '';
                                resolve(response.data);
                            } else {
                            }
                        }
                    } else {
                        this.$message({
                            type: "error",
                            message: "服务器瘫痪啦!"
                        })
                    }
                }, err => {
                })
            })
        };
        Vue.prototype.ajaxFile = function (methodId, paramObj, file, successCall) {
            var requestData = paramObj;
            var methodParam = JSON.stringify(requestData);
            //调用UIP API 需要的参数
            var nonce = Math.random().toString();
            var timestamp = new Date().getTime().toString();
            var reqParam = {
                methodId: methodId,
                nonce: nonce,
                methodParam: methodParam,
                timestamp: timestamp,
                appid: config.appid,
            };
            var orderParam = objKeySort(reqParam);
            //拼接key
            var tempStr = objToUrlParam(orderParam) + "&key=" + config.key + "";
            //md5转换
            var hash = md5(tempStr);
            //将签名加入请求参数
            reqParam.signature = hash;
            var formData = new FormData();
            formData.append("Files", file);
            for (var key in reqParam) {
                formData.append(key, reqParam[key]);
            }
            axios.post(config.url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                if (response.status == 200) {
                    successCall(response.data);
                } else {
                    // VueEvent.$message.error('哎呀，服务器好像出错了');
                }
            }, err => {
                // VueEvent.$message.error('哎呀，服务器好像崩溃了');
            })
        };

        function objKeySort(obj) { //排序的函数
            var newkey = Object.keys(obj).sort();
            //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
            var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
            for (var i = 0; i < newkey.length; i++) { //遍历newkey数组
                newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
            }
            return newObj; //返回排好序的新对象
        }

        function objToUrlParam(obj) {
            var str = "";
            for (var key in obj) {
                str += "&" + key + "=" + obj[key];
            }
            return str.substring(1);
        }
        /** 怕判路由是否是HTTP OR HTTPS链接 */
        Vue.prototype.isUrl = function (str) {
            if (str != "") {
                var reg = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
                if (!reg.test(str)) {
                    return false;
                } else {
                    return true;
                }
            }
        };

        /** 根据管理员的token获取管理员的信息 */
        Vue.prototype.getAdminByToken = function (callback) {
            this.postData("4019", {
                "userToken": callback
            }, 'subLogin').then((res) => {
                // self.$store.state.adminInfo = res.data;
                localStorage.setItem('adminInfo', JSON.stringify(res.res.data));
            });
        };

        /** 用户退出登录操作 */
        Vue.prototype.loginOut = function () {
            localStorage.removeItem('saastoken');
            localStorage.removeItem('adminInfo');
            this.$router.push('/login');
        }

        /** 用户发送socket操作操作 */
        Vue.prototype.wsSend = function (data) {
            var ret = {
                head: {
                    token: localStorage.getItem('saastoken')
                },
                body: data
            }
            websocket.send(JSON.stringify(ret));
        }
    }
}