require('dotenv').config();
const path = require('path');
const shell = require('shelljs');
const parse = require('yargs-parser');

const { appDirectory, iterateUserEnvironment } = require('../util');

const args = parse(process.argv.slice(2));
const buildDir = args.buildPath || 'dist';

iterateUserEnvironment((key, value) => {
  shell.sed(
    '-i',
    new RegExp(`${key}: [^,{}]+`),
    `${key}: '${value}'`,
    path.join(appDirectory, buildDir, 'env.js')
  );
});
