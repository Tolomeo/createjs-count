const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const paths = require("../paths");

module.exports = {
  context: paths.src,
  entry: {
    createjs: path.join(paths.nodeModules, "/createjs/builds/createjs-2015.11.26.combined.js"),
    app: path.join(paths.src, "/index.ts"),
  },
  output: {
    path: paths.dist,
    filename: "[name].[contenthash:8].js",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader", exclude: /node_modules/ },
      { test: /\.js$/, loader: "source-map-loader" },
      {
        test: /node_modules(\/|\\)(createjs)(\/|\\).*\.js$/,
        loader: "imports-loader",
        options: {
          additionalCode: "window.createjs = {};",
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|ogg)$/i,
        loader: "file-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(paths.html, "/index.html"),
      favicon: path.join(paths.html, "/favicon.ico"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[name].[contenthash:8].chunk.css",
    }),
    new ESLintPlugin({
      extensions: [".js", ".ts"],
      eslintPath: require.resolve("eslint"),
    }),
  ],
};
