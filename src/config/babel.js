const unformattedPlugins = {
  'babel-plugin-module-resolver': {
    path: require.resolve('babel-plugin-module-resolver'),
    root: ['.'],
    alias: {
      '~': '.',
      src: './src'
    }
  }
}

const defaults = {
  presets: [
    require.resolve('@babel/preset-env'),
    require.resolve('@babel/preset-react')
  ],
  plugins: {
    'babel-plugin-module-resolver': {
      formatted: [
        unformattedPlugins['babel-plugin-module-resolver'].path,
        {
          root: unformattedPlugins['babel-plugin-module-resolver'].root,
          alias: unformattedPlugins['babel-plugin-module-resolver'].alias
        }
      ],
      opt: unformattedPlugins['babel-plugin-module-resolver']
    }
  }
};

module.exports.defaults = defaults;

module.exports = (api) => {
  api.cache(true);
  return {
    presets: defaults.presets,
    plugins: Object
      .values(defaults.plugins)
      .map(p => p.formatted),
  }
};
