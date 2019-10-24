const elevate = require('../../util/elevate');
const install = require('../../util/install');

elevate(['.prettierrc.yml', '.prettierignore']);

install(['prettier']);
