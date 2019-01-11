const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const glob = require("glob");
const PurifycssWebpack = require("purifycss-webpack");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractBundle = new ExtractTextPlugin('bundle.css');

module.exports = {
    entry: {
        // babelPolyfill: "babel-polyfill",
        main: "./main.js"
    },
    output: {
        filename: "bundle.js",
        path: path.resolve("./dist")
    },
    devServer: {
        contentBase: "./dist",
        port: 3000,
        compress: true,
        open: true,
        hot: true,
        disableHostCheck: true,
        clientLogLevel: 'none',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2|png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 30000,
                            name: "[name].[ext]",
                            outputPath: "assert/static",
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: extractBundle.extract({
                    use: [
                        {loader: 'css-loader'},
                        {loader: 'postcss-loader'}
                    ]
                })
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(["./dist"]),
        new HtmlWebpackPlugin({
            template: "./index.html",
            hash: true,
            inject: 'body',
            chunks: ['common', 'main'],
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            favicon:"./src/favicon.ico"
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: false
        }),
        new PurifycssWebpack({
            paths: glob.sync(path.resolve("src/*.html"))
        }),
        extractBundle,
        new CopyWebpackPlugin([
            {
                from: './src/css/browser_operator',
                to: 'assert/css/browser_operator'
            }
        ])
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i
            })
        ],
        splitChunks: {
            name: 'common'
        }
    },
    mode: "production"
};

