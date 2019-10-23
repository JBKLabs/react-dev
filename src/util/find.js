const fs = require('fs');
const path = require('path');

const { appDirectory, pkg } = require('./');

const rootRelativePath = (...pathArgs) => path.join(appDirectory, ...pathArgs);
const projectHasFile = (...pathArgs) => fs.existsSync(rootRelativePath(...pathArgs));

const find = (defaultPath, pkgKey, paths) => () => {
  const overridePath = paths.reduce((existingPath, token) => {
    if (existingPath !== null) {
      return existingPath;
    }

    return projectHasFile(token)
      ? {
        token,
        path: rootRelativePath(token)
      } : null;
  }, null);

  if (overridePath) {
    return overridePath;
  }

  return !!pkg[pkgKey]
    ? {
      token: `package.json#${pkgKey}`,
      inPkg: true
    } : {
      token: 'no override detected',
      path: require.resolve(`@jbknowledge/react-dev/src/config/${defaultPath}`)
    };
}

const eslint = find('eslint.config.js', 'eslintConfig', ['.eslintrc', '.eslintrc.json', '.eslintrc.yml', '.eslintrc.yaml']);

module.exports = {
  eslint
};