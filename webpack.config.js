const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


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
                {
                    test: /\.s(a|c)ss$/,
                    use: [
                        !isDev ?
                            MiniCssExtractPlugin.loader :
                            { loader: 'style-loader', options: { sourceMap: true } },
                        { loader: 'css-loader', options: { sourceMap: isDev } },
                        { loader: 'postcss-loader', options: { sourceMap: isDev } },
                        { loader: 'sass-loader', options: { sourceMap: isDev } }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './index.html'
            }),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            })
        ]
    };

    return config;
};