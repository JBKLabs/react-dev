const { log } = require('../../util');
const elevate = require('../../util/elevate');
const install = require('../../util/install');

elevate([
  '.eslintrc',
  '.eslintignore'
]);

log.debug('ejecting dependencies')
install.yarnRunner.saveDev('@jbknowledge/eslint-config');
log.debug('complete');