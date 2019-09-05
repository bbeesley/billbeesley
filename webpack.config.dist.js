const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const prefixwrap = require('postcss-prefixwrap');

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/main',
    ],
    output: {
        path: resolve(__dirname, 'dist', 'www'),
        filename: 'bundle.js',
    },
    plugins: [
        new CleanWebpackPlugin({
            root: __dirname,
        }),
        new CopyWebpackPlugin([{
            from: resolve(__dirname, 'src', 'main', 'index.html'),
            to: resolve(__dirname, 'dist', 'www', 'index.html'),
        }]),
        new UglifyJSPlugin({
            uglifyOptions: {
                sourceMap: true,
                mangle: true,
                ie8: false,
                compress: {
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                },
                output: {
                    comments: false,
                },
            },
        }),
        new MiniCssExtractPlugin({ filename: '[contenthash]-styles.css' }),
        new StatsWriterPlugin({
            filename: 'stats.json',
            // transform: (stats) => JSON.stringify({
            //     bundles: {
            //         js: stats.assetsByChunkName.main.find(file => /\.js$/.test(file)),
            //         css: stats.assetsByChunkName.main.find(file => /\.css$/.test(file)),
            //     },
            // }),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: resolve(__dirname),
                exclude: /node_modules/,
            },
            {
                test: /\.*css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer,
                            ],
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                        },
                    },
                    {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                                { removeTitle: true },
                                { convertColors: { shorthex: false } },
                                { convertPathData: false },
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.icons\.(js|json)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                    {
                        loader: 'webfonts-loader',
                    },
                ],
            },
            {
                test: /\.(png|jpg|eot|woff|woff2|ttf)$/,
                loader: 'url-loader?',
                options: {
                    limit: 25000,
                },
            },
            {
                test: /\.(txt)$/,
                loader: 'raw-loader',
            },
            {
                test: /\.ico$/,
                loader: 'file-loader?name=[name].[ext]',
            },
        ],
    },
    externals: {
        fs: '{}',
        'https-proxy-agent': '{}',
        module: '{}',
    },
};
