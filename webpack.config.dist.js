const ExtractTextPlugin = require('extract-text-webpack-plugin');
const resolve = require('path').resolve;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
const prefixwrap = require('postcss-prefixwrap');

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/main',
    ],
    output: {
        path: resolve(__dirname, 'dist', 'www'),
        filename: `bundle.js`,
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: __dirname,
        }),
        new CopyWebpackPlugin([{
            from: resolve(__dirname, 'src', 'main', 'index.html'),
            to: resolve(__dirname, 'dist', 'index.html'),
        }]),
        new UglifyJSPlugin({
            uglifyOptions: {
                sourceMap: true,
                mangle: true,
                ie8: false,
                compress: {
                    warnings: true,
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
        new ExtractTextPlugin('[contenthash]-styles.css'),
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
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader' },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [
                                    autoprefixer,
                                ]
                            },
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                }),
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
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!postcss-loader!sass-loader!webfonts-loader',
                }),
            },
            {
                test: /\.(png|jpg|eot|woff|woff2|ttf)$/,
                loader: 'file-loader?',
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
