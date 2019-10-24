const path = require('path');
const fs = require('fs');

const { appDirectory, log } = require('.');

const configPath = path.join(
  require.resolve('@jbknowledge/react-dev'),
  '../src/config'
);
const appPath = appDirectory;

const elevate = (files) =>
  files.forEach((file) => {
    const srcPath = path.join(configPath, file);
    const destPath = path.join(appPath, file);
    try {
      fs.copyFileSync(srcPath, destPath);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      log.error(`Failed to eject ${file}`);
      process.exit(1);
    }

    log.debug(`ejected ${file}`);
  });

module.exports = elevate;
