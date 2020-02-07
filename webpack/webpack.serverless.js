const merge = require('webpack-merge');
const path = require('path');
const { rootDir, graphQl } = require('./webpack.base');
const devConfig = {
  mode: 'production',
  resolve: {
    alias: {
      '@config/environment': path.resolve(rootDir, 'src/config/environment.prod')
    }
  }
};
module.exports = [merge(graphQl, { ...devConfig })];
