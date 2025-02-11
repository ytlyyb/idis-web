export default {
    /**
     * @description 返回这个样式的颜色值
     * @param {String} type 样式名称 [ primary | success | warning | danger | text ]
     */
    typeColor: function typeColor(type = 'default') {
        let color = ''
        switch (type) {
            case 'default':
                color = '#35495E';
                break
            case 'primary':
                color = '#3488ff';
                break
            case 'success':
                color = '#43B883';
                break
            case 'warning':
                color = '#e6a23c';
                break
            case 'danger':
                color = '#f56c6c';
                break
            default:
                ;
                break
        }
        return color
    },


    logType: function logType() {

        console.log(`%c ZDST-Landlord %c ${error} %c`,
            'background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
            `background:${log.typeColor('danger')}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,
            'background:transparent', error)
    }



}