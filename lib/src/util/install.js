const spawn = require('cross-spawn');

const runnerFactory = ({
  executor,
  command,
  devFlag
}) => ({
  save: (dep) => {
    spawn.sync(
      executor,
      [command, dep],
      {
        stdio: 'inherit'
      }
    )
  },
  saveDev: (dep) => {
    spawn.sync(
      executor,
      [command, devFlag, dep],
      {
        stdio: 'inherit'
      }
    )
  }
});

const npmRunner = runnerFactory({
  executor: 'npm',
  command: 'install',
  devFlag: '--save-dev'
});

const yarnRunner = runnerFactory({
  executor: 'yarn',
  command: 'add',
  devFlag: '--dev'
});

module.exports = {
  npmRunner,
  yarnRunner
}