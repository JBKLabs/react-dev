const path = require('path');
const shell = require('shelljs');
const webpack = require('webpack');

const webpackFactory = require('../config/webpackFactory');
const { appDirectory, log } = require('../util');

const config = webpackFactory('production');

shell.rm('-rf', path.join(appDirectory, 'dist'));
shell.mkdir('-p', path.join(appDirectory, 'dist'));
shell.cp('-rf', path.join(appDirectory, 'public/*'), path.join(appDirectory, 'dist'));

const compiler = webpack(config);
compiler.run((err) => {
  if (err) {
    throw err;
  }

  log('successfully built app to /dist');
});