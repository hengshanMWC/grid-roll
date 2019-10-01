module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-new': 'off'
    // 'no-multiple-empty-lines': 0,
    // 'arrow-parens': 0,
    // 'camelcase': 0,
    // 'no-tabs': 'off',
    // // allow async-await
    // 'generator-star-spacing': 'off',
    // // 禁止重复 import
    // "space-before-function-paren": ["off", "always"]
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    CMBLS: true
  }
}
