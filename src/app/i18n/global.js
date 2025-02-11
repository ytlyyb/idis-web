import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ElementLocale from 'element-ui/lib/locale'
import en from './lang/en.js'
import zh from './lang/zh.js'




Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: 'zh-CN',         //默认但没什么效果
    messages: {
        'zh-CN': zh,  //中文语言包
        'en-US': en   //英文语言包
    }
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n