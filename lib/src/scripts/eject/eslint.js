const elevate = require('../../util/elevate');
const install = require('../../util/install');

elevate([
  '.eslintrc',
  '.eslintignore'
]);

install(['@jbknowledge/eslint-config']);