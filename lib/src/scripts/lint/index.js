const spawn = require('cross-spawn');
const path = require('path');
const parse = require('yargs-parser');

const { log, resolveBin } = require('../../util');
const find = require('../../util/find');

log.header('running eslint...');

const args = parse(process.argv.slice(2), {
  boolean: ['fix']
});

const eslintConfig = find.eslintConfig();
const eslintIgnore = find.eslintIgnore();

log.debug(eslintConfig.msg);
log.debug(eslintIgnore.msg);

const config = eslintConfig.path ? ['--config', eslintConfig.path] : [];
const ignore = ['--ignore-path', eslintIgnore.path];
const fix = args.fix ? ['--fix'] : [];
const files = args._;

if (files.length === 0) {
  log.error('You must specify one or more file paths. Glob patterns are accepted.');
  process.exit(1);
}

// console.log(resolveBin('@jbknowledge/eslint-config'));

spawn.sync(
  resolveBin('eslint'),
  [...config, ...ignore, ...fix, ...files],
  {
    stdio: 'inherit'
  }
);

// const args = process.argv.slice(2);

// const run = (token) => {
//   log(`Running ${token}`);
//   const scriptPath = path.join(__dirname, token);
//   const result = spawn.sync('node', [scriptPath, ...args], {
//     stdio: 'inherit'
//   });
//   handleSpawnResult(result, token);
//   return result.status;
// };

// const failure = ['eslint', 'prettier'].some((script) => run(script) !== 0);

// process.exit(failure ? 1 : 0);
