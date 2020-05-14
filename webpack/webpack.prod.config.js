const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: 'index.min.js',
  },
  mode: 'production', // process.env.NODE_ENV
  target: 'web',
  devtool: '#source-map',
  // webpack 4 does not have a CSS minifier, although
  // webpack 5 will likely come with one
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}), // disable to not min css
    ],
  },
  module: {
    rules: [
      {
        // loads the javacript into html template provided.
        // entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        // loads CSS and SCSS into a file when you import it via javascript
        // rules are set in MiniCssExtractPlugin
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    // clear
    new CleanWebpackPlugin(),
    // extract css to templates
    new MiniCssExtractPlugin({
      filename: 'styles.min.css',
    }),
  ],
});