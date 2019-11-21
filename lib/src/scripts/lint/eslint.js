require('dotenv').config();
const spawn = require('cross-spawn');
const parse = require('yargs-parser');

const { log, resolveBin } = require('../../util');
const find = require('../../util/find');

log.header('running eslint...');

const args = parse(process.argv.slice(2), {
  boolean: ['fix']
});

const eslintConfig = find.eslintConfig();
const eslintIgnore = find.eslintIgnore();

const config = eslintConfig ? ['--config', eslintConfig] : [];
const ignore = ['--ignore-path', eslintIgnore];
const fix = args.fix ? ['--fix'] : [];
const files = args._;

if (files.length === 0) {
  log.error(
    'You must specify one or more file paths. Glob patterns are accepted.'
  );
  process.exit(1);
}

const result = spawn.sync(
  resolveBin('eslint'),
  [...config, ...ignore, ...fix, ...files],
  {
    stdio: 'inherit'
  }
);

process.exit(result.status);
