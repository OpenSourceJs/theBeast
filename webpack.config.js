const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const htmlTemplate = require('html-webpack-template');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const BUILD_DIR = path.resolve(__dirname, './client/dist');
const APP_DIR = path.resolve(__dirname, './client/src');

const fontLoaderConfig = {
  name: '/fonts/[name].[ext]',
  limit: 100
};

const config = {
  entry: ['babel-polyfill', 'react-hot-loader/patch', `${APP_DIR}/main.jsx`],
  output: {
    path: BUILD_DIR,
    filename: 'js/[name].js',
    publicPath: '/'
  },
  cache: true,
  devtool: 'inline-source-map',
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['common', 'main'],
      minChunks: Infinity,
      children: true,
      async: true
    }),
    new CleanWebpackPlugin(['./client/dist/']),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new HtmlWebpackPlugin({
      title: 'JsStaterKit',
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
          httpEquiv: 'Content-Security-Policy',
          content:
            "default-src 'none'; font-src 'self' data: https://fonts.googleapis.com/css?family=Roboto:300,400,500;"
        },
        {
          name: 'dscription',
          content: ''
        },
        {
          name: 'keyword',
          content: ''
        },
        {
          name: 'author',
          content: 'Mohamed Gassama'
        },
        {
          name: 'Content-Type',
          content: 'http-equiv'
        },
        {
          name: 'content',
          content: 'text/html; charset=UTF-8'
        },
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0'
        }
      ]
    }),
    new ExtractTextPlugin('/css/[name].css', {
      allChunks: true
    })
  ],

  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|gif|jpg|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.ico$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              ...fontLoaderConfig,
              mimetype: 'application/font-woff'
            }
          }
        ]
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              ...fontLoaderConfig,
              mimetype: 'application/octet-stream'
            }
          }
        ]
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: fontLoaderConfig
          }
        ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              ...fontLoaderConfig,
              mimetype: 'mimetype=image/svg+xml'
            }
          }
        ]
      }
    ]
  }
};

if (
  process.env &&
  process.env.NODE_ENV &&
  process.env.NODE_ENV === 'production'
) {
  const prodPlugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      },
      output: {
        comments: false
      }
    })
  ];

  config.plugins = config.plugins.concat(prodPlugins);
  config.cache = false;
  config.debug = false;
  config.devtool = undefined;
}

module.exports = config;
