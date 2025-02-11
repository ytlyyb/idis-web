import Vue from 'vue'
import axios from 'axios'
import token from './header'
// 配置请求根路径


//添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    //为请求头对象,添加token验证的Authorization字段
    console.log("axios", token.getToken(config.url));
    // config.headers.HTTP_ACCESS_TOKEN = token.getToken(config.url);
    const tokenValue = token.getToken(config.url);
    if (tokenValue) {
        // 如果获取到的 token 不为空，则添加前缀 "Bearer "
        config.headers.Authorization = `Bearer ${tokenValue}`;
    }
    config.headers['Accept-Language'] = sessionStorage.getItem('acceptLanguage');
    // config.headers. = window.sessionStorage.getItem('token');
    // config.headers. = "9da280bf0aa04b02b529db43ebd79084";
    config.headers.service = '1';
    config.headers.os = 'Windows';
    config.headers['Access-Control-Allow-Origin'] = '*';
    return config;
}, function (err) {
    //处理响应的错误信息
})

// 添加一个响应拦截器
axios.interceptors.response.use(function (res) {
    // console.log(res);
    // 在这里对返回的数据进行处理
    return { data: res.data, status: res.status };
}, function (err) {
    // console.log(err.response);
    throw err.response;
    //处理响应的错误信息
});

Vue.prototype.$http = axios;