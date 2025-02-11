import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes as modules } from './router'
import store from '../store'

Vue.use(VueRouter)

const routes = modules

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes
})

router.beforeEach((to, from, next) => {
    // to 表示将要跳转的页面
    // from 表示从哪个路径跳转而来
    // next 是一个函数,表示放行
    // next() 放行 next('/login') 强制跳转页面
    if (to.path == '/login') { return next() } else {
        if (store.state.downloadDialogShow) {
            store.commit("showDownload", false)
            return next()
        }
    };
    // const token = window.sessionStorage.getItem('token');
    // if (!token && to.path != "/setNewPassword" && to.path != "/enterEmail" && to.path != "/agressText") return next('/login');

    next();
})

export default router