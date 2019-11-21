const path = require('path');
const shell = require('shelljs');
const parse = require('yargs-parser');

const { appDirectory, log } = require('../util');

const args = parse(process.argv.slice(2));
const buildDir = args.buildPath || 'dist';

log.header('Configuring project...');

Object.entries(process.env)
  .filter(([key]) => key.substr(0, 4) === 'ENV_')
  .forEach((kvp) => {
    const key = kvp[0].substr(4);
    const value = kvp[1];

    log.debug(`Replacing key: ${key}`);

    shell.sed(
      '-i',
      new RegExp(`${key}: [^,{}]+`),
      `${key}: '${value}'`,
      path.join(appDirectory, buildDir, 'env.js')
    );
  });
