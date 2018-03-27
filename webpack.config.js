const path                = require('path');
var HtmlWebpackPugPlugin  = require('html-webpack-pug-plugin');
var HtmlWebpackPlugin     = require('html-webpack-plugin');
const ExtractTextPlugin   = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  watch: true,
  entry: {
    'js/index' : './src/js/index.js'
  },
  output: {
    path: path.resolve(__dirname,"./build/"),   // папка, в том числе, для HtmlWebpackPlugin
    publicPath: './',
    filename: '[name].js'
  },
  module:{
    rules: [
      {
        test: /\.pug$/,
        use: ["html-loader", "pug-html-loader"]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        // ?name=[path][name].[ext] - сохранили оригинальное имя и путь в папке dist: dist\src\images\pugjs.png
        //use: ["file-loader?name=[path][name].[ext]"]
        // ?name=[name].[ext]&outputPath=images/ - оригинальное имя сохранит в папке images: dist\images\pugjs.png
        use: ["file-loader?name=[name].[ext]&outputPath=images/"]
      },
      /*{
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      }*/
      {
        test   : /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          // use: ['css-loader', 'sass-loader'],
          use: ['css-loader?minimize&sourceMap', 'resolve-url-loader', 'sass-loader?sourceMap'],
          // генерируем отдельный файл:
          publicPath: '../'
        })
      }

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: 'Project demo',
      filename: 'index.html',
      template: 'src/index.pug',
      mobile: true
      // minify: false
    }),
    new ExtractTextPlugin('css/style.css'),
    new HtmlWebpackPugPlugin(),
    // extractSass

  ],
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 9001,
    // hot: true,
    // inline: true,
  }
};