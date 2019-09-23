const spawn = require('cross-spawn');
const chalk = require('chalk');
const path = require('path');
const parse = require('yargs-parser');
const unparse = require('yargs-unparser');

const fetchConfig = require('../../util/fetchConfig');
const { resolveBin, log } = require('../../util');

let args = process.argv.slice(2);
const parsedArgs = parse(args);

const prettier = fetchConfig.prettier();
let config = [
  '--config',
  path.join(__dirname, '../../config/prettier.yml')
];

if (parsedArgs.prettierConfig) {
  config = [
    '--config',
    path.join(appDirectory, parsedArgs.prettierConfig)
  ];

  delete parsedArgs['prettier-config'];
  delete parsedArgs.prettierConfig;
  log(`Using provided prettier config path: ${config[1]}`);
} else if (prettier.configurationExists) {
  config = prettier.path
    ? [
      '--config',
      path.join(appDirectory, prettier.path)
    ] : [];
  log('Prettier override detected: ' + chalk.cyan(prettier.token));
}

let output = ['--check'];

if (parsedArgs.fix) {
  output = ['--write'];

  delete parsedArgs.fix;
}

const filesGiven = parsedArgs._.length > 0;
const filesToApply = filesGiven ? [] : ['src/**/*.js'];
if (filesGiven) {
  args = args.filter(
    (arg) => !parsedArgs._.includes(arg) || /\.jsx?$/.test(arg)
  );
}

const result = spawn.sync(resolveBin('prettier'), [...unparse(parsedArgs), ...config, ...output, ...filesToApply], {
  stdio: 'inherit'
});

process.exit(result.status);