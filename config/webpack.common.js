var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

var jsSources = helpers.root( 'src','js');
var styleSources = helpers.root( 'src','style');
var nodeModules = helpers.root( 'node_modules');

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {

  entry: {
    app: jsSources + '/app.js',
    style: styleSources + '/style.scss'
  },
  
  resolve: {
    extensions: [ '.js' ],
    modules: [ jsSources, styleSources, nodeModules ]
  },
  
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        /*query: {
          presets: ['es2015']
        }*/
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader'
      },
      {
        test: /\.s[ac]ss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },{
            loader: 'postcss-loader',
            options: {
              plugins: function () { // post css plugins, can be exported to postcss.config.js
                return [
                  require( 'precss' ),
                  require( 'autoprefixer' )
                ];
              }
            }
          }, {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              includePaths: [ styleSources, nodeModules ]
            }
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      }
    ]
  },
  
  plugins: [
    extractSass,
    
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'style']
    }),

    new HtmlWebpackPlugin({
      template: helpers.root('src','html','index.html'),
      //favicon: styleSources + '/images/favicon.ico'
    })
  ]
};