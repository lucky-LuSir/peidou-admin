/**
 * Created by Mr.Zhou on 2017/8/7.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import publics from './publics';
import carinfomation from './carinfomation';
import mystore from './mystore';
import inquiry from './inquiry';
import mystoreserver from './mystoreserver';
import ownerorder from './ownerorder';
import rolemanager from './rolemanager';
import commentmanager from './commentmanager';
import workOrder from './workOrder';
import fund from './fund';
import invite from './invite';
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        publics,
        carinfomation,
        inquiry,
        mystore,
        mystoreserver,
        ownerorder,
        fund,
        invite,
        rolemanager,
        workOrder,
        commentmanager
    },
    state: {
        pageSize: 10,
    }
})
