const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { appDirectory } = require('../util');
const InterpolateHtmlPlugin = require('../util/InterpolateHtmlWebpackPlugin');

process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';

module.exports = {
  entry: path.resolve(appDirectory, 'src/index.js'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              configFile: path.join(__dirname, './babel.js'),
              presets: [require.resolve('babel-preset-react-app')]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [require.resolve('style-loader'), require.resolve('css-loader')]
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    publicPath: '/',
    filename: 'static/js/bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(appDirectory, 'public/'),
    watchContentBase: true,
    port: 8080,
    publicPath: '/',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(appDirectory, 'public/index.html')
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: ''
    })
  ]
};
