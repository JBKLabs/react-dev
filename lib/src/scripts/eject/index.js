const spawn = require('cross-spawn');
const path = require('path');

const { log, handleSpawnResult } = require('../../util');

const [executor, , scope, ...args] = process.argv;

if (!scope) {
  log.error('eject must be called with a scope, i.e. eslint.');
  process.exit(1);
}

try {
  log.header(`running eject ${scope}...`);

  const relativeScriptPath = path.join(__dirname, scope);
  const scriptPath = require.resolve(relativeScriptPath);

  const result = spawn.sync(executor, [scriptPath, ...args], {
    stdio: 'inherit'
  });

  handleSpawnResult(result, scope);
  process.exit(result.status);
} catch (error) {
  console.log(error);
  log.error(`Unknown scope ${scope}`);
  process.exit(1);
}