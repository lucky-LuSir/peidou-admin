import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../api/axios';
Vue.use(Vuex)
const state = {
    accountData:{},
    aLiPay:{},
    withdrawalList:{},
    getFundInfo:{},
    getIvideInto:{},
    getGarage:{},
    getAccount:{}
    
}
const actions = {
    
}
const mutations = {
    setAccount({commit},data){
        state.accountData =  data.data
    },
    setWithdrawalList({commit},data){
        state.withdrawalList = data.data
    },
    setFundInfo({commit},data){
        state.getFundInfo = data.data
    },
    setIvideInto({commit},data){
        state.getIvideInto = data.data
    },
    setGarage({commit},data){
        state.getGarage = data.data

    },
    setALiPay({commit},data){
        state.aLiPay =  data.data
    },
    getAccountList({commit},data){
        state.getAccount = data.data
    }
}
const getters = {
    
}
export default {
    state,
    actions,
    mutations,
    getters
}