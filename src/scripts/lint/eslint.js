const spawn = require('cross-spawn');
const path = require('path');
const chalk = require('chalk');
const parse = require('yargs-parser');
const unparse = require('yargs-unparser');

const fetchConfig = require('../../util/fetchConfig');
const { resolveBin, appDirectory, log, removeArg } = require('../../util');

let args = process.argv.slice(2);
const parsedArgs = parse(args);

const eslint = fetchConfig.eslint();
let config = [
  '--config',
  path.join(__dirname, '../config/eslintrc.yml')
];

if (parsedArgs.eslintConfig) {
  config = [
    '--config',
    path.join(appDirectory, parsedArgs.eslintConfig)
  ];

  delete parsedArgs['eslint-config'];
  delete parsedArgs.eslintConfig;
  log(`Using provided eslint config path: ${config[1]}`);
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

const result = spawn.sync(resolveBin('eslint'), [...unparse(parsedArgs), ...config, ...filesToApply], {
  stdio: 'inherit'
});

process.exit(result.status);
