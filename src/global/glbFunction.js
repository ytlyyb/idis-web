import i18n from '@/app/i18n/global.js'
import Vue from 'vue'
import ElementLocale from 'element-ui/lib/locale';


/**
 * 
 * @param {请求参数} reqParams 
 * @param {*表格titleList详细参考device-manage下的titleList} list 
 * @param {*方法名} methods 
 * @param {*替换} replaceitems //列：{status: {'-1': this.$t('lang.offline'), 0: this.$t('lang.electricity'),'1': this.$t('lang.poweroutages'),},}
 * @param {*下载文件标题} doctitle //列：this.$t('lang.equipmentlist')
 */

Vue.prototype.$down = function(reqParams, list, methods, replaceitems = {}, title = null) {
    try {
        let newObj = JSON.parse(JSON.stringify(reqParams));
        let titleList = []
        list.map(item => {
            titleList.push({
                property: item.prop,
                propertyValue: this.$t(item.label)
            })
        })
        newObj.export = {
            filetype: 1,
            replaceitems: replaceitems,
            titleitems: titleList
        }

        newObj.pageSize = 99999;
        newObj.pageNumber = 1;
        let date = new Date();
        // let title = i18n.t(doctitle);
        let fileName = title + date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString() + ' ' + date.getHours().toString() + ':' + date.getMinutes().toString() + ':' + date.getSeconds().toString();
        this.$store.dispatch(methods, newObj).then(res => {
            let blob = new Blob([res], { type: "application/json" })
            let objectUrl = URL.createObjectURL(blob);
            var a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display:none');
            a.setAttribute('href', objectUrl);
            a.setAttribute('download', fileName + ".xls");
            a.click();
            URL.revokeObjectURL(objectUrl);
        }, error => {
            console.log("!", JSON.parse(error))
        })
    } catch (error) {
        console.log(error);
    }

}

Vue.prototype.$download = function(reqParams, list, methods, replaceitems = {}, title = null, pageSize = 99999) {
    try {
        let newObj = JSON.parse(JSON.stringify(reqParams));
        let titleList = []
        list.map(item => {
            titleList.push({
                property: item.prop,
                propertyValue: this.$t(item.label)
            })
        })
        newObj.export = {
            filetype: 1,
            replaceitems: replaceitems,
            titleitems: titleList
        }

        newObj.pageSize = pageSize;
        newObj.pageNumber = 1;
        let date = new Date();
        // let title = i18n.t(doctitle);
        let fileName = title + date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString() + ' ' + date.getHours().toString() + ':' + date.getMinutes().toString() + ':' + date.getSeconds().toString();
        this.$store.dispatch(methods, newObj).then(res => {
            if (res.success == 1) {
                this.$store.commit("showDownload", true)
            } else {
                console.error("下载失败");
            }
        }, error => {
            console.log("!", JSON.parse(error))
        })
    } catch (error) {
        console.log(error);
    }

}




/**
 * 
 * @param {*提示类型} type  0 -- 手机号；1 -- 身份证 ；2 -- 数值大小  3 -- 字符长度
 * @param {*传值} value 
 * @param {*提示文字} tips 
 * @param {*是否提示文字} tipsShow 
 * @param {*是否支持大于等于 最小值 false 只支持大于} minEqual 
 * @param {*是否支持小于等于 最大值 false 只支持小于} maxEqual 
 * @param {*值的大小范围} range 
 * [
       {
        type:0,
        value:val,
        tipsShow:true,
        range:{ min: 0, max: null },
        length:{min:0,max:null }
       }
    ]
 */


/**
 * 
 * @param {*} e moduleId 权限id
 * @returns true 表示有权限  false 表示无权限
 */
Vue.prototype.$permission = function(e, showTip = true) {
    let ret = false;
    let roleList = localStorage.getItem("roleAuthory");
    let isSubAccount = localStorage.getItem("isSubAccount");
    // console.log(isSubAccount, roleList, !isSubAccount);
    if (isSubAccount == 'true') {
        let list = JSON.parse(roleList);
        list.map(item => {
            console.log(item.moduleId == e);
            if (item.moduleId == e) {
                ret = true;
            }
        })
        console.log(e, list, ret);
        // ret = false
        if (!ret && showTip) {
            Vue.prototype.$message.error(ElementLocale.t('lang.permissiontip'))
        }
        return ret;
    } else {
        return true;
    }

}