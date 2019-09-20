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

const defaultConfig = {
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

module.exports.defaultConfig = defaultConfig;

module.exports = (api) => {
  api.cache(true);
  return {
    presets: defaultConfig.presets,
    plugins: Object
      .values(defaultConfig.plugins)
      .map(p => p.formatted),
  }
};
