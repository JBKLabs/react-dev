const elevate = require('../../util/elevate');
const install = require('../../util/install');

elevate(['babel.config.js']);

install([
  '@babel/cli',
  '@babel/core',
  '@babel/preset-env',
  '@babel/preset-react',
  'babel-plugin-module-resolver'
]);
