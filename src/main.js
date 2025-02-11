import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './app/i18n/global.js'
import './plugins/element.js'
import './services/service.js'
import * as filters from './global/filters.js'
import * as glb from './global/glbFunction.js'
import IconSvg from './app/components/icon-component/icon-component.vue'
import VHtmlPanel from './app/components/html-panel/html-panel.vue'
import CommonLeftTree from './app/components/common-left-tree/common-left-tree.vue'
import "lib-flexible-computer";
// import './app/common/tools'
// import 'default-passive-events';
Vue.component('icon-svg', IconSvg)
Vue.component('v-html-panel', VHtmlPanel)
Vue.component('common-left-tree', CommonLeftTree)
//用于关闭[Violation]警告
// import 'default-passive-events'

//自定义主题
// import '@/theme/index.css';

//导出excel
import JsonExcel from 'vue-json-excel';
Vue.component('downloadExcel', JsonExcel)

// 导入全局样式
import './assets/css/global.css'
import './assets/css/Layout.css'
//导入iconfont symbol
import './assets/iconfont/index'


//注册全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})


Vue.directive('alterELDialogMarginTop'/*修改elementUI中el-dialog顶部的距离,传入值eg:{marginTop:'5vh'} */, {
  inserted(el, binding, vnode) {
    el.firstElementChild.style.marginTop = binding.value.marginTop
  }
})



Vue.prototype.$bus = new Vue(); //兄弟组件传值
Vue.config.productionTip = false

document.title = "AMI"

new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
    mounted() {document.dispatchEvent(new Event('render-event'))},
}).$mount('#app')