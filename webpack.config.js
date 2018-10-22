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
    mode: 'development',
    context: path.resolve(__dirname, './source'),
    entry: {
        main: './index.js'
    },

    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: '[name].bandle.[chunkhash].js',
    },

    optimization: {
        noEmitOnErrors: true,

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
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.(eot|woff|woff2|ttf)$/,
                exclude: /(node_modules|.git)/,
                loader: 'file-loader',
                options: {
                    name: "./fonts/[name].[ext]",
                }
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                exclude: /(node_modules|.git)/,
                loader: 'file-loader',
                options: {
                    name: "./img/[name].[ext]",
                }
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, 'docs'),
        compress: true,
        overlay: true,
        open: true
    },

    plugins: [
        new CleanWebpackPlugin('docs', {}),
        new MiniCssExtractPlugin({
            filename: 'style.[hash].css',
        }),
        new HtmlWebpackPlugin({
            inject: true,
            hash: true,
            cache: true,
            template: 'index.pug',
            filename: 'index.html'
        }),
        new WebpackMd5Hash(),
    ]
};
