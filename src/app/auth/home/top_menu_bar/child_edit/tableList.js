const messageRemindingList = [
    {
        label: 'ytlUserReading.happenTime',
        prop: 'eventTime',
    }, {
        label: 'ytlPage.alarmSource',
        prop: 'alarmSource',
    }, {
        label: 'ytlPage.alarmTypes',
        prop: 'alarmType',
    }, {
        label: 'ytlUserReading.reportTime',
        prop: 'createTime',
    }, {
        label: 'ytlUserReading.AlarmDescription',
        prop: 'eventContent',
    }]
const options = [{
    value: 1,
    label: 'ytlPage.Platform'
}, {
    value: 2,
    label: 'ytlPage.energyMeter'
}, {
    value: 3,
    label: 'ytlPage.DCU'
}, {
    value: 4,
    label: 'ytlPage.converter'
}, {
    value: 5,
    label: 'ytlPage.waterMeter'
}]
const styleList = [{
    label: "中国",
    value: 1,
}, {
    label: "泰国",
    value: 2,
}]
export {
    messageRemindingList,
    options,
    styleList
}