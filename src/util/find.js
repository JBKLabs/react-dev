const fs = require('fs');
const path = require('path');

const { appDirectory, pkg } = require('./');

const rootRelativePath = (...pathArgs) => path.join(appDirectory, ...pathArgs);
const projectHasFile = (...pathArgs) => fs.existsSync(rootRelativePath(...pathArgs));

const modPath = require.resolve('@jbknowledge/react-dev');
console.log({ modPath });

const findConfig = (name, defaultPath, pkgKey, paths) => () => {
  const overridePath = paths.reduce((existingPath, nextPath) => {
    if (existingPath !== null) {
      return existingPath;
    }

    return projectHasFile(nextPath)
      ? {
        msg: `found ${name} override (${nextPath})`,
        path: rootRelativePath(nextPath)
      } : null;
  }, null);

  if (overridePath) {
    return overridePath;
  }

  return !!pkg[pkgKey]
    ? {
      msg: `found ${name} override (package.json#${pkgKey})`
    } : {
      msg: `no ${name} override detected`,
      path: require.resolve(`@jbknowledge/react-dev/src/config/${defaultPath}`)
    };
}

const eslintConfig = findConfig(
  'eslint config',
  'eslint.config.js',
  'eslintConfig',
  ['.eslintrc', '.eslintrc.json', '.eslintrc.yml', '.eslintrc.yaml']
);

const eslintIgnore = findConfig(
  'eslint ignore',
  '.eslintignore',
  null,
  ['.eslintignore']
);

module.exports = {
  eslintConfig,
  eslintIgnore
};