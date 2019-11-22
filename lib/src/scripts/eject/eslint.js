require('dotenv').config();
const elevate = require('../../util/elevate');
const install = require('../../util/install');

elevate(['.eslintrc', '.eslintignore']).then(() =>
  install(['@jbknowledge/eslint-config'])
);
