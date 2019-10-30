const spawn = require('cross-spawn');
const path = require('path');
const parse = require('yargs-parser');

const { log, handleSpawnResult } = require('../../util');

const executor = process.argv[0];
const parsedArgs = parse(process.argv.slice(2), {
  boolean: ['config-only']
});

if (!parsedArgs._ || parsedArgs._.length !== 1) {
  log.error('eject must be called with a provider, i.e. eslint.');
  process.exit(1);
}

const provider = parsedArgs._[0];

try {
  log.header(`running eject ${provider}...`);

  const relativeScriptPath = path.join(__dirname, provider);
  const scriptPath = require.resolve(relativeScriptPath);

  process.env.CONFIG_ONLY = parsedArgs.configOnly;
  const result = spawn.sync(executor, [scriptPath], {
    stdio: 'inherit'
  });

  handleSpawnResult(result, provider);
  process.exit(result.status);
} catch (error) {
  // eslint-disable-next-line no-console
  console.log(error);
  log.error(`Unknown provider ${provider}`);
  process.exit(1);
}
