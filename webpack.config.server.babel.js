import webpack from 'webpack';
import path from 'path';
import _ from 'lodash';
import nodeExternals from 'webpack-node-externals';
import StartServerPlugin from 'start-server-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const BUILD_SERVER_DIR = path.resolve(__dirname, './server/dist');
const SERVER_DIR = path.resolve(__dirname, './');

const config = {
  entry: ['webpack/hot/poll?1000', `${SERVER_DIR}/index`],
  output: {
    path: path.join(__dirname, `${BUILD_SERVER_DIR}`),
    filename: './js/server.js',
  },
  watch: true,
  devtool: 'sourcemap',
  target: 'node',
  node: {
    __filename: true,
    __dirname: true,
  },
  externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [['env', { modules: false }], 'stage-0'],
              plugins: ['transform-regenerator', 'transform-runtime'],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: {
          loader: 'raw-loader',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['./server/dist/']),
    new StartServerPlugin('./js/server.js'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        BUILD_TARGET: JSON.stringify('server'),
      },
    }),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],
};

if (
  process.env &&
  process.env.NODE_ENV &&
  process.env.NODE_ENV === 'production'
) {
  const prodPlugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
      output: {
        comments: false,
      },
    }),
  ];

  config.plugins = _.concat(config.plugins, prodPlugins);
  config.devtool = undefined;
}

module.exports = config;
