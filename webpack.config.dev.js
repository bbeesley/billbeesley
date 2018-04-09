const { resolve } = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        './src/main/index.js',
    ],
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            __dirname,
            'node_modules',
        ],
    },
    devServer: {
        compress: true,
        disableHostCheck: true,
        port: 8082,
        host: '0.0.0.0',
        hot: true,
        contentBase: resolve(__dirname),
        publicPath: '/',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
            'Access-Control-Expose-Headers': 'SourceMap,X-SourceMap',
        },
        proxy: {
            '/desktop/*': {
                target: 'http://localhost:8082/',
                pathRewrite: {
                    '^/desktop': '',
                },
            },
            '/tablet/*': {
                target: 'http://localhost:8082/',
                pathRewrite: {
                    '^/tablet': '',
                },
            },
            '/mobile/*': {
                target: 'http://localhost:8082/',
                pathRewrite: {
                    '^/mobile': '',
                },
            },
        },
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            DEBUG: true,
        }),
        new ExtractTextPlugin('styles.css'),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new SpriteLoaderPlugin(),
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
