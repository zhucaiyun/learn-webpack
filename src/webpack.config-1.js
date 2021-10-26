/*
 * @Author       : zhucaiyun1@xdf.cn
 * @Date         : 2021-10-20 16:50:30
 * @LastEditors  : zhucaiyun1@xdf.cn
 * @LastEditTime : 2021-10-25 20:05:00
 * @Description  : 描述信息
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   // 入口js
//   entry: './src/index.js',
//   // 配置打包输出文件
//   output: {
//     path: resolve(__dirname, 'dist'),

//     // 输出的js文件名
//     filename: 'start.js'
//   },
//   modules: {
//     // 配置各种类型 html css js img类型文件的加载器，当遇到import会调用这里配置的loader对引用的文件进行编译
//     rules: [
//       {
//         // 匹配js文件
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: ['babel-loader', 'eslint-loader']
//       },
//       {
//         // 匹配html
//         test: /\.html$/,
//         use: 'html-loader'
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader']
//       },
//       {
//         test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
//         use: [
//           {
//             loader: 'url-loader',
//             options: {
//               limit: 10000
//             }
//           }
//         ]
//       }
//     ],
//     // 干预编译阶段
//     plugins: [
//       // template参数指定入口html文件路径
//       new HtmlWebpackPlugin({
//         template: './src/index.html'
//       })
//     ],
//     // 配置开发时用的服务器
//     devServer: {
//       port: 8886,
//       // 配置页面的重定向，当访问的文件不存在，返回根目录下的index.html
//       historyApiFallback: true
//     }
//   }
// };