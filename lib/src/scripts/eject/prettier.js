require('dotenv').config();
const elevate = require('../../util/elevate');
const install = require('../../util/install');

elevate(['.prettierrc.yml', '.prettierignore']).then(() =>
  install(['prettier'])
);
