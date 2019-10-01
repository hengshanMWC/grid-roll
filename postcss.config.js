module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: [
        '> 1%',
        'last 2 versions',
        'Android >= 3.2',
        'Firefox >= 20',
        'iOS 7',
        'not ie < 9'
      ],
      flexbox: 'no-2009'
    },
    'postcss-pxtorem': {
      exclude: /(node_module)/,
      rootValue: 75, // 75px = 1rem，750设计稿下
      propList: ['*']
    }
  }
}
