import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../api/axios'

Vue.use(Vuex)
const state = {
    storeMessage:{},
    // getDetailList:{},
    getList:{},
    // getMessageList:{}
    getTimeList:{}
};

const mutations = {
    setstoretechnician({commit},data){
        state.getList = data.data;
    },
    setstoretechniciantime({commit},data){
        state.getTimeList = data.data;
    }
};

const actions = {
    getstoreMessage({commit,state},params){
       return axios.post('',params.reqParam);
    },
    addbusinesshours({commit,state},params){
        return axios.post('',params.reqParam);
    },
    editbusinesshours({commit,state},params){
        return axios.post('',params.reqParam);
    },
    getstoretechnician({commit,state},params){
        return axios.post('',params.reqParam);
    },
    getroleoptions({commit,state},params){
        return axios.post('',params.reqParam);
    },
    addstoretechnician({commit,state},params){
        return axios.post('',params.reqParam);
    },
    editstoretechnician({commit,state},params){
        return axios.post('',params.reqParam);
    },
    getstoretechniciantime({commit,state},params){
        return axios.post('',params.reqParam);
    }
    // getCarinfomationDetail({commit,state},params){
    //     return axios.post('',params.reqParam);
    // },
    // Carinfoadd({commit,state},params) {  
    //     return axios.post('',params.reqParam);
    // },
    // getCarinfoMessage({commit,state},params){
    //     return axios.post('',params.reqParam);
    // },
    // getCarinfoModal({commit,state},params){
    //     return axios.post('',params.reqParam);
    // }
};

const getters = {

};
export default {
    state,
   mutations,
   actions,
   getters
}