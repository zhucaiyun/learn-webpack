/*
 * @Author       : zhucaiyun1@xdf.cn
 * @Date         : 2021-10-25 20:05:21
 * @LastEditors  : zhucaiyun1@xdf.cn
 * @LastEditTime : 2021-11-02 14:06:44
 * @Description  : 描述信息
 */
// const HtmlWebpackPlugin = require('html-webpack-plugin/typings');
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
  * loader是一个函数，源文件作为参数，输出供下一步使用的内容 这些文件是webpack不能识别的文件（除js和json外的） 用于对模块源代码进行转换
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
      { test: /\.css$/, use: 'css-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'] // 不用专门的babelrc文件了
          }
        }
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader',
          options: {injectType: "styleTag"}
        },"css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader","css-loader","sass-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.ttf$/,
        use: 'file-loader'
      }
    ]
  },
  /*
 * CommonsChunkPlugin: 将chunks相同的模块代码提取成公共js
 * CleanWebpackPlugin: 清理构建目录
 * ExtractTextWebpackPlugin: 将css从bundle文件里提取一个独立的css文件
 * CopyWebpackPlugin: 将文件或者文件夹拷贝到构建的输出目录
 * HtmlWebpackPlugin: 创建html文件去承载输出的bundle
 * UglifyjsWebpackPlugin: 压缩JS
 * ZipWebpackPlugin: 将打包出的资源生成一个zip包
 * DefinedPlugin： ？？？
 * todo 怎么用
 * */
  // plugins: [
  //   new HtmlWebpackPlugin({template: './src/index.html'})
  // ],
  // 根据不同环境设置 webpack会开启对应环境的一些优化设置
  mode: 'development', // 开发 'production' 生产环境, https://v4.webpack.docschina.org/concepts/mode/
  /* *
  * 监听文件变化 watch：但是不会自动刷新页面
  * */
  // watch: true,
  // watchOptions: {
  //   aggregateTimeout: 300, // 做一个延迟 ms
  //   poll: 1000, // 指定毫秒进行轮询 
  //   ignored: ['node_modules'] //忽略监听的文件 /node_modules/
  // },
  /*
  * 热更新：页面自动更新 【https://webpack.docschina.org/configuration/dev-server/#devserverstatic]
 * 原理：
 * 方法1: webpack-dev-server
 * 方法2: webpack-dev-middleware 未实验
 * */
  devtool: 'inline-source-map', // 在开发环境下会将错误映射到源码中而不是编译后的代码中
  devServer: {
    static: resolve.join(__dirname, 'dist'), // 用于确定应该从哪里提供bundle static 不要用contentBase
    compress: true,
    port: 9998,
    hot: true
  },
};