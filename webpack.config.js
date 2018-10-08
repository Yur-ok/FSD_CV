const path = require('path');
// Для работы с HTML
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Для создания css файла
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// Для отчистки дериктории назначения перед созданием сборки
const CleanWebpackPlugin = require('clean-webpack-plugin');
//
const WebpackMd5Hash = require('webpack-md5-hash');
//
const webpack = require('webpack');


module.exports = {
    entry: {
        main: './source/index.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
    },

    module: {
        rules: [
            {
                test: /\.pug$/,
                exclude: /(node_modules|.git)/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.styl$/,
                exclude: /(node_modules|.git)/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'stylus-loader']
            },
            {
                test: /\.(eot|woff|woff2|ttf)$/,
                exclude: /(node_modules|.git)/,
                loader: 'file-loader',
                options: {
                    name: "./fonts/[name].[ext]",
                    // outputPath: 'fonts/'
                }
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                exclude: /(node_modules|.git)/,
                loader: 'file-loader',
                options: {
                    name: "./img/[name].[ext]",
                    // outputPath: 'images/'
                }
            }
        ]
    },
    // devServer: {
    //     contentBase: path.join(__dirname, 'dist'),
    //     compress: true,
    //     open: true,
    //     hot: true
    // },

    plugins: [
        new CleanWebpackPlugin('dist', {}),
        new MiniCssExtractPlugin({
            filename: 'style.[hash].css',
        }),
        new HtmlWebpackPlugin({
            inject: true,
            hash: true,
            template: './source/index.pug',
            filename: 'index.html'
        }),
        // new WebpackMd5Hash(),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NamedModulesPlugin(),
    ]
};