require('dotenv').config();
const path = require('path');
const shell = require('shelljs');
const parse = require('yargs-parser');
const fs = require('fs');

const { appDirectory, log, iterateUserEnvironment } = require('../util');

const args = parse(process.argv.slice(2));
const buildDir = args.buildPath || 'dist';

log.header('Configuring project...');

const envPath = path.join(appDirectory, buildDir, 'env.js');

if (!fs.existsSync(envPath)) {
  log.error('env.js was not found');
  process.exit(1);
}

const env = fs.readFileSync(envPath).toString('utf-8');

iterateUserEnvironment((key, value) => {
  const envRegex = new RegExp(`${key}: [^,{}]+`);

  if (!envRegex.test(env)) {
    log.debug(`${key} not found in env.js`);
    return;
  } else {
    log.debug(`Replacing key: ${key}`);
  }

  shell.sed('-i', envRegex, `${key}: '${value}'`, envPath);
});
