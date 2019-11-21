import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Back from '../views/Back.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home',
        children: [
            {
                path: "Back",
                name: "Back",
                component: Back,
            },
        ]
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
    },
    {
        path: '/login',
        name: 'login',
        component: () => import( /* webpackChunkName: "login" */ '../login/views/login.vue')
    },
    {
        path: '/test',
        name: 'test',
        component: () => import( '../views/test.vue')
    },

    
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router