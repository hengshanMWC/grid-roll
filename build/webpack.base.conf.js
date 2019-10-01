const path = require('path');
const utils = require('./utils')
const config = require('../config')

const {
  VueLoaderPlugin
} = require('vue-loader')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].[hash].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    // 用于查找模块的目录
    extensions: ['.js', '.vue', '.json', '.scss'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js', // 根据 vue-loader 官网的说明，我们还需要配置一个插件，然后还需要配置 resolve.alias 别名，不然 Webpack 没法找到 Vue 模块
      '@': resolve('src'),
      'components': resolve('src/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.(vue|js)$/,
        include: [
          resolve('src')
        ],
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter'),
          quiet: true
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    // new ProgressBarPlugin(),
    new VueLoaderPlugin() // webpack 4 vue-loader需要这样使用
  ]
};
