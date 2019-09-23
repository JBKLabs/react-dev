const path = require('path');
const shell = require('shelljs');

const { appDirectory } = require('../util');

Object.entries(process.env)
  .filter(([key]) => key.substr(0, 4) === 'ENV_')
  .forEach((kvp) => {
    const key = kvp[0].substr(4);
    const value = kvp[1];

    shell.sed(
      '-i',
      new RegExp(`${key}: [^,{}]+`),
      `${key}: '${value}'`,
      path.join(appDirectory, 'dist/env.js')
    );
  });
