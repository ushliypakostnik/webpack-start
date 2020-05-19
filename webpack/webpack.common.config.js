const path = require('path');
const PATHS = require('./paths');
const pages = require('./pages');

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: {
    app: PATHS.src,
  },
  output: {
    path: PATHS.dist,
    publicPath: '/',
  },
  target: 'web',
  devtool: '#source-map',
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/',
    }, {
      // images and fonts
      test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          context: PATHS.src,
          esModule: false, // fix for image paths
        },
      },
    }],
  },
  plugins: [
    ...pages.generatePages(path.resolve(__dirname, PATHS.views)),
  ],
};
