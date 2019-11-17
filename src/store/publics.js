import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../api/axios';
Vue.use(Vuex)
const state = {
    count:0,
    menuData: [{
        icon: 'el-icon-house',
        index: 'main',
        title: '门店概况'
    }, {
        icon: 'el-icon-shopping-cart-full',
        title: '采购询价',
        index:'',
        subs: [{
            index: 'inquiry',
            icon: 'el-icon-menu',
            title: '产品询价记录'
        }, {
            index: 'purchaseorder',
            icon: 'el-icon-menu',
            title: '采购订单'
        }]
    },{
        icon: 'el-icon-truck',
        index: 'carinfomation',
        title: '车辆信息'
    },
    {
        icon: 'el-icon-school',
        index: '1',
        title: '我的门店',
        subs: [{
            index: 'mystoredetail',
            icon: 'el-icon-menu',
            title: '门店信息'
        }, {
            index: 'storetechnician',
            icon: 'el-icon-menu',
            title: '门店技工'
        },
        {
            index: 'storetechniciantime',
            icon: 'el-icon-menu',
            title: '门店技工工作时间'
        },
        {
            index: 'businesshours',
            icon: 'el-icon-menu',
            title: '营业时间'
        }]
    },
    {
        icon: 'el-icon-collection',
        index: 'mystoreserver',
        title: '门店服务'
    },{
        icon: 'el-icon-document',
        index: 'workOrder',
        title: '门店工单'
    },
    {
        icon: 'el-icon-user',
        index: 'ownerorder',
        title: '车主预约'
    },
    {
        icon: 'el-icon-setting',
        index: '3',
        title: '权限管理',
        subs:[{
            index: 'roletemplate',
            icon: 'el-icon-menu',
            title: '权限模板'
        },{
            index: 'technicianauthority',
            icon: 'el-icon-menu',
            title: '技工权限'
        }]

    },
    {
        icon: 'el-icon-document',
        index: 'commentmanager',
        title: '评论管理'
    },
    {
        icon: 'iconfont icon-zjgl',
        index: '2',
        title: '资金管理',
        subs:[{
            index: 'myAccount',
            icon: 'el-icon-menu',
            title: '我的账户'
        },{
            index: 'accountSetting',
            icon: 'el-icon-menu',
            title: '账户设置'
        },{
            index: 'fundInfo',
            icon: 'el-icon-menu',
            title: '资金明细'
        },{
            index: 'withdrawalRecord',
            icon: 'el-icon-menu',
            title: '提现记录'
        },{
            index: 'ivideInto',
            icon: 'el-icon-menu',
            title: '分成记录'
        },
        ]
    }
    ,{
        index: 'invite',
        icon: 'iconfont icon-yaoqingyuangong',
        title: '我的邀请'
    }
    ],
    adminInfo:{},
    breadcrumb:[{
      icon:'',
      name:''
    },{
      icon:'',
      name:''
    }],
    isCollapse:false,
    isList:{},
    bsList:{},
    getEcharData:{}
};

const mutations = {
    setMenuHandle({commit},data){
        state.isCollapse = !state.isCollapse;
    },
    setbookOrderSummary({commit},data){
        state.isList = data.data;
    },
    setbasicSummary({commit},data){
        state.bsList = data.data.basicSummary;
    },
    setEcharData({commit},data){
        state.getEcharData = data.data;
    }
};

const actions = {
    subLogin({commit,state},params) { 
        return axios.post('',params.reqParam);
    },
    getbookOrderSummary({commit,state},params) { 
        return axios.post('',params.reqParam);
    },
    getbasicSummary({commit,state},params) { 
        return axios.post('',params.reqParam);
    },
    getData({commit,state},params) { 
        return axios.post('',params.reqParam);
    }
};

const getters = {

};
export default {
     state,
    mutations,
    actions,
    getters
}