import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../api/axios'

Vue.use(Vuex)
const state = {
    getList:{},
    getbjList:{},
    // getDetailList:{},
    // getMessageList:{}
    getdetailList:{},
    getLogisticsList:{},
    getinquiryList:{},
    DetailList:{}
};

const mutations = {
    setinquirydetailMessage({commit},data){
        state.getList = data.data.list[0];
    },
    setpurchaseorderdetail({commit},data){
        state.getdetailList = data.data;
    },
    setinquirybjdetailMessage({commit},data){
        state.getbjList = data.data.list.sparepartDetailList;
    },
    setlookLogistics({commit},data){
        state.getLogisticsList = data.data;
    },
    setinquiryorderdetail({commit},data){
        state.getinquiryList = data.data.list.supplierInfoList;
    },
    setorderDetail({commit},data){
        state.DetailList = data.data;
    }
};

const actions = {
    getinquiryTable({commit,state},params){
       return axios.post('',params.reqParam);
    },
    getpurchaseorderTable({commit,state},params){
        return axios.post('',params.reqParam);
    },
    getpurchaseorderdetail({commit,state},params){
        return axios.post('',params.reqParam);
    },
    getinquirydetailMessage({commit,state},params){
        return axios.post('',params.reqParam);
    },
    getinquirybjdetailMessage({commit,state},params){
        return axios.post('',params.reqParam);
    },
    addxjmessage({commit,state},params){
        return axios.post('',params.reqParam);
    },
    cancelpurchaseorder({commit,state},params){
        return axios.post('',params.reqParam);
    },
    confirmpurchaseorder({commit,state},params){
        return axios.post('',params.reqParam);
    },
    getlookLogistics({commit,state},params){
        return axios.post('',params.reqParam);
    },
    getinvoice({commit,state},params){
        return axios.post('',params.reqParam);
    },
    getinquiryorderdetail({commit,state},params){
        return axios.post('',params.reqParam);
    },
    getwxcode({commit,state},params){
        return axios.post('',params.reqParam);
    },
    getorderDetail({commit,state},params){
        return axios.post('',params.reqParam);
    },
    getinvoicedata({commit,state},params){
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