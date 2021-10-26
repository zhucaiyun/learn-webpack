/*
 * @Author       : zhucaiyun1@xdf.cn
 * @Date         : 2021-10-25 20:05:21
 * @LastEditors  : zhucaiyun1@xdf.cn
 * @LastEditTime : 2021-10-25 20:46:00
 * @Description  : 描述信息
 */
const resolve = require('path');

module.exports = {
  // entry: './src.js' // 打包入口
  entry: {
    pc: './src/index.js',
    app: './src/appIndex.js'
  },
  output: {
    filename: '[name].js', // 以entry的key作为name
    path: resolve.join(__dirname, '/dist') // __dirname node.js的全局变量，当前执行脚本所在的目录
  },
  /*
 * loader是一个函数，源文件作为参数，输出供下一步使用的内容 这些文件是webpack不能识别的文件（除js和json外的）
 * 常见的loader
 * babel-loader: 转换es6es7为es5
 * css-loader: 编译加载css文件
 * less-loader/sass-loader
 * file-loader: 图片，富文本文件的加载
 * raw-loader: 文本文件转换成字符的形式
 * thread-loader: 使webpack可以多进制打包文件
 * */
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' }
    ]
  }
};