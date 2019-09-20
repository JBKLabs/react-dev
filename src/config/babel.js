const defaults = require('./defaults');

module.exports = (api) => {
  api.cache(true);
  return {
    presets: defaults.babel.presets,
    plugins: Object
      .values(defaults.babel.plugins)
      .map(p => p.formatted),
  }
};
