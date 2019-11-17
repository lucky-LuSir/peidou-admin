import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../api/axios';
Vue.use(Vuex)
const state = {
    getDataList:{},
    getMoney:{},
    
}
const actions = {
    
}
const mutations = {
    setDataList({commit},data){
        state.getDataList =  data.data
    },
    setMoney({commit},data){
        state.getMoney =  data.data
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