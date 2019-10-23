const spawn = require('cross-spawn');
const path = require('path');
const parse = require('yargs-parser');

const { log, resolveBin } = require('../../util');
const find = require('../../util/find');

const eslintConfig = find.eslintConfig();
const eslintIgnore = find.eslintIgnore();
log('running eslint...')
  .then(eslintConfig.msg)
  .then(eslintIgnore.msg);

const config = eslintConfig.path ? ['--config', eslintConfig.path] : [];
const ignore = ['--ignore-path', eslintIgnore.path];
const files = parse(process.argv.slice(2))._;

console.log({ config, ignore, files });

spawn.sync(
  resolveBin('eslint'),
  [...config, ...ignore, ...files],
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
