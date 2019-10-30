const elevate = require('../../util/elevate');
const install = require('../../util/install');

elevate(['webpack.config.js']);

install([
  'babel-loader',
  'case-sensitive-paths-webpack-plugin',
  'css-loader',
  'html-webpack-plugin',
  'style-loader',
  'webpack',
  'webpack-cli',
  'webpack-dev-server'
]);
