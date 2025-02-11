import axios from "axios";
import router from '../router';
import Vue from 'vue';
import ElementLocale from 'element-ui/lib/locale';
import qs from 'qs';
// import { MENUTYPE, VENDINGTYPE } from '../app/common/resources/resources.js';
import store from '../store'

let timer = setTimeout(function() {
    goLogin();
},3600000)
function timeOut(){
    clearTimeout(timer)
    timer = setTimeout(function() {
        goLogin();
    },3600000)
}

function post(url, params, hearder) {
    if (params) {
        // params.systemid = MENUTYPE.LANDLORD;
        // params.vendingtype = VENDINGTYPE.PC;
    }
    return new Promise((resolve, reject) => {
        axios.post(url, params, hearder).then(res => {
            // console.log(res.data);
            if (res.status == 401 || res.data.success == 6) {
                goLogin();
            } else {
                timeOut();
                successCheck(res.data, params)
                resolve(res.data);
            }
        }).catch(err => {
            // console.log('posterr>> ', err)
            reject(errorHandle(err));
        });
    })
}

function get(url, params = {}, hearder, attach = null) {
    url = Object.keys(params).length != 0 ? url + '?' + qs.stringify(params) : url;
    return new Promise((resolve, reject) => {
        attach !== null && (hearder = attach);
        axios.get(url, hearder).then(res => {
            console.log(res);
            if (typeof res.data === 'string') {
                res.data =  eval('(' + res.data + ')')
              }
            // console.log(res);
            if (res.status == 401 || res.data.success == 6) {
                goLogin();
            } else {
                timeOut();
                successCheck(res.data, params)
                resolve(res.data);
            }

        }).catch(err => {
            // console.log(err)
            reject(errorHandle(err.data));
        });
    })
}

//导出专用接口
function downPost(url, params, hearder) {
    let downloadUrl = url;
    // console.log('downloadUrl :>> ', downloadUrl);
    return new Promise((resolve, reject) => {
        axios.post(downloadUrl, params, { responseType: 'blob' },).then(res => {
            // console.log(res);
            resolve(res.data);
        }).catch(err => {
            // console.log(err)
            reject(errorHandle(err.data));
        });
    })
}

function exportPost(url, params, hearder) {
    let downloadUrl = urlHandleExport(url);
    // console.log('downloadUrl :>> ', downloadUrl);
    return new Promise((resolve, reject) => {
        axios.post(downloadUrl, params, hearder).then(res => {
            // console.log(res.data);
            if (res.code == 401) {
                goLogin();
            } else {
                timeOut();
                successCheck(res.data, params)
                resolve(res.data);
            }
        }).catch(err => {
            // console.log('posterr>> ', err)
            reject(errorHandle(err));
        });
    })
}
function exportExcel(url, params, hearder) {
    return new Promise((resolve, reject) => {
        axios.post(url, params, { responseType: 'blob' }).then(res => {
            // if (res.status == 401 || res.data.success == 6) {
            //     goLogin();
            // } else {
            // successCheck(res.data, params)
            resolve(res.data);
            // }
        }).catch(err => {
            reject(errorHandle(err));
        });
    })
}
// url处理 传入 查询接口地址,返回 导出接口地址
function urlHandle(url) {
    let [httpStr, baseUrl] = url.split('//');
    let baseUrlArr = baseUrl.split('/');
    let index = baseUrlArr.findIndex(item => item == 'service');
    baseUrlArr.splice(index + 1, 0, 'download')
    let downloadUrl = baseUrlArr.join('/');
    return httpStr + '//' + downloadUrl;

}
// url处理 传入 查询接口地址,返回 导出接口地址
function urlHandleExport(url) {
    let [httpStr, baseUrl] = url.split('//');
    let baseUrlArr = baseUrl.split('/');
    let index = baseUrlArr.findIndex(item => item == 'service');
    baseUrlArr.splice(index + 1, 0, 'export')
    let downloadUrl = baseUrlArr.join('/');
    return httpStr + '//' + downloadUrl;

}
//默认网络请求(通过success == 1判断)错误时,提示后端返回的错误信息;
//网络请求参数带successCheckType时,不做处理与提示,由具体页面自己处理
function successCheck(res, params) {
    // if (params.noErrorMessage) {
        // return res;
    if(params){
    } else {
        if( res.success == -1) {
            let errordetail = ElementLocale.t('ytlTips.undefinedError');
            Vue.prototype.$message({
                message: errordetail,
                type: 'error'
            });
            return;
        }
        if (res.success != 1) {
            let errordetail = res.errorMessage || ElementLocale.t('ytlTips.requesterror');
            Vue.prototype.$message({
                message: errordetail,
                type: 'error'
            });
        }
    }
}


function errorHandle(data) {
    // console.log(data);
    if (!data) {
        return
    }
    let { error, status, message, errordetail } = data;
    let retErrordetail = "";
    let ret = "";
    switch (status) {
        case 401:
            ret = "401 " + error;
            retErrordetail = errordetail;
            goLogin();
            break;
        case 404:
            ret = "404 " + error;
            break;
        case 500:
            ret = error;
            break;
        default:
            break;
    }
    Vue.prototype.$message({
        message: retErrordetail || ElementLocale.t('ytlTips.requesterror'),
        type: 'error'
    });
    return ret;
}


function goLogin() {
    console.log(router);
    if (router.history.current.name == "Login") {
        return
    }
    Vue.prototype.$loading().close();
    // router.replace('/login');
    Vue.prototype.$message({
        message: ElementLocale.t('ytlTips.logintimeout'),
        type: 'error'
    });
}


export {
    post,
    get,
    downPost,
    exportPost,
    exportExcel,
}