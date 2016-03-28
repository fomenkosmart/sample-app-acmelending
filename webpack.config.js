var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './index.js',
  resolve: {
      alias: {
        "ag-grid-root" : __dirname + "/node_modules/ag-grid/dist/styles"
      },
      extensions: ['', '.js', '.jsx']
  },
  output: {
    path: 'public',
    filename: 'bundle.js',
    publicPath: ''
  },

  // add this handful of plugins that optimize the build
  // when we're in production
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [],
  externals: {
      "ZoomdataSDK": "ZoomdataSDK"
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader?presets[]=es2015&presets[]=react' 
      },
      { 
        test: /\.jsx$/, 
        include: /node_modules/, 
        loader: 'babel-loader?presets[]=es2015&presets[]=react' 
      },
      {
        test: /\.css$/,
        loader: 'style!css',
        include: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader',
        exclude: /node_modules/
      },   
      {
        test: /\.(svg|gif|png|jpg)$/,
        loader: 'url-loader?limit=10000&name=images/[name]-[hash].[ext]',
        exclude: /node_modules/
      }
    ]
  }
}

