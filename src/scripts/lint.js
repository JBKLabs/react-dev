const spawn = require('cross-spawn');
const path = require('path');
const chalk = require('chalk');
const yargsParser = require('yargs-parser');

const fetchConfig = require('../util/fetchConfig');
const { resolveBin, appDirectory, log } = require('../util');

let args = process.argv.slice(2);
const parsedArgs = yargsParser(args);

const eslint = fetchConfig.eslint();
let config = [
  '--config',
  path.join(__dirname, '../config/eslintrc.yml')
];

if (parsedArgs['eslint-config']) {
  config = [
    '--config',
    path.join(appDirectory, parsedArgs['eslint-config'])
  ];
  log('Using provided eslint config path');
} else if (eslint.configurationExists) {
  config = eslint.path
    ? [
      '--config',
      path.join(appDirectory, eslint.path)
    ] : [];
  log('Eslint override detected: ' + chalk.cyan(eslint.token));
}

const filesGiven = parsedArgs._.length > 0;
const filesToApply = filesGiven ? [] : ['.'];
if (filesGiven) {
  args = args.filter(
    (arg) => !parsedArgs._.includes(arg) || /\.jsx?$/.test(arg)
  );
}

const result = spawn.sync(resolveBin('eslint'), [...args, ...config, ...filesToApply], {
  stdio: 'inherit'
});

process.exit(result.status);
