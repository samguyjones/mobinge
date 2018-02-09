const path = require('path');

module.exports = {
  entry: './dist/mobinge.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
