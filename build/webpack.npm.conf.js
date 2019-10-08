/**
 * 发布到npm前的打包
 */
const path = require('path')
const merge = require('webpack-merge')
const config = require('../config')
const baseConfig = require('./webpack.base.conf')

const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = merge(baseConfig, {
  mode: 'production',
  entry: './src/index.js',
  output: {
    publicPath: '',
    path: config.build.assetsRoot,
    filename: 'grid-roll.min.js',
    library: 'grid-roll', // 指定的就是你使用require时的模块名
    libraryTarget: 'umd', // libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的
    umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
  },
  externals: {
    'vue': {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  // devtool: 'source-map',
  module: {
    rules: [{
      test: /\.(scss|css)$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../../'
        }
      }, {
        //     loader: 'vue-style-loader', // 将 JS 字符串生成为 style 节点
        //     options: {
        //       sourceMap: true
        //   }
        // }, {
        loader: 'css-loader', // 将 CSS 转化成 CommonJS 模块
        options: {
          sourceMap: false
        }
      },
      {
        loader: 'postcss-loader', // postcss
        options: {
          sourceMap: false
        }
      }, {
        loader: 'sass-loader', // 将 Sass 编译成 CSS
        options: {
          sourceMap: false
        }
      }
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'grid-roll.min.css'
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false
        },
        sourceMap: false,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({
        // assetNameRegExp: /\.style\.css\.scss$/g, //一个正则表达式，指示应优化/最小化的资产的名称。提供的正则表达式针对配置中ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/\.css$/g
        // cssProcessor: require('cssnano'), //用于优化\最小化CSS的CSS处理器，默认为cssnano
        // cssProcessorOptions: {
        //   safe: true,
        //   discardComments: {
        //     removeAll: true
        //   }
        // }, //传递给cssProcessor的选项，默认为{}
        // canPrint: true //一个布尔值，指示插件是否可以将消息打印到控制台，默认为true
      })
    ]
  }
})
