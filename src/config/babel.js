const defaults = {
  presets: [
    require.resolve('@babel/preset-env'),
    require.resolve('@babel/preset-react')
  ],
  plugins: {
    'babel-plugin-module-resolver': {
      path: require.resolve('babel-plugin-module-resolver'),
      settings: {
        root: ['.'],
        alias: {
          '~': '.',
          src: './src'
        }
      }
    }
  }
};

module.exports.defaults = defaults;

module.exports = (api) => {
  api.cache(true);
  return {
    presets: defaults.presets,
    plugins: [
      [
        defaults.plugins['babel-plugin-module-resolver'].path,
        { ...defaults.plugins['babel-plugin-module-resolver'].settings }
      ]
    ]
  }
};
