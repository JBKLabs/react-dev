const path = require('path');
const spawn = require('cross-spawn');

const { resolveBin } = require('../util');

const mode = ['--mode', 'development'];
const config = [
  '--config',
  path.join(__dirname, `../config/webpack.${mode[1]}.js`)
];

const result = spawn.sync(
  resolveBin('webpack-dev-server'),
  [...mode, ...config],
  { stdio: 'inherit' }
);

process.exit(result.status);
