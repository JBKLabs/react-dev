const spawn = require('cross-spawn');
const path = require('path');

const { log } = require('../../util');

const args = process.argv.slice(2);

const run = (token) => {
  log(`Running ${token}`);
  const scriptPath = path.join(__dirname, token);
  return spawn.sync('node', [scriptPath, ...args], {
    stdio: 'inherit'
  });
};

run('eslint');