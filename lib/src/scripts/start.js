require('dotenv').config();
const spawn = require('cross-spawn');

const { resolveBin, log } = require('../util');
const find = require('../util/find');

log.header('starting development server...');

const webpackConfig = find.webpackConfig();

const config = ['--config', webpackConfig];

const result = spawn.sync(resolveBin('webpack-dev-server'), [...config], {
  stdio: 'inherit',
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development',
    BABEL_ENV: process.env.BABEL_ENV || process.env.NODE_ENV || 'development'
  }
});

process.exit(result.status);
