import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import deepmerge from 'deepmerge'
let lang = { idisLogin: { username: '用户名', verificationCode: '验证码', signIn: '登录', loginByAccount: '账号密码登录', rememberpassword: '记住密码', forgetpassword: '忘记密码', login: '登录', input_account: '请输入账号', input_password: '请输入密码', input_code: '请输入验证码', input_email: '请输入邮箱', limit_password: '长度在 6 到 25 个字符', limit_code: '范围在-100 到100之间', requesterror: '网络请求出错!', login_success: '登录成功', limit_account: '请输入字母和下划线', 
    error_login: '用户名或密码错误，请重新输入', backToLogin: '返回登录', recoverPassword: '密码找回', nextStep: '下一步', email_limit: '请输入正确邮箱', email_tip1: '我们已向您填写的邮箱', email_tip2: '发送了一封密码找回邮件', enterEmail: '进入邮箱', notReceive: '没有收到', resend: '重新发送', emailSend: '邮件发送成功', setNewPassword: '设置新密码', 
    input_newPassword: '请输入6~25位带有大小写的密码', input_newPasswordAgain: '请再次输入6~25位带有大小写确认密码', complete: '完成', notmatch_password: '两次密码输入不一致', you_refresh_too_often: '您刷新的太频繁，请稍后再试。', edit_success: '修改成功',password:'密码' },idisTips:{
        isLogout:'是否退出登录',
    },idisPage:{tip:'提示',cancel:'取消',comfirm:'确定',} ,idisMenu:{
        homePage:'我的首页',
    },ytlMenu:{ terminalOperate:'集中器远程操作',pushNotification:'消息管理',AutomaticRegistration:'自动注册',publicUserPage:'公变用户-更多',specificUserPage:'专变用户-更多',meterOperate:'电表远程操作',example:'案例',example1:'案例1',test:'测试',home:'首页',homePage:'我的首页',mapShow:'地图监测',meterReading:'抄表管理',deviceParameter:'设备档案',deviceOperate:'设备操作',meterData:'表计数据',readingReport:'抄表统计',powerUsed:'用电管理',powerUser:'用电用户',userReading:'抄表数据',readingDetail:'抄表数据-详情',userPower:'用电分析',userEvent:'异常分析',userReport:'用电统计',powerSale:'售电管理',sellingUser:'售电用户',powerSelling:'售电操作',sellingConfig:'售电配置',powerPrice:'电价管理',sellingReport:'售电统计',powerSupply:'供电管理',businessModel:'分析模型',supplyEnergy:'供电分析',supplyLoad:'负荷分析',loadControl:'负荷控制',supplyReport:'供电统计',powerDistribute:'配电管理',gridModel:'电网模型',distributeEnergy:'配网用电分析',substation:'变电站分析',gridLoss:'网损分析',distributeReport:'配电统计',ITOps:'运维管理',deviceMonitor:'设备状况',anomalyAnalysis:'异常分析',workOrder:'工单管理',maintainReport:'统计报表',APIInterface:'对外接口',APIMonitor:'接口监控',APILog:'对接方案',APIReport:'统计报表',systemConfig:'系统管理',accountAuthority:'账号权限',meterVersion:'版本管理',parameterConfig:'系统配置',userProfile:'用户配置',reportConfig:'报表配置',sureDelete:'确定删除',meterDetails:'表计详情',protocolAdd:'协议新增/修改',typesAdd:'类型新增/修改',repositoryAdd:'版本库管理',statementManagement:'报表管理'},}
const zh = deepmerge(lang, zhLocale, { clone: true })
export default zh




