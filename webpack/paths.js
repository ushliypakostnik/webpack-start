const path = require('path');

const paths = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  views: path.join(__dirname, '../src/views'),
  assets: 'assets/',
  postcss: 'postcss.config.js',
};

module.exports = paths;
