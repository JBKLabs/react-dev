module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      require.resolve('@babel/preset-env'),
      require.resolve('@babel/preset-react')
    ],
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: ['.'],
          alias: {
            '~': '.',
            src: './src'
          }
        }
      ]
    ]
  };
};
