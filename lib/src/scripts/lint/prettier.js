const parse = require('yargs-parser');
const spawn = require('cross-spawn');

const { log, resolveBin } = require('../../util');
const find = require('../../util/find');

log.header('running prettier...');

const args = parse(process.argv.slice(2), {
  boolean: ['fix']
});

const prettierConfig = find.prettierConfig();
const prettierIgnore = find.prettierIgnore();

log.debug(prettierConfig.msg);
log.debug(prettierIgnore.msg);

const config = prettierConfig.path ? ['--config', prettierConfig.path] : [];
const ignore = ['--ignore-path', prettierIgnore.path];
const fix = args.fix ? ['--write'] : ['--check'];
const files = args._;

if (files.length === 0) {
  log.error('You must specify one or more file paths. Glob patterns are accepted.');
  process.exit(1);
}

const result = spawn.sync(
  resolveBin('prettier'),
  [...config, ...ignore, ...fix, ...files],
  {
    stdio: 'inherit'
  }
);

process.exit(result.status);
