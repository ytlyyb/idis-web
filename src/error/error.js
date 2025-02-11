import log from './logstyle';

export default {
    install(Vue, option) {
        Vue.config.errorHandler = function(error, instance, info) {
            // console.log("error>>>", error, instance, info);
            Vue.nextTick(() => {
                // 只在开发模式下打印 log
                // console.log("process>>>", process.env);
                if (process.env.NODE_ENV === 'development') {
                    // console.error(error)
                    // sss
                    console.log(`%c AMI %c ${error.stack} %c`,
                        'background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
                        `background:${log.typeColor('danger')}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,
                        'background:transparent')
                }
            })
        }
    }
}