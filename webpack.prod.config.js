
/*
 * @Author       : zhucaiyun1@xdf.cn
 * @Date         : 2021-10-25 20:05:21
 * @LastEditors  : zhucaiyun1@xdf.cn
 * @LastEditTime : 2022-01-29 13:55:48
 * @Description  : 描述信息
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = require('path');
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  // entry: './src.js' // 打包入口
  entry: {
    pc: './src/index.js',
    app: './src/appIndex.js'
  },
  output: {
    filename: '[name][chunkhash:4].js', // 以entry的key作为name
    path: resolve.join(__dirname, '/buildDist'), // __dirname node.js的全局变量，当前执行脚本所在的目录
    clean: true
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    autoprefixer,
                    {
                      browserslist: ["last 1 version"]
                    }
                   
                  ]
                ]
              }
            }
          },
          "sass-loader"
          
        ],
      },
    /*
     * [ext]: 文件后缀名
     * [name]: 文件名称
     * [path]: 文件的相对路径
     * [folder]: 文件所在的文件夹名称
     * [contenthash]: 文件的内容hash，默认是md5生成
     * [hash]：文件的内容hash，默认是md5生成
     * [emoji]:what
     * @question:Module build failed (from ./node_modules/file-loader/dist/cjs.js):
        Error: error:0308010C:digital envelope routines::unsupported
        at new Hash (node:internal/crypto/hash:67:19)
        at Object.createHash (node:crypto:130:10)
        at getHashDigest (/Users/zcy/Documents/zlearn/learn-webpack/node_modules/file-loader/node_modules/loader-utils/lib/getHashDigest.js:46:34)
        at /Users/zcy/Documents/zlearn/learn-webpack/node_modules/file-loader/node_modules/loader-utils/lib/interpolateName.js:113:11
     *  https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported
    * @answer: export NODE_OPTIONS=--openssl-legacy-provider    终端中输入这个命令？node版本的问题
     */ 
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][contenthash:4][ext][query]'
        }
        // use: [
        //   {
        //     // loader: 'file-loader',
        //     options: {
        //       name: 'img/[name][contenthash:4].[ext]'
        //     }

        //   },
        // ]
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
      new HtmlWebpackPlugin(),
      // new TerserPlugin({// 压缩js的
      //   test: /\.js(\?.*)?$/i
      // })
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
  
  /* 13-plugins js 优化，资源管理，环境变量注入； 构建前删除目录等；整个构建工程 */
  plugins: [
    // new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    })
    // new webpack.HotModuleReplacementPlugin()
  ],
  /* 14-mode 
  会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。为模块和 chunk 启用确定性的混淆名称，FlagDependencyUsagePlugin，FlagIncludedChunksPlugin，ModuleConcatenationPlugin，NoEmitOnErrorsPlugin 和 TerserPlugin 。
  */
  mode: 'production', // 开发 'production' 生产环境, https://v4.webpack.docschina.org/concepts/mode/
  /* 15-解析es6和reactJsx */

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
  /*
  * 22、高级用法｜自动清理构建目录
  * webpack 5:使用了output中设置clean即可
  * webpack 4:使用cleanWebpackPlugin来设置
  */
  /*
  * 23: css自动加前缀-postcss-loader
  * 浏览器内核 ie： trident；firefox：Gecko；chrome,safari：webkit；
  * 安装：postcss postcss-loader autoprefixer （autoprefixer需要通过require来引入使用）
  * 厂商前缀是根据支持程度来判断是否家
  */
  /*
  * 24: px转换rem；
  * 1、px2rem-loader:"undefined missing '}'":将px2rem放到css-loader之后即可；不要放到sass-loader之后
  * 2、lib-flexible  -S?-D 动态计算不同屏幕大小上跟元素的font-size
  */ 
 /*
 * 25:资源内联-优化 减少http请求
 * 讲一些html css js 图片内联到某个html中
 * webpack4使用row-loader?5使用row-loader[html/js]；css使用style-loader或者html-inline-css-webpack-plugin
 */
/*
* 26:多页面应用： seo优化
* 通过函数修改entry等生成多个html文件
* 用到glob
*/
/*
* 27: source map - dev环境比较多
* map类型：eval：通过eval方法将映射信息在编译的js代码中：source-map：将js文件进行了分离；inline-source-map：map和内容是在一起的 将map内联到js文件中 文件体积变大很多；source-map
* devtool中设置source map
*/
/*
* 28： 公共资源抽取-解决js过大问题
* 1、html-external-plugin:需要在html中引用一下抽取文件的cdn地址 那些场景会使用 在plugins 
https://www.npmjs.com/package/html-webpack-externals-plugin
* 2、SplitChunksPlugin: 拆分公共资源通过cacheGroups进行设置 在optimization
https://webpack.docschina.org/plugins/split-chunks-plugin/
*/
/*
* 29: treeshaking-优化 从rollup
* 用于在production模式下内部存在的优化功能 将未引用的代码删除掉；dce;
用法：1、必须是通过import的代码；2、使用es6的语法； harmony就是es63、配置副作用文件可以不用tree-shaking:sideEffects:[]|false
*/
/*
* 30、scope hoisting 从rollup借鉴
*  mode是none的时候：build后的js文件就会是闭包代码
* 缺点：1，代码都在闭包中 2、作用于比较多会导致内存消耗大
*/
/*
* 31、代码分割的意义-首屏加载慢的问题
* 1、前面讲过的 28:splitChunk
* 2、按需加载：首屏的就首屏代码提取-懒加载，相同代码抽取：
*     commonJs：require.ensure
      ES6 动态import：
          @babel/plugin-syntax-dynamic-impoort 
*/
/*
* 32、构建和eslint
* 制作eslint规范 airbnb
* 不重复造轮子，基于airbnb或者腾讯的基础来制定
* 能够帮助发现代码错误的规则，全部开启
代码风格统一，但不要限制开发体验；
* 落地：CI/CD系统集成:从集成和测试阶段，到交付和部署
        
       webpack集成:eslint-loader
*/
/*
* 33、webpack打包组件和基础库：
* 支持esmodule｜cjs｜amd｜script cdn
*/
/*
* todo
* 魔法教师或者frontend中build或者dev有用到sourcemap吗？什么类型？有用到source的plugins或者loader吗？
* 运行的很慢在改完东西后：
* 首屏加载慢： 
* 项目中设置slid-effects了吗？不然import的css会被删除掉吗？
* 首页怎么动态加载呢？
* CI？CD是什么这时候怎么eslint
*/
}
           

