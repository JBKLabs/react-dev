const fs = require('fs');
const path = require('path');
const readPkgUp = require('read-pkg-up');

const { appDirectory } = require('./');

const { package: pkg } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd())
});

const buildPath = (...pathArgs) => path.join(appDirectory, ...pathArgs);
const projectHasFile = (...pathArgs) => fs.existsSync(buildPath(...pathArgs));

const fetch = (files, pkgKey) => {
  let result = null;
  files.reverse().forEach((token) => {
    if (projectHasFile(token)) {
      result = {
        token,
        configurationExists: true,
        path: buildPath(token)
      };
    }
  });

  return (
    result || {
      token: 'package.json',
      configurationExists: !!pkg[pkgKey]
    }
  );
};

const babel = () =>
  fetch(['.babelrc', '.babelrc.js', '.babel.config.js'], 'babel');

const eslint = () =>
  fetch(
    ['.eslintrc', '.eslintrc.json', '.eslintrc.yml', '.eslintrc.yaml'],
    'eslintConfig'
  );

const prettier = () =>
  fetch(
    [
      '.prettierrc',
      '.prettierrc.json',
      '.prettierrc.yml',
      '.prettierrc.yaml',
      '.prettierrc.toml',
      '.prettierrc.js',
      'prettier.config.js'
    ],
    'prettier'
  );

module.exports = {
  babel,
  eslint,
  prettier
};
