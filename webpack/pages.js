/**
 * Generate HTML Plugins
 */

const path = require('path');
const fs = require('fs');
const NunjucksWebpackPlugin = require('nunjucks-webpack-plugin');

const directories = [];
function walkDir(dir, parrent = '') {
  const files = fs.readdirSync(dir);
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const x in files) {
    const next = path.join(dir, files[x]);
    if (fs.lstatSync(next).isDirectory() === true) {
      walkDir(next, `${parrent}/${files[x]}`);
    } else {
      directories.push([path.parse(files[x]).name, (`${parrent}/`).slice(1)]);
    }
  }
  return directories;
}

const pages = {
  generatePages: function generatePages(pagesPath) {
    return walkDir(pagesPath).map(
      // eslint-disable-next-line arrow-parens
      name =>
        // eslint-disable-next-line implicit-arrow-linebreak
        new NunjucksWebpackPlugin({
          templates: [{
            from: `${pagesPath}/${name[1]}${name[0]}.njk`,
            to: `${name[1]}${name[0]}.html`,
          }],
        }),
    );
  },
};

module.exports = pages;
