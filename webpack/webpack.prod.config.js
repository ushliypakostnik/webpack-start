const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { EnvironmentPlugin } = require("webpack");
const PATHS = require('./paths');
const common = require('./webpack.common.config.js');

module.exports = merge(common, {
  mode: 'production', // process.env.NODE_ENV
  output: {
    filename: `${PATHS.assets}/[name].min.js`,
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true },
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: PATHS.postcss } },
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true },
        },
      ],
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true },
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: PATHS.postcss } },
        },
      ],
    }],
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['templates',],
    }),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}/[name].min.css`,
    }),
  ],
});
