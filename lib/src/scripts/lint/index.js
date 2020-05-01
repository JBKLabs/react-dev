const path = require('path');
const spawn = require('cross-spawn');

const { handleSpawnResult } = require('../../util');

const args = process.argv.slice(2);

const run = (token) => {
  const scriptPath = path.join(__dirname, token);
  const result = spawn.sync('node', [scriptPath, ...args], {
    stdio: 'inherit',
    env: {
      NODE_ENV: process.env.NODE_ENV || 'development',
      BABEL_ENV: process.env.NODE_ENV || 'development'
    }
  });
  handleSpawnResult(result, token);
  return result.status;
};

const failure = ['prettier', 'eslint'].some((script) => run(script) !== 0);

process.exit(failure ? 1 : 0);
