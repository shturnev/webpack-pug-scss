const path = require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

const extractSass = new ExtractTextPlugin({
  filename: "css/style.css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: {
    "js/index": "./src/js/index.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist/"),
    publicPath: "./",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/, exclude: /node_modules/, loader: "babel-loader",
        options: {
          "presets": ["env", "stage-3"]
        }
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader",
              options:{
                minimize: true,
                sourceMap: true
              }
            },
            {
              loader: 'resolve-url-loader',
            },
            {
              loader: "sass-loader",
            }
          ],
          publicPath: '../',
          fallback: "style-loader"
        })
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: ["file-loader?name=[name].[ext]&outputPath=images/",
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            }
          }
        ]
      },
      {
        test: /\.pug/,
        loaders: [
          {
            loader: 'html-loader'},
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true
            }
          }],
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },
  plugins: [
    extractSass,
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: 'src/views/index.pug',

    }),
    new HtmlWebpackPugPlugin()
  ]
}