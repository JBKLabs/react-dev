const spawn = require('cross-spawn');

const { resolveBin } = require('../util');

const args = process.argv.slice(2);

const result = spawn.sync(resolveBin('eslint'), [...args], {
  stdio: 'inherit'
});

process.exit(result.status);
