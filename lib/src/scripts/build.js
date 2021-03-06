require('dotenv').config();
const path = require('path');
const shell = require('shelljs');
const spawn = require('cross-spawn');
const parse = require('yargs-parser');

const { appDirectory, log, resolveBin } = require('../util');
const find = require('../util/find');

const args = parse(process.argv.slice(2));
const buildPath = path.join(appDirectory, args.buildPath || 'dist');
const entryPoint = args.entryPoint;

log.header('Building for production...');

log.debug('preparing output directory');
shell.rm('-rf', buildPath);
shell.mkdir('-p', buildPath);
log.debug('copying public into output directory');
shell.cp('-rf', path.join(appDirectory, 'public/*'), buildPath);

const webpackConfig = find.webpackConfig();

const config = ['--config', webpackConfig];

const result = spawn.sync(resolveBin('webpack'), [...config], {
  stdio: 'inherit',
  env: {
    BUILD_PATH: buildPath,
    ENTRY_POINT: entryPoint,
    NODE_ENV: process.env.NODE_ENV || 'production',
    BABEL_ENV: process.env.BABEL_ENV || process.env.NODE_ENV || 'production'
  }
});

process.exit(result.status);
