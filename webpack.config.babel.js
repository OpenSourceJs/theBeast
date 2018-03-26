import webpack from 'webpack';
import path from 'path';
import _ from 'lodash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import htmlTemplate from 'html-webpack-template';
import CleanWebpackPlugin from 'clean-webpack-plugin';
// import BundleAnalyzerPlugin from 'webpack-bundle-analyzer'.BundleAnalyzerPlugin;

const BUILD_CLIENT_DIR = path.resolve(__dirname, './client/dist');
const CLIENT_DIR = path.resolve(__dirname, './client/src');

const fontLoaderConfig = {
  name: '/fonts/[name].[ext]',
  limit: 100,
};

const config = {
  entry: [`${CLIENT_DIR}/main.jsx`],
  output: {
    path: BUILD_CLIENT_DIR,
    filename: './js/[name].js',
  },
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

  plugins: [
    new CleanWebpackPlugin(['./client/dist/']),
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
};

if (
  process.env &&
  process.env.NODE_ENV &&
  process.env.NODE_ENV === 'production'
) {
  const prodPlugins = [];

  config.plugins = _.concat(config.plugins, prodPlugins);
  config.cache = false;
  config.debug = false;
  config.devtool = undefined;
}

module.exports = config;
