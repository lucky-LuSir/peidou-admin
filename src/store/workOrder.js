import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../api/axios'

Vue.use(Vuex)
const state = {
     getList:{},
     getListInfo:{},
     getInfo:{},
     getServiceList:{},
     getProjectList:{},
     plateNumList:{},
};

const mutations = {
    setWorkOrder({commit},data){
        state.getList = data.data;
    },
    setWorkOrderInfo({commit},data){
        state.getListInfo = data.data;
    },
    setWorkOrderInfoList({commit},data){
        state.getInfo = data.data;
    },
    setService({commit},data){
        state.getServiceList = data.data;
    },
    setProjectType({commit},data){
        state.getProjectList = data.data;
    },
    setPlateNum({commit},data){
        state.plateNumList = data.data;
    },
};

const actions = {
    getPlateNum({commit,state},params){
        return axios.post('',params.reqParam);
    },
    getWorkOrder({commit,state},params){
       return axios.post('',params.reqParam);
    },
    getWorkOrderInfo({commit,state},params){
        return axios.post('',params.reqParam);
    },
    getWorkOrderInfoList({commit,state},params){
        return axios.post('',params.reqParam);
    },
    getService({commit,state},params){
        return axios.post('',params.reqParam);
    },
    getProjectType({commit,state},params){
        return axios.post('',params.reqParam);
    },
};

const getters = {

};
export default {
    state,
   mutations,
   actions,
   getters
}