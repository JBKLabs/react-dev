/* eslint-disable global-require */
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

const log = (message) => {
  console.log(chalk.keyword('salmon')('[jbk-scripts]: ') + message);
};

module.exports = {
  resolveBin,
  appDirectory,
  pkg,
  log
};
