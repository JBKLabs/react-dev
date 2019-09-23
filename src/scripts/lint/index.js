const spawn = require('cross-spawn');
const path = require('path');

const { log, handleSpawnResult } = require('../../util');

const args = process.argv.slice(2);

const run = (token) => {
  log(`Running ${token}`);
  const scriptPath = path.join(__dirname, token);
  const result = spawn.sync('node', [scriptPath, ...args], {
    stdio: 'inherit'
  });
  handleSpawnResult(result);
  return result.status;
};

const failure = [
  'eslint',
  'prettier'
].some(s => run(s) !== 0);

process.exit(failure ? 1 : 0);