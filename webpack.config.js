const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname,'dists'),
    filename: 'start.js'//'[name].sj'
  },
  // 12-loaders webapck原生支持js和json 将各种关系的js jsonn文件转换成可接受的文件，供使用；那为什么要webpack呢 loader就是转换其他css 图片 字体等文件
  // 感觉没什么用呢
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // todo 16-解析css less sass
      // todo 17-图片和字体资源
     

    ]
  },
  
  // 13-plugins js 优化，资源管理，环境变量注入； 构建前删除目录等；整个构建工程
  plugins: [
    new HtmlWebpackPlugin()
  ],
  // 14-mode todo 5中没有mode配置了吧
  mode: 'production',
  // 15-解析es6和reactJsx
  // 18-热更新 package.json中增加 "watch": "webpack --watch"
  watch: true,
  watchOptions: {
    aggregateTimeout: 10000
  }

  

}