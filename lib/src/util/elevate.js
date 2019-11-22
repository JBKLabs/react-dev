const path = require('path');
const fs = require('fs');
const { prompt } = require('inquirer');

const { appDirectory, log } = require('.');

const configPath = path.join(
  require.resolve('@jbknowledge/react-dev'),
  '../src/config'
);
const appPath = appDirectory;

const elevate = async (files) => {
  for (const file of files) {
    const srcPath = path.join(configPath, file);
    const destPath = path.join(appPath, file);

    if (fs.existsSync(destPath)) {
      log.warn(`${file} already exists`);
      const answers = await prompt([
        {
          name: 'replace',
          message: 'Would you like to replace it?',
          type: 'confirm'
        }
      ]);

      if (!answers.replace) continue;

      try {
        fs.copyFileSync(srcPath, destPath);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        log.error(`Failed to eject ${file}`);
        process.exit(1);
      }

      log.debug(`ejected ${file}`);
    }
  }
};

module.exports = elevate;
