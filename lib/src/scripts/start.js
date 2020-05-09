require('dotenv').config();
const spawn = require('cross-spawn');
const parse = require('yargs-parser');

const { resolveBin, log } = require('../util');
const find = require('../util/find');

const args = parse(process.argv.slice(2));
const entryPoint = args.entryPoint;

log.header('starting development server...');

const webpackConfig = find.webpackConfig();

const config = ['--config', webpackConfig];

const result = spawn.sync(resolveBin('webpack-dev-server'), [...config], {
  stdio: 'inherit',
  env: {
    ENTRY_POINT: entryPoint,
    NODE_ENV: process.env.NODE_ENV || 'development',
    BABEL_ENV: process.env.BABEL_ENV || process.env.NODE_ENV || 'development'
  }
});

process.exit(result.status);
