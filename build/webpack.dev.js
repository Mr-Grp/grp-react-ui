const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ProgressPlugin } = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const os = require('os');

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devtool: 'eval-cheap-module-source-map',
  entry: {
    index: './example/index.tsx',
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  devServer: {
    open: true,
    hot: true,
    historyApiFallback: true,
    port: 8088,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './example/index.html',
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        enabled: true,
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
    new ProgressPlugin(),
    new CaseSensitivePathsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [
                path.resolve(__dirname, '../src/styles/index.less'),
              ],
              injector: 'append',
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /lib/],
        use: [
          {
            loader: 'thread-loader',
            options: {
              worker: os.cpus().length - 1,
              poolTimeout: Infinity, // worker 一直存在
            },
          },
          'babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'thread-loader',
            options: {
              worker: os.cpus().length - 1,
              poolTimeout: Infinity, // worker 一直存在
            },
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
};
