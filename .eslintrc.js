module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['plugin:vue/recommended', 'airbnb-base'],
  plugins: ['import'],
  rules: {
    'no-return-assign': 2,
    'import/extensions': [2, 'never'],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.vue', '.js', '.pug', '.sass'],
      },
    },
  },
};
