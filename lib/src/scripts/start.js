const path = require('path');
const spawn = require('cross-spawn');

const { resolveBin, log } = require('../util');
const find = require('../util/find');

log.header('starting development server...');

const webpackConfig = find.webpackConfig();

const config = ['--config', webpackConfig];

process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';
const result = spawn.sync(
  resolveBin('webpack-dev-server'),
  [...config],
  { stdio: 'inherit' }
);

process.exit(result.status);
