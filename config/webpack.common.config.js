const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require("webpack");

module.exports = {
    entry: './src/app.js',
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Web title',
            template: './src/index.html',
            inject: true,
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[chunkhash].css'
        }),
        new CopyWebpackPlugin([{
            from: './src/assets/images',
            to: 'assets/images'
        }]),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    module: {
        rules: [{
                test: [/.js$/],
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            {
                test: [/.css$|.scss$/],
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            // {
            //     test: /\.(png|jpg|gif)$/,
            //     use: [{
            //         loader: 'file-loader',
            //         options: {
            //             name: '[name].[ext]',
            //             outputPath: 'assets/images'
            //         }
            //     }]
            // },
            // {
            //     test: /\.(woff(2)?|ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            //     loader: 'file-loader',
            //     options: {
            //         name: 'fonts/[name].[ext]?[hash]',
            //         publicPath: 'assets/fonts'
            //     }
            // },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1000,
                        name: 'assets/images/[name].[ext]',
                    }
                }]
            }
        ],
    },
    resolve: { extensions: ['.js', '.ts'] }

};