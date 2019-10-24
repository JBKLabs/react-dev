const fs = require('fs');
const path = require('path');

const { appDirectory, pkg, log } = require('.');

const rootRelativePath = (...pathArgs) => path.join(appDirectory, ...pathArgs);
const projectHasFile = (...pathArgs) => fs.existsSync(rootRelativePath(...pathArgs));

const modPath = path.join(require.resolve('@jbknowledge/react-dev'), '../src/config');

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
    log.debug(overridePath.msg);
    return overridePath.path;
  }

  const result = !!pkg[pkgKey]
    ? {
      msg: `found ${name} override (package.json#${pkgKey})`
    } : {
      msg: `no ${name} override detected`,
      path: path.join(modPath, defaultPath)
    };

  log.debug(result.msg);
  return result.path;
}

const eslintConfig = findConfig(
  'eslint config',
  '.eslintrc',
  'eslintConfig',
  ['.eslintrc', '.eslintrc.json', '.eslintrc.yml', '.eslintrc.yaml']
);

const eslintIgnore = findConfig('eslint ignore', '.eslintignore', null, ['.eslintignore']);

const prettierConfig = findConfig(
  'prettier config',
  '.prettierrc.yml',
  'prettier',
  ['.prettierrc', '.prettierrc.json', '.prettierrc.yaml', '.prettierrc.yml', '.prettierrc.js', 'prettier.config.js', '.prettierrc.toml']
);

const prettierIgnore = findConfig('prettier ignore', '.prettierignore', null, ['.prettierignore']);

const babelConfig = findConfig('babel config', 'babel.config.js', 'babel', ['babel.config.js', '.babelrc', '.babelrc.js']);

const webpackConfig = findConfig('webpack config', 'webpack.config.js', null, ['webpack.config.js']);

module.exports = {
  eslintConfig,
  eslintIgnore,
  prettierConfig,
  prettierIgnore,
  babelConfig,
  webpackConfig
};