//正则
/**
 * 使用
 import { regexp } from "@/app/common/resources/resources.js";
 let reg = new RegExp(regexp.phone);
 if (!reg.test(value)) {
     return
  }
 * 
 * password  //新密码只能使用大小写字母，并且至少1个大写字母、1个小写字母和1个数字!
 * phone  //手机号正则
 * email   //邮箱正则
 * idcard  //身份证号
 * bandCard //银行卡
 * businessRegistration //企业  社会统一信用代码
 * ipAddress //IP地址正则
 */
const regexp = {
    password: /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*)[0-9A-Za-z]{6,20}$/,
    phone: /^1(3([0-35-9]\d|4[1-8])|4[14-9]\d|5([01235689]\d|7[1-79])|66\d|7[2-35-8]\d|8\d{2}|9[13589]\d)\d{7}$/,
    email: /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
    idcard: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
    bandCard: /^([1-9]{1})(\d{14}|\d{18})$/,
    businessRegistration: /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/,
    ipAddress: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
}

export {
    regexp,
}