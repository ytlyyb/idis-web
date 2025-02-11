const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const path = require('path')

// const PrerenderSPAPlugin = require("prerender-spa-plugin");
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;


    // 配置基本大小
module.exports = {
    // lintOnSave: process.env.NODE_ENV !== 'production',
    productionSourceMap: false,//去除map源码文件
    lintOnSave: false,
    outputDir: 'dist',
    devServer: {
        proxy: {
            // 代理 /api 路径下的请求到目标服务器
            '/api': {
              target: 'http://10.10.10.143:5000/api', // 目标服务器地址
              changeOrigin: true, // 改变请求的源头
              pathRewrite: { '^/api': '' }, // 重写路径，去掉 /api
            },
          },
        overlay: {
            warnings: false,
            errors: false
        },
        host: '0.0.0.0',    // 默认是 host
        // public: '10.10.15.90:8080', // 此处是自己电脑IP地址！
        port: 8080,  
        https: false,   // 通过 HTTP 提供服务
        disableHostCheck: true,     //绕过主机检查
        open: true,     // 项目启动时，自动打开浏览器
        hot: true,
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                // '@': path.resolve(__dirname, './src'),
                // '@i': path.resolve(__dirname, './src/assets'),
                '@p': path.resolve(__dirname, './public'),
            }
        },
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            
            //预渲染---自动更新测试打包失败
            // new PrerenderSPAPlugin({
            //     staticDir: path.join(__dirname, "./dist"),
            //     // 需要进行预渲染的路由路径
            //     //**坑1，预渲染必须是静态页面，无接口调用**
            //     routes:['/', '/login'], // 需要预渲染的路由
            //     // html文件压缩
            //     minify: {
            //         minifyCSS: true, // css压缩
            //         removeComments: true, // 移除注释
            //     },
            //     renderer: new Renderer({
            //         inject: {
            //             foo: "bar",
            //         },
            //         // 在 main.js 中 new Vue({ mounted () {document.dispatchEvent(new Event('render-event'))}})，两者的事件名称要对应上。
            //         renderAfterTime: 5000, //触发渲染的时间，用于获取数据后再保存渲染结果
            //         headless: false,   //使用jenkins自动化部署不可以使用headless
            //         renderAfterDocumentEvent: "render-event",
            //         renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
            //             //这样写renderAfterTime生效了
            //             renderAfterTime: 5000,
            //         }),
            //         args: ["--no-sandbox", "--disable-setuid-sandbox"],
            //     }),
            // }),





            // 下面是下载的插件的配置 gzip压缩
            // new CompressionWebpackPlugin({
            //     algorithm: 'gzip',
            //     test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            //     threshold: 10240,
            //     minRatio: 0.8,
            //     deleteOriginalAssets: false
            // }),
            
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 20,
                minChunkSize: 500
            })
        ],
        module: {
            rules: [
              {
                test: /\.json$/,
                loader: 'json-loader',
                type: 'javascript/auto',
              },
            ],
        },
        //js文件分包
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'initial', // 可选值：all，async 和 initial。all功能最强大，所以咱们就使用all
                maxInitialRequests: Infinity, // 最大并行请求数，为了以防万一，设置无穷大即可
                minSize: 20000, // 引入的模块大于20kb才做代码分割，官方默认20000，这里不用修改了
                maxSize: 60000, // 若引入的模块大于60kb，则告诉webpack尝试再进行拆分
                cacheGroups: {
                    chunks: {
                        test: /chunk-.*\.js$/,
                        priority: -10,
                        name(module) { // 设定分包以后的文件模块名字，按照包名字替换拼接一下
                            const packageName = module.context.match(/chunk-(.*?)([\\/]|$)/)[1]
                            return `npm.${packageName.replace('@', '')}`
                        },
                    },
                    jsOnly: {
                        test: /\.js$/,
                        priority: -20,
                        name: 'js-only',
                    },
                },
            }
        },
    },
    css: {
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    require("postcss-px2rem")({
                        remUnit: 192 ///设计图宽度/10
                    })
                ]
            }
        }
    },
}