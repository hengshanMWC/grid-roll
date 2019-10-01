const merge = require('webpack-merge')
const path = require('path')
const config = require('../config')
const baseConfig = require('./webpack.base.conf')
const utils = require('./utils')

const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = merge(baseConfig, {
  mode: 'production',
  entry: {},
  output: {
    publicPath: '',
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  // devtool: 'source-map',
  module: {
    rules: [{
      test: /\.(scss|css)$/,
      use: [
        MiniCssExtractPlugin.loader, {
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
  optimization: {
    // 采用splitChunks提取出entry chunk的chunk Group
    // splitChunks: {
    //   cacheGroups: {
    //     // 处理入口chunk
    //     vendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       chunks: 'initial',
    //       name: 'vendors',
    //     },
    //     // 处理异步chunk
    //     'async-vendors': {
    //       test: /[\\/]node_modules[\\/]/,
    //       minChunks: 2,
    //       chunks: 'async',
    //       name: 'async-vendors'
    //     }
    //   }

    // },
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        },
        styles: {
          name: 'styles',
          test: /\.(scss|css)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.style\.css$/g, //一个正则表达式，指示应优化/最小化的资产的名称。提供的正则表达式针对配置中ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/\.css$/g
        cssProcessor: require('cssnano'), //用于优化\最小化CSS的CSS处理器，默认为cssnano
        cssProcessorOptions: {
          safe: true,
          discardComments: {
            removeAll: true
          }
        }, //传递给cssProcessor的选项，默认为{}
        canPrint: true //一个布尔值，指示插件是否可以将消息打印到控制台，默认为true
      })
    ],
    // 为每个入口提取出webpack runtime模块
    runtimeChunk: {
      name: 'manifest'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
      // chunkFilename: utils.assetsPath('css/[id].[hash].css')
    }),
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    })
  ]
})
