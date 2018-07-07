var webpack = require('webpack');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);
const VueLoaderPlugin = require('vue-loader/lib/plugin')

var developEnv = require('./env/develop.js')

module.exports={
  devtool: 'inline-source-map',
  entry:'./src/main.js',
  devServer:{
    inline:true,
    port:4567,
    historyApiFallback: true
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        query:{
          presets:['es2015','react','stage-1']
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss|css$/,
        loaders: [ 'style-loader', 'css-loader', 'sass-loader']
      },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   loader: 'url-loader?limit=8192'
      // },
      // {
      //   test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
      //   loader: 'file-loader?name=[name].[ext]'
      // },
      // { test: /\.json$/,
      //   loader: 'json'
      // },
    ],
  },
  mode: 'development',
  plugins: [
    new VueLoaderPlugin(),
    new HtmlwebpackPlugin({
      template: path.resolve(ROOT_PATH, 'index.html'),
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(developEnv.NODE_ENV),
        SERVER_URL: JSON.stringify(developEnv.SERVER_URL)
      }
    }),
  ]
}
