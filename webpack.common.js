const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ImageminPlugin = require('imagemin-webpack-plugin').default;
// const glob = require('glob');

module.exports = {

    entry: {
        main: "./src/index.js",
        // vendor: "./src/vendor.js",
    },
    plugins: [
        // new ImageminPlugin({
        //     externalImages: {
        //         context: '.',
        //         sources: glob.sync('src/images/**/*.{png,jpg,jpeg,gif,svg}'),
        //         destination: 'images',
        //         fileName: '[name].[ext]'
        //     }
        // }),
        // new MiniCssExtractPlugin({
        //     filename: '[name].css'
        // })
        // new CleanWebpackPlugin(),
        // new HtmlWebpackPlugin({
        //     title: 'Production',
        // }),
    ],
    // output: {
    //     filename: '[name].bundle.js',
    //     path: path.resolve(__dirname, 'dist'),
    // },

    module: {
        rules: [
            // {
            //     test: /\.html$/i,
            //     loader: 'html-loader',
            // },
            // {
            //     test: /\.[s]css$/i,
            //     exclude: /node_modules/,
            //     use: [
            //         // MiniCssExtractPlugin.loader,
            //         'style-loader',
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 importLoaders: 1
            //             }
            //         },
            //         {
            //             loader: 'postcss-loader',
            //         },
            //         // {
            //         //     loader: 'sass-loader'
            //         // }
            //     ]
            // },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    name(resourcePath, resourceQuery) {
                        // `resourcePath` - `/absolute/path/to/file.js`
                        // `resourceQuery` - `?foo=bar`

                        if (process.env.NODE_ENV === 'development') {
                            return '[path][name].[ext]';
                        }

                        return '[contenthash].[ext]';
                    },
                },

            }
        ]
    }
}