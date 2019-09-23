const defaults = require('./defaults');

module.exports = (api) => {
  api.cache(true);
  return {
    presets: defaults.babel.presets.default,
    plugins: defaults.babel.plugins.default
  };
};
