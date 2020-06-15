const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { resolve } = require('./utils');


module.exports = (config) => {
    const baseConfig = {
        entry: resolve('client/client.js'),
        output: {
            path: resolve('dist'),
            publicPath: config.publicPath,
            // 入口文件生产的js
            filename: config.noHash ? 'js/[name].js' : 'js/[name].[chunkhash].js',
            // 非入口文件生产的js
            chunkFilename: config.noHash ? 'js/[name].js' : 'js/[name].[chunkhash].js'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    include: resolve('client'),
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: [
                                "@babel/plugin-transform-runtime",
                                ["@babel/plugin-proposal-class-properties", { "loose": false }],
                            ]
                        }
                    }
                },
                {
                    test: /\.css/,
                    use: [
                        MiniCssExtractPlugin.loader, // 与style-loader冲突，为了ssr,去掉style-loader，使用MiniCssExtractPlugin
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[path][local]-[hash:base64:5]'
                            },
                        },
                    ]
                },
                {
                    test: /\.scss/,
                    include: resolve('client'),
                    use: [
                        MiniCssExtractPlugin.loader, {
                            loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                        }, {
                            loader: "sass-loader" // 将 Sass 编译成 CSS
                        }]
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 1000,
                        }
                    }]
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    use: [{
                        loader: 'file-loader'
                    }]
                },
                {
                    test: /\.html$/,
                    include: resolve('client'),
                    loader: 'html-loader'
                }
            ]
        },
        resolve: {
            alias: {
                '@': resolve('client/src'),
                '@components': resolve('client/src/components'), // 公共组件入口
                '@styles': resolve('client/src/styles'), // 公共样式入口
                '@utils': resolve('client/src/utils'), // 工具类入口
                '@service': resolve('client/src/service'), // api模块入口
            },
            extensions: ['.js', '.jsx']
        },
        externals: {},
        plugins: [
            new MiniCssExtractPlugin({
                filename: config.noHash ? 'css/[name].css' : 'css/[name].[chunkhash].css',
            })
        ],
        optimization: {
            // 压缩css，由于配置css的压缩会覆盖默认的js压缩，所以js压缩也需要手动配置下
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true // set to true if you want JS source maps
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        }
    }
    return baseConfig;
}