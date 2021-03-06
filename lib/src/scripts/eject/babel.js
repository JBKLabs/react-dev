require('dotenv').config();
const elevate = require('../../util/elevate');
const install = require('../../util/install');

elevate(['babel.config.js']).then(() =>
  install([
    '@babel/cli',
    '@babel/core',
    '@babel/preset-env',
    '@babel/preset-react',
    'babel-plugin-module-resolver'
  ])
);
