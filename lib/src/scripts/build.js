const path = require('path');
const shell = require('shelljs');
const spawn = require('cross-spawn');
const webpack = require('webpack');

const { appDirectory, log, resolveBin } = require('../util');
const find = require('../util/find');

log.header('Building for production...');

log.debug('preparing output directory');
shell.rm('-rf', path.join(appDirectory, 'dist'));
shell.mkdir('-p', path.join(appDirectory, 'dist'));
log.debug('copying public into output directory');
shell.cp(
  '-rf',
  path.join(appDirectory, 'public/*'),
  path.join(appDirectory, 'dist')
);

const webpackConfig = find.webpackConfig();

const config = ['--config', webpackConfig];

process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';
const result = spawn.sync(
  resolveBin('webpack'),
  [...config],
  { stdio: 'inherit' }
);

process.exit(result.status);
