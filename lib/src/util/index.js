/* eslint-disable global-require */
/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
const path = require('path');
const fs = require('fs');
const readPkgUp = require('read-pkg-up');
const chalk = require('chalk');

const { package: pkg, path: pkgPath } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd())
});
const appDirectory = path.dirname(pkgPath);

const resolveBin = (moduleName, executable = moduleName) => {
  const modPkgPath = require.resolve(`${moduleName}/package.json`);
  const modPath = path.dirname(modPkgPath);
  const { bin } = require(modPkgPath);
  const binPath = typeof bin === 'string' ? bin : bin[executable];
  const fullPath = path.join(modPath, binPath).replace(process.cwd(), '.');
  return fullPath;
};

const logGeneric = (prefix, message) => console.log(prefix + message);
const log = {
  header: (message) =>
    logGeneric(chalk.hex('#fa8072')('[jbk-scripts]: '), message),
  debug: (message) => logGeneric(chalk.hex('#444444')('[*]: '), message),
  error: (message) =>
    logGeneric(chalk.hex('#bb0000')('[*]: '), chalk.hex('#bb0000')(message))
};

const handleSpawnResult = (result, script) => {
  if (result.signal === 'SIGKILL') {
    console.log(
      `The script "${script}" failed because the process exited too early. ` +
        'This probably means the system ran out of memory or someone called ' +
        '`kill -9` on the process.'
    );
  } else if (result.signal === 'SIGTERM') {
    console.log(
      `The script "${script}" failed because the process exited too early. ` +
        'Someone might have called `kill` or `killall`, or the system could ' +
        'be shutting down.'
    );
  } else if (result.signal) {
    process.exit(1);
  }
};

module.exports = {
  resolveBin,
  appDirectory,
  pkg,
  log,
  handleSpawnResult
};
