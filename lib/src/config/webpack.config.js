const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const {
  pkg,
  appDirectory,
  find,
  InterpolateHtmlPlugin,
  localEnvironmentSetup
} = require('@jbknowledge/react-dev');

const isProduction = process.env.NODE_ENV === 'production';
const babelPath = find.babelConfig();

const devServer = !isProduction
  ? {
      historyApiFallback: true,
      contentBase: path.join(appDirectory, 'public/'),
      watchContentBase: true,
      port: 8080,
      publicPath: '/',
      hot: true,
      before: localEnvironmentSetup
    }
  : undefined;

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(appDirectory, pkg.main),
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: isProduction ? process.env.BUILD_PATH : undefined,
    publicPath: '/',
    filename: 'static/js/bundle.js'
  },
  module: {
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              configFile: babelPath,
              presets: [require.resolve('babel-preset-react-app')]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [require.resolve('style-loader'), require.resolve('css-loader')]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
          require.resolve('sass-loader')
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(appDirectory, 'public/index.html')
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: ''
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    // eslint-disable-next-line camelcase
    child_process: 'empty'
  },
  devServer
};
