const fs = require('fs');
const path = require('path');
const readPkgUp = require('read-pkg-up');

const { appDirectory } = require('./');

const { package: pkg } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
});

const buildPath = (...p) => path.join(appDirectory, ...p);
const projectHasFile = (...p) => fs.existsSync(buildPath(...p));

const babel = () => {
  let result = null;

  [
    '.babelrc',
    '.babelrc.js',
    '.babel.config.js'
  ].forEach(token => {
    if (projectHasFile(token)) {
      result = {
        token,
        configurationExists: true,
        path: buildPath(token)
      };
    }
  })

  return result || {
    token: 'package.json',
    configurationExists: !!pkg.babel
  };
};

module.exports = {
  babel
};