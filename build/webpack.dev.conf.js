const merge = require('webpack-merge')
const path = require('path')
const config = require('../config')
const baseConfig = require('./webpack.base.conf')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    stats: 'errors-only',
    // contentBase: resolve('dist'),
    open: config.dev.autoOpenBrowser,
    historyApiFallback: true, // 404的页面会自动跳转到/页面
    hot: true, // 启用 webpack 的模块热替换特性
    host: config.dev.host, // 希望服务器外部可访问
    port: config.dev.port, // 服务器端口
    publicPath: config.dev.publicPath,
    // compress: true,
    overlay: {
      errors: true
    },
    // quiet: true,
    progress: false
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin(), // 热加载模块
    new HtmlWebpackPlugin({ // 给index.html自动添加引用的JS文件，CSS文件
      filename: 'index.html',
      template: resolve('index.html'),
      inject: true
    })
    // new FriendlyErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [{
          loader: 'vue-style-loader', // 将 JS 字符串生成为 style 节点
          options: {
            sourceMap: true
          }
        }, {
          loader: 'css-loader', // 将 CSS 转化成 CommonJS 模块
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader', // postcss
          options: {
            sourceMap: true
          }
        }, {
          loader: 'sass-loader', // 将 Sass 编译成 CSS
          options: {
            sourceMap: true
          }
        }
        ]
      }
    ]
  }
})
