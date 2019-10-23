const path = require('path');
const fs = require('fs');

const { appDirectory, log } = require('.');

const configPath = path.join(require.resolve('@jbknowledge/react-dev'), '../src/config');
const appPath = appDirectory;

const elevate = files => files.forEach(f => {
  const srcPath = path.join(configPath, f);
  const destPath = path.join(appPath, f);
  try {
    fs.copyFileSync(srcPath, destPath);
  } catch (error) {
    console.log(error);
    log.error(`Failed to eject ${f}`);
    process.exit(1);
  }

  log.debug(`ejected ${f}`);
});

module.exports = elevate;