const fs = require('fs');
const path = require('path');

const { appDirectory, pkg } = require('.');

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
    return overridePath;
  }

  return !!pkg[pkgKey]
    ? {
      msg: `found ${name} override (package.json#${pkgKey})`
    } : {
      msg: `no ${name} override detected`,
      path: path.join(modPath, defaultPath)
    };
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

module.exports = {
  eslintConfig,
  eslintIgnore,
  prettierConfig,
  prettierIgnore
};