/* jshint node:true */

var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');

var frontEndRootPath = path.resolve(__dirname, './front_end/client/js');
var frontEndIconPath = path.resolve(__dirname, './front_end/client/icons');
var frontEndTemplatePath = path.resolve(__dirname, "./front_end/client/templates");
var env = process.env.WEBPACK_ENV || 'development';
var production = env === 'production';

var liveReloadPlugin = new LiveReloadPlugin();
var occurrenceOrderPlugin = new webpack.optimize.OccurrenceOrderPlugin();

function productionPlugin(instance) {
  return production && instance;
}

module.exports = {
  entry: './front_end/client/js/boot.js',
  module: {
      loaders: [
        {test: /jquery\/dist\/jquery.js$/, loaders: ['expose?jQuery']},
        {test: /moment\/moment.js$/, loaders: ['expose?moment']},
        {test: /angular\/angular.js$/, loaders: ['imports?jQuery=jquery']},
        {test: /localforage\/dist\/localforage.js$/, loaders: ['exports?localforage']},
        {test: /angular-localForage.js$/, loaders: ['imports?angular&this=>{angular: angular}']},
        {test: /svg-morpheus.js$/, loaders: ['exports?SVGMorpheus']},
        {test: /angular-material-icons.js$/, loaders: ['imports?SVGMorpheus=svg-morpheus/compile/unminified/svg-morpheus']},
        {test: /nv.d3.js$/, loaders: ['imports?d3=d3&window=>{}', 'exports?window.nv']},
        {test: /angular-nvd3.js$/, loaders: ['imports?nvd3=d3']},
        {test: /\.js$/, exclude: /node_modules/, loaders: ['ng-annotate', 'babel?stage=1']},
        {test: /front_end\/client\/templates\/.*\.html$/, loaders: [
          'ngtemplate?relativeTo=' + frontEndTemplatePath,
          'html'
        ]},
        {test: /front_end\/client\/icons\/.*\.svg$/, loaders: [
          'ngtemplate?relativeTo=' + frontEndIconPath,
          'html'
        ]},
      ],
      noParse: [
        /localforage\/dist\/localforage.js$/,
      ]
    },
    output: {
      path: path.join(__dirname, "public"),
      filename: "admin.js"
    },
    resolve: {
      root: [
        frontEndRootPath
      ],
      alias: {
        localforage: 'localforage/dist/localforage',
        jquery: 'jquery/dist/jquery'
      }
    },
}
