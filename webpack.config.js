const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = function (env) {
    const isDev = (env && env.dev) ? true : false;

    const config = {
        devtool: isDev ? 'eval-source-map' : false,
        entry: './src/index.js',
        output: {
            filename: 'app.js',
            path: path.resolve(__dirname, 'docs')
        },
        mode: isDev ? 'development' : 'production',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        // options: {
                        //     presets: ['@babel/env']
                        // }
                    }
                },
                // {
                //     test   : /\.css$/,
                //     loaders: [
                //         'style-loader',
                //         'css-loader',
                //         'resolve-url-loader'
                //         // { loader: 'css-loader', options: { url: isDev }}
                //     ]
                // },
                {
                    test: /\.s(a|c)ss$/,
                    use: [
                        !isDev ?
                            MiniCssExtractPlugin.loader :
                            { loader: 'style-loader', options: { sourceMap: true } },
                        { loader: 'css-loader', options: { sourceMap: isDev } },
                        //{ loader: 'css-loader', options: { sourceMap: isDev, url: isDev } },    //url: dev - true
                        { loader: 'postcss-loader', options: { sourceMap: isDev } },
                        //{ loader: 'resolve-url-loader' },                              //development only
                        { loader: 'sass-loader', options: { sourceMap: isDev,
                                sourceMapContents: false } }
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images'
                        },
                    },
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './index.html',
                favicon: './src/assets/eggs.ico'
            }),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }),
            new CopyWebpackPlugin([
                { from: 'src/assets', to: 'images' }
            ])
        ]
    };

    return config;
};