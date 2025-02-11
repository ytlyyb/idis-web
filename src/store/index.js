import Vue from 'vue';
import Vuex from 'vuex';
import { post, get } from '../services/http';
import ZD_Action from './ZD_Interface';
import common_Action from './common_interface';
Vue.use(Vuex);

const actions = {};
getActions(ZD_Action);
getActions(common_Action);
export default new Vuex.Store({
    state: {
        keepAlivePage: [], // 需要缓存的页面，
        requestid: "111111",
        downloadDialogShow: false,
        deviceSelectDialogShow: false,
        permissionData:[], //权限数据
    },
    getters: {
        keepAlivePage: state => state.keepAlivePage, // 获取需要缓存的页面
        downloadDialogShow: state => state.downloadDialogShow, // 获取需要缓存的页面
        deviceSelectDialogShow: state => state.deviceSelectDialogShow,
    },
    mutations: {
        ADD_KEEP_ALVE: (state, name) => {
            if (!state.keepAlivePage.includes(name))
                state.keepAlivePage = state.keepAlivePage.concat(name);
        },
        DEL_KEEP_ALVE: (state, name) => {
            state.keepAlivePage.map((item, index) => {
                if (item == name)
                    state.keepAlivePage.splice(index, 1);
            })
        },
        SET_REQUESTID(state, id) {
            state.requestid = id;
        },
        showDownload(state, show = false) {
            state.downloadDialogShow = show; 
        },
        showDeviceSelect(state, show = false) {
            state.deviceSelectDialogShow = show
        },
        getPermissionData(state,row){
            state.permissionData=row
        }
    },
    actions: actions,
    modules: {}
})




function getActions(extraActions) {
    for (const key in extraActions) {
        if (Object.hasOwnProperty.call(actions, key)) {
            console.warn(`${key} has already existed!`);
        } else {
            actions[key] = extraActions[key];
        }
    }
    // if (!isObject(extraActions)) return;
    // const ownerKeys = Object.keys(actions);
    // const extraKeys = Object.keys(extraActions);
    // extraKeys.forEach(key => {
    //     if (ownerKeys.includes(key)) {
    //         console.warn(`${ key } has already existed!`);
    //     } else {
    //         actions[key] = extraActions[key];
    //     }
    // });
}