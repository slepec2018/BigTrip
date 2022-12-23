const path = require('path');
const mode = process.env.NODE_ENV;

module.exports = {
  mode,
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
  },
  devtool: 'source-map',
  devServer: {
    port: 5002,
    static: {
      directory: path.join(__dirname, 'public'),
    }
  }
};
