const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const NunjucksWebpackPlugin = require("nunjucks-webpack-plugin");

module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      // transpiles ES6-8 into ES5
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file)
        ),
      },
      {
        // images and fonts
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            context: 'src',
          },
        },
      },
    ],
  },
  plugins: [
    // from templates
    new NunjucksWebpackPlugin({
      templates: [
        {
          from: path.resolve(__dirname, `../src/templates/pages/page.html`),
          to: path.resolve(__dirname, `../src/html/index.html`),
        }
      ],
      configure: {
        watch: true,
      },
    }),
    // html
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, `../src/html/index.html`),
      inject: true, // link css
      xhtml: true, // selfclosed tag to link css
      filename: `index.html`,
    })
  ],
};