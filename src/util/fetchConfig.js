const fs = require('fs');
const path = require('path');
const readPkgUp = require('read-pkg-up');

const { appDirectory } = require('./');

const { package: pkg } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
});

const buildPath = (...p) => {
  const builtPath = path.join(appDirectory, ...p);
  console.log({ builtPath });
  return builtPath;
}
const projectHasFile = (...p) => fs.existsSync(buildPath(...p));

const babel = () => {
  [
    '.babelrc',
    '.babelrc.js',
    '.babel.config.js'
  ].forEach(f => {
    const hasFile = projectHasFile(f)
    console.log({ f, hasFile });
    if (hasFile) {
      return {
        configurationExists: true,
        path: buildPath(f)
      };
    }
  })

  return {
    configurationExists: !!pkg.babel
  };
};

module.exports = {
  babel
};