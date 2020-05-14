const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const common = require('./webpack.common.config.js');

module.exports = merge(common, {
  entry: {
    index: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/index.js'],
  },
  output: {
    filename: 'index.js',
  },
  mode: 'development', // process.env.NODE_ENV
  target: 'web',
  devtool: '#source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
  },
  module: {
    rules: [
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        // styles on css и scss, autoprefix
        test: /\.s?css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'sass-loader',
            options: {
              data: '@import "./src/scss/_main.scss";',
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    // Stylelint
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      context: 'src/scss',
      files: ['**/*.css', '**/*.scss'],
      failOnError: false,
      syntax: 'scss',
    }),
  ],
});