import Vue from 'vue'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import VueResource from 'vue-resource';
import App from './App.vue'
import router from './router'
import axios from "axios";
import store from './store/store'
import "./common/css/common.css"
import "./common/css/editGlobal.css"
import "./common/css/base.css"
import "./fonts/iconfont.css"
import Request from './api/request';
import md5 from "js-md5";

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer);
Viewer.setDefaults({
    Options: {
        "inline": true,
        "button": true,
        "navbar": true,
        "title": true,
        "toolbar": true,
        "tooltip": true,
        "movable": true,
        "zoomable": true,
        "rotatable": true,
        "scalable": true,
        "transition": true,
        "fullscreen": true,
        "keyboard": true,
        "url": "data-source"
    }
});

import {
    addCookie,
    getCookie,
    delCookie
} from "./common/js/cookie.js";

Vue.prototype.$cookieStore = {
    addCookie,
    getCookie,
    delCookie
};

Vue.filter("ToFixed", function (value) {
    if (value) {
        return value.toFixed(2);
    }
});

router.beforeEach((to, from, next) => {
    let token = window.sessionStorage.getItem("gn_request_token");
    if (token || to.path === '/login') {
        next();
    } else {
        next('/login');
    }
})

Vue.use(ElementUI);
Vue.use(Request);
Vue.use(VueResource);

global.VueEvent = new Vue({
    router,
    store,
    data: {
        bus: new Vue()
    },
    render: h => h(App)
}).$mount('#app')