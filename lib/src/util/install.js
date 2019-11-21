const spawn = require('cross-spawn');
const path = require('path');
const fs = require('fs');

const { log } = require('.');

const devPkgPath = path.join(
  require.resolve('@jbknowledge/react-dev'),
  '../package.json'
);
const devPkg = JSON.parse(fs.readFileSync(devPkgPath));

const install = (packages, flags = [], dev = true) => {
  const usingYarn = process.env.npm_execpath.indexOf('yarn') !== -1;
  const executor = usingYarn ? 'yarn' : 'npm';
  const command = usingYarn ? 'add' : 'install';
  const devFlag = usingYarn ? '--dev' : '--save-dev';
  const versionedPackages = packages.map(
    (name) => `${name}@${devPkg.dependencies[name]}`
  );
  const runtimeFlags = dev ? [devFlag, ...flags] : flags;

  if (process.env.CONFIG_ONLY === 'true') {
    log.debug('Skipping dependency ejection');
    return;
  }

  log.debug(
    `Installing ${versionedPackages.length} package(s) using ${
      usingYarn ? 'yarn' : 'npm'
    }`
  );

  spawn.sync(executor, [command, ...runtimeFlags, ...versionedPackages], {
    stdio: 'inherit'
  });
};

module.exports = install;
