import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../api/axios'

Vue.use(Vuex)
const state = {
    getList:{},
    getDetailList:{},
    getMessageList:{}
};

const mutations = {
    setCarinfomation({commit},data){
        state.getList = data.data;
    },
    setCarinfomationDetail({commit},data){
        state.getDetailList = data.data.list;
    },
    setCarinfoMessage({commit},data){
        state.getMessageList = data.data;
    }
};

const actions = {
    getCarinfomation({commit,state},params){
       return axios.post('',params.reqParam);
    },
    getCarinfomationDetail({commit,state},params){
        return axios.post('',params.reqParam);
    },
    Carinfoadd({commit,state},params) {  
        return axios.post('',params.reqParam);
    },
    getCarinfoMessage({commit,state},params){
        return axios.post('',params.reqParam);
    },
    getCarinfoModal({commit,state},params){
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