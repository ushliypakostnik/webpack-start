const merge = require('webpack-merge');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const { EnvironmentPlugin } = require("webpack");
const PATHS = require('./paths');
const common = require('./webpack.common.config.js');

module.exports = merge(common, {
  mode: 'development', // process.env.NODE_ENV
  output: {
    filename: `${PATHS.assets}/[name].js`,
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        'style-loader',
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
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    // stylelint
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      context: `${PATHS.src}/scss`,
      files: ['**/*.css', '**/*.scss'],
      failOnError: false,
      syntax: 'scss',
    }),
  ],
});
