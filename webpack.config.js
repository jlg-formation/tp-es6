const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  console.log('mode', argv.mode); // outputs development
  return {
    entry: ['./src/main.ts', './src/style.css'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    devtool: argv.mode === 'development' ? 'inline-source-map' : 'none',
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
        ignoreOrder: false,
      }),
      new CopyWebpackPlugin([{ from: './src/assets', to: 'assets' }]),
      new webpack.DefinePlugin({
        PRODUCTION: argv.mode === 'production',
      }),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
                hmr: argv.mode === 'development',
              },
            },
            'css-loader',
          ],
        },
      ],
    },
    devServer: {
      stats: {
        children: false, // Hide children information
        maxModules: 0, // Set the maximum number of modules to be shown
      },
      port: 3001,
    },
  };
};
