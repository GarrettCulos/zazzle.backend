const glob = require('glob');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { SamWebpackPlugin } = require('sam-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const rootDir = path.join(__dirname, '..');

/**
 * Utility function to get all files batching the provided pattern
 */
const getEntries = patterns => {
  const entries = {};
  patterns.forEach(pattern => {
    glob.sync(pattern).forEach(file => {
      entries[file.replace('src/', '')] = path.join(rootDir, file);
    });
  });

  return entries;
};
/**
 * base build
 */
const baseDeployment = 'dist';

/**
 * external names
 */
const GLOBALS = '@global';
const BeUtil = '@util';
const BeServices = '@services';
const BeEnv = '@config';

/**
 * mtgnorth external imports
 */
const projectExternals = [];

/**
 * mtgnorth specific aliases
 */
const aliases = {
  [GLOBALS]: path.resolve(rootDir, 'global'),
  [BeUtil]: path.resolve(rootDir, 'src/util'),
  [BeServices]: path.resolve(rootDir, 'src/services')
};

/**
 * default ts transform rules
 */
const tsRule = {
  test: /\.ts?$/,
  use: [
    {
      loader: 'babel-loader'
    }
  ],
  exclude: [/node_modules/]
};

const graphQl = {
  mode: 'development',
  entry: {
    graphFunction: path.resolve(rootDir, 'src/graphql/graphFunction.ts')
  },
  externals: [nodeExternals()],
  target: 'node',
  module: {
    rules: [tsRule]
  },
  resolve: {
    extensions: ['.ts'],
    alias: aliases
  },
  output: {
    library: 'graphql api',
    libraryTarget: 'umd',
    filename: chunkData => `${chunkData.chunk.name.replace('.ts', '')}.js`,
    path: path.resolve(rootDir, `${baseDeployment}`, 'graphql')
  },
  plugins: [
    new Dotenv(),
    new SamWebpackPlugin({
      dynamoDb: './dynamodb-table.json',
      output: './graphql-sam-deploy',
      baseTemplate: path.resolve(rootDir, 'template.json')
    })
  ]
};

const expressGraphql = {
  mode: 'development',
  entry: {
    express: path.resolve(rootDir, 'src/graphql/express.ts')
  },
  externals: [nodeExternals()],
  target: 'node',
  module: {
    rules: [tsRule]
  },
  resolve: {
    extensions: ['.ts'],
    alias: aliases
  },
  output: {
    library: 'express graphql api',
    libraryTarget: 'umd',
    filename: chunkData => `${chunkData.chunk.name.replace('.ts', '')}.js`,
    path: path.resolve(rootDir, `${baseDeployment}`, 'graphql')
  },
  plugins: [new Dotenv()]
};

module.exports = {
  rootDir,
  getEntries,
  baseDeployment,
  tsRule,
  graphQl,
  expressGraphql,
  projectExternals
};
