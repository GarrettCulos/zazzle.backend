const merge = require('webpack-merge');
const path = require('path');
const { rootDir, graphQl } = require('./webpack.base');
const devConfig = {
  resolve: {
    alias: {
      '@config/environment': path.resolve(rootDir, 'src/config/environment')
    }
  }
};
module.exports = [merge(graphQl, { ...devConfig })];
