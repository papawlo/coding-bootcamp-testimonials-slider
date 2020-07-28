const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    devtool: 'inline-source-map',
    // devServer: {
    //     contentBase: './dist',
    // },
    module: {
        rules: [
            // {
            //     test: /\.svg$/,
            //     loader: 'svg-inline-loader'
            // },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    // 'resolve-url-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    // watch: true,
    // devServer: {
    //     contentBase: path.join(__dirname, 'dist'),
    //     compress: true,
    //     port: 9000
    // },
    plugins: [
        // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        // new MiniCssExtractPlugin({
        //     filename: '[name].css',
        // }),
    ]
});