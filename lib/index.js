const { pkg, appDirectory } = require('./src/util');
const find = require('./src/util/find');
const InterpolateHtmlPlugin = require('./src/util/InterpolateHtmlWebpackPlugin');

module.exports = {
  pkg,
  appDirectory,
  find,
  InterpolateHtmlPlugin
};
