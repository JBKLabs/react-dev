const fs = require('fs');
const path = require('path');

const { appDirectory, pkg } = require('./');

const rootRelativePath = (...pathArgs) => path.join(appDirectory, ...pathArgs);
const projectHasFile = (...pathArgs) => fs.existsSync(rootRelativePath(...pathArgs));

const findConfig = (defaultPath, pkgKey, paths) => () => {
  const overridePath = paths.reduce((existingPath, nextPath) => {
    if (existingPath !== null) {
      return existingPath;
    }

    return projectHasFile(nextPath)
      ? {
        token: `using ${nextPath}`,
        path: rootRelativePath(nextPath)
      } : null;
  }, null);

  if (overridePath) {
    return overridePath;
  }

  return !!pkg[pkgKey]
    ? {
      token: `using package.json#${pkgKey}`,
      inPkg: true
    } : {
      token: 'no override detected',
      path: require.resolve(`@jbknowledge/react-dev/src/config/${defaultPath}`)
    };
}

const eslint = findConfig('eslint.config.js', 'eslintConfig', ['.eslintrc', '.eslintrc.json', '.eslintrc.yml', '.eslintrc.yaml']);

module.exports = {
  eslint
};