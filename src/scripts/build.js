const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const webpack = require('webpack');

const webpackFactory = require('../config/webpackFactory');
const { appDirectory } = require('../util');

const config = webpackFactory('production');

fs.emptyDirSync(path.join(appDirectory, 'dist'));
shell.cp('-rf', path.join(appDirectory, 'public'), path.join(appDirectory, 'dist'));

const compiler = webpack(config);
compiler.run((err, stats) => {
  if (err) {
    throw err;
  }

  console.log(stats);
});