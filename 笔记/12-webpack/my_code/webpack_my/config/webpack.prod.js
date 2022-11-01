// 模块化方案采用的是nodeJS 的CommonJS模块化方案
// webpack的核心配置对象中，5个最主要的：
//      entry、output、mode、plugins、loader


const path = require('path');

// 代码规范，引入插件
const ESLintPlugin = require('eslint-webpack-plugin');
// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 1、文件入口
    entry: './src/main.js',

    // 2、文件出口
    output: {
        // 输出目录，必须是绝对路径
        // path: path.join(__dirname, './dist/js'),
        path: path.join(__dirname, './dist'),
        // 输出的文件名
        filename: 'js/bundle.js',
        // 是否清空上次输出
        clean: true
    },

    // 3、模式
    mode: 'production',   // production 会压缩生成的boudle.js文件， 但是development不会压缩

    // 4、module
    module: {
        rules: [
            // 4.1 css文件
            {
                test: /\.css$/,  // 正则表达式，处理css文件
                use: [
                    'style-loader',  // 将 CSS 生成 style 标签插入到 HTML 中
                    'css-loader'     // 将 CSS 转为 CommonJS 的模块
                ]
            },
            // 4.2 less文件
            {
                test: /\.less$/,
                use: [
                    'style-loader',     // 将 CSS 生成 style 标签插入到 HTML 中
                    'css-loader',       // 将 CSS 转为 CommonJS 的模块
                    'less-loader'       // 将 less 文件编译成 css 文件
                ]
            },
            // 4.3 处理js：利用 babel 将 ES6+ 转为 ES5
            {
                test: /\.js$/,   // 正则，所有js文件
                exclude: /node_modules/,  // 正则，排除不处理的js文件
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [     // 指定babel预设包
                            [
                                '@babel/preset-env',
                                {           // 使用@babel/polyfill项目依赖包
                                    useBuiltIns: 'usage',  // 只打包使用的ES6新API的实现代码
                                    corejs: { version: 2 } // 指定 core-js 的版本号为2
                                }
                            ]
                        ],
                        plugins: []    // 指定babel插件包
                    }
                }

            },
            // 4.4 处理 css 和 js 中的图片
            {
                test: /\.(jpg|png|gif)$/,
                type: "asset",
                // 解析器
                parser: {
                    // 指定进行图片base64编码最大文件大小
                    dataUrlCondition: {
                        maxSize: 5 * 1024, // 5kb    默认8k
                    }
                },
                // 打包生成的文件
                generator: {
                    filename: 'images/[hash:8][ext]',
                },
            },
            // 4.5 配置 html 的 loader
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            },
            // 4.6 打包字体图片
            {
                test: /\.(eot|svg|woff|woff2|ttf)$/,
                type: 'asset',
                // 解析器
                parser: {
                    // 指定进行base64编码最大文件大小
                    dataUrlCondition: {
                        maxSize: 5 * 1024, // 5kb
                    }
                },
                generator: {
                    filename: 'fonts/[hash:8][ext]',
                },
            },
        ]
    },

    // 5、代码规范：
    plugins: [
        new ESLintPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",   // 指定html模板文件。
            inject: "body",                    // 将打包生成的JS文件放置在body尾部
            hash: true,                        // 在引入JS时增加hash后缀字符串,去除缓存。
            minify: {
                removeAttributeQuotes: true,   // 移除属性中的双引号
                removeComments: true,          // 移除注释
                collapseWhitespace: true,      // 去除空格与换行
            }
        })
    ],

    // 6、配置开发服务
    // devServer: {  // 配置热更新 启动命令：npx webpack-dev-server  会自动启动浏览查看效果, 修改代码后会自动刷新
    //     port: 9527,  // 打开端口
    //     open: true   // 是否自动发开
    // },

    // 7、报错信息提示
    // 开启sourceMap调试
    // devtool: 'source-map', // 生成单独的sourceMap文件 ==> 慢
    // devtool: 'cheap-module-source-map', // 只生成内联的sourceMap ==> 快
    // 生产环境打包不用生成sourceMap， 只有开发环境需要



}