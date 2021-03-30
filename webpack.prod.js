const path = require("path");
const common = require("./webpack.common.js");
const glob = require("glob");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const PATHS = {
  src: path.join(__dirname, "src"),
};

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "public"),
  },
  optimization: {
    minimize: true,
    // splitChunks: {
    //   cacheGroups: {
    //     styles: {
    //       name: "styles",
    //       test: /\.s[ac]ss$/i,
    //       chunks: "all",
    //       enforce: true,
    //     },
    //   },
    // },
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin({
        extractComments: true,
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: true,
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new MiniCssExtractPlugin({ filename: "[name].css" }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
});
