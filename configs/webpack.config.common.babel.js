import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import htmlTemplate from 'html-webpack-template';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import StartServerPlugin from 'start-server-webpack-plugin';
import path from 'path';

const BUILD_CLIENT_DIR = path.resolve(__dirname, '../client/dist');
const CLIENT_DIR = path.resolve(__dirname, '../client/src');

const BUILD_SERVER_DIR = path.resolve(__dirname, '../server/dist');
const SERVER_DIR = path.resolve(__dirname, '../index');

const fontLoaderConfig = {
  name: '/fonts/[name].[ext]',
  limit: 100,
};

const clientConfig = {
  entry: [`${CLIENT_DIR}/main.jsx`],
  output: {
    path: BUILD_CLIENT_DIR,
    filename: './js/[name].js',
  },
  watch: true,
  target: 'web',
  cache: true,
  devtool: 'inline-source-map',
  stats: {
    colors: true,
    reasons: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        }),
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.(png|gif|jpg|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.ico$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              ...fontLoaderConfig,
              mimetype: 'application/font-woff',
            },
          },
        ],
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              ...fontLoaderConfig,
              mimetype: 'application/octet-stream',
            },
          },
        ],
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: fontLoaderConfig,
          },
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              ...fontLoaderConfig,
              mimetype: 'mimetype=image/svg+xml',
            },
          },
        ],
      },
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin([BUILD_CLIENT_DIR]),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        BUILD_TARGET: JSON.stringify('client'),
      },
    }),
    new HtmlWebpackPlugin({
      title: 'the Beast',
      xhtml: true,
      hash: true,
      inject: false,
      cache: true,
      showErrors: true,
      template: htmlTemplate,
      appMountId: 'root-container',
      mobile: true,
      lang: 'en-US',
      links: ['https://fonts.googleapis.com/css?family=Roboto:300,400,500'],
      meta: [
        {
          name: 'dscription',
          content: '',
        },
        {
          name: 'keyword',
          content: '',
        },
        {
          name: 'author',
          content: 'Mohamed Gassama',
        },
        {
          name: 'Content-Type',
          content: 'http-equiv',
        },
        {
          name: 'content',
          content: 'text/html; charset=UTF-8',
        },
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0',
        },
      ],
    }),
    new ExtractTextPlugin({
      filename: './css/[name].css',
      allChunks: true,
    }),
  ],
};

const serverConfig = {
  entry: ['webpack/hot/poll?1000', SERVER_DIR],
  output: {
    path: BUILD_SERVER_DIR,
    filename: './js/server.js',
  },
  watch: true,
  target: 'node',
  cache: true,
  devtool: 'inline-source-map',
  stats: {
    colors: true,
    reasons: true,
  },
  node: {
    __filename: true,
    __dirname: true,
  },
  externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
  resolve: {
    extensions: ['.js'],
  },
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
    new CleanWebpackPlugin([BUILD_SERVER_DIR]),
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

export default { clientConfig, serverConfig };
