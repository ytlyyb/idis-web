import i18n from '@/app/i18n/global.js'
import moment from 'moment';
//全局过滤器

const toNormalFixed = (val) => {
    try {
        if (val) {
            return (Number(val)).toFixed(2);
        } else if (val == 0) {
            return '0.00';
        } else {
            return '--';
        }
    } catch (e) {
        return '--'
    }
}

const timeFormat = (val, format) => {
    try {
        if (val) {
            return format ? moment(val).format(format) : moment(val).format("YYYY-MM-DD HH:mm:ss");
        } else {
            return '--';
        }
    } catch (e) {
        return '--'
    }
}

const translate = (val) => {
    try {
        return i18n.t(val)
    } catch (e) {
        return i18n.t('lang.unknown')
    }
}





export {
    toNormalFixed,
    translate,
    timeFormat,
}