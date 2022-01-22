
/*
 * @Author       : zhucaiyun1@xdf.cn
 * @Date         : 2021-10-25 20:05:21
 * @LastEditors  : zhucaiyun1@xdf.cn
 * @LastEditTime : 2022-01-21 17:04:50
 * @Description  : 描述信息
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = require('path');
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')


module.exports = {
  // entry: './src.js' // 打包入口
  entry: {
    pc: './src/index.js',
    app: './src/appIndex.js'
  },
  output: {
    filename: '[name][hash:4].js', // 以entry的key作为name
    path: resolve.join(__dirname, '/buildDist') // __dirname node.js的全局变量，当前执行脚本所在的目录
  },
  /* 
  * 12-loaders webapck原生支持js和json 将各种关系的js jsonn文件转换成可接受的文件，供使用；那为什么要webpack呢 loader就是转换其他css 图片 字体等文件 感觉没什么用呢
  */
  module: {
    rules: [
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
      
      // { test: /\.css$/, use: 'css-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,'css-loader',"sass-loader"
        ],
      },
      // {
      //   test: /\.scss$/,
      //   use: ["style-loader","css-loader","sass-loader"]
      // },
    /*
     * [ext]: 文件后缀名
     * [name]: 文件名称
     * [path]: 文件的相对路径
     * [folder]: 文件所在的文件夹名称
     * [contenthash]: 文件的内容hash，默认是md5生成
     * [hash]：文件的内容hash，默认是md5生成
     * [emoji]:what
     */ 
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name][hash:4].[ext]'
            }
          }
        ]
      },
      {
        test: /\.ttf$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ],
      }
      /* 
      * todo 16-解析css less sass
      * todo 17-图片和字体资源
      */

    ],

  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new HtmlWebpackPlugin()
    ]
  },
  
  /* 13-plugins js 优化，资源管理，环境变量注入； 构建前删除目录等；整个构建工程 */
  plugins: [
    // new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    })
    // new webpack.HotModuleReplacementPlugin()
  ],
  /* 14-mode todo 5中没有mode配置了吧 */
  mode: 'production', // 开发 'production' 生产环境, https://v4.webpack.docschina.org/concepts/mode/
  /* 15-解析es6和reactJsx */
  
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

  /* *
  * 根据不同环境设置 webpack会开启对应环境的一些优化设置
  * 监听文件变化 watch：但是不会自动刷新页面
  * 18-热更新 package.json中增加 "watch": "webpack --watch"
  */
  
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
  * 19 webpack中的热更新及原理分析
  * wds（webpack-dev-server）+hotmodulereplacementplugin 
  * 1、增加dev命令
  * 2、引入hmrp
  * 3、set devserver
  * wdm
  * */
  
  // devtool: 'inline-source-map', // 在开发环境下会将错误映射到源码中而不是编译后的代码中
  // devServer: {
  //   static: resolve.join(__dirname, 'dist'), // 用于确定应该从哪里提供bundle static 不要用contentBase
  //   compress: true,
  //   port: 9998,
  //   hot: true
  // }

  /* 20、文件指纹、
  * chunk(入口有关，entry中一个文件就是一个chunk), 
  * bundle(打包生成的文件), 
  * module（自己的源代码）
  * 版本管理-没有修改的文件可以继续使用？ compile  compilelation影响hash
  * 方式： 
  * hash:（整个项目的构建相关，只要项目中有文件修改，hash就会变） 
  * chunkhash（js）: 和webpack打包的chunk或者模块有关，不同的entry会生成不同的chunkhas值； 
  * contenthash（css）: 根据文件内容来定义hash 文件内容不变则contenthash（根据bundle）不变； 那为什么不都用contenthash呢？
  * chunkfilename,filename区别
  */ 
  
  /*
  * 21、html,css,js代码压缩
  * js会自动压缩 webpack自动加载了压缩js的插件
  * html: html-webpack-plugin 【https://github.com/jantimon/html-webpack-plugin#options】
  * css: CssMinimizerPlugin在optimization中配置使用将抽离出来的css压缩
  */ 
  

}
           