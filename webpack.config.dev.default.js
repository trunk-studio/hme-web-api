var path = require('path');
var webpack = require('webpack');
var BowerWebpackPlugin = require("bower-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    //js
    'webpack-hot-middleware/client',
    './frontend/js/index.js'
    // backend_app: [path.resolve(__dirname, './assets/backend/js/app.js')],

    //css
    // app_entry: [path.resolve(__dirname, './assets/frontend/less/app_entry.js')]
  ],
  output: {
    path: path.resolve(__dirname, './public/assets/'),
    filename: 'js/bundle.js',
    //chunkFilename: '[chunkhash].js',
    publicPath: '/'
  },
  plugins: [
    //relative to output.path
    // new webpack.optimize.CommonsChunkPlugin('/js/chunk.js', []),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // new ExtractTextPlugin("./css/app.css"),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    ),
    new BowerWebpackPlugin({
      excludes: /.*\.less/
    }),
    new webpack.ProvidePlugin({
      $:      "jquery",
      jQuery: "jquery"
    })
  ],
  module: {
    loaders: [
      //expose
      // { test: /jquery\.js$/, loader: 'expose?jQuery!expose?$' },

      //loaders
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, './frontend/js')],
        query: {
          'stage': 0,
          'plugins': ['react-transform'],
          'extra': {
            'react-transform': {
              'transforms': [{
                'transform': 'react-transform-hmr',
                'imports': ['react'],
                'locals': ['module']
              }, {
                'transform': 'react-transform-catch-errors',
                'imports': ['react', 'redbox-react']
              }]
            }
          }
        }
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      },
      // Version query for font-awesome special import url
      // {
      //   test: /.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   loader: 'url-loader?limit=100000'
      // },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },{
        test: /aws-sdk/,
        loaders: ["transform?brfs"]
      },
      {
        test: /\.(woff|svg|ttf|eot)([\?]?.*)$/,
        loader: "file-loader?name=[name].[ext]"
      }
    ]
  }
};
