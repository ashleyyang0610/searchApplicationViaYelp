const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const extractSass = new ExtractTextPlugin({
    filename: '[name].bundle.css?[hash]'
});

module.exports = {
    context: __dirname,
    entry: {
        main: path.resolve(__dirname, '../src/index.js'),
        vendor: path.resolve(__dirname, '../src/utils/vendors.js')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            chunksSortMode: function (chunk1, chunk2) {
                var orders = ['vendor', 'main'];
                var order1 = orders.indexOf(chunk1.names[0]);
                var order2 = orders.indexOf(chunk2.names[0]);
                if (order1 > order2) {
                    return 1;
                } else if (order1 < order2) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }),
        extractSass
    ],
    output: {
        filename: '[name].bundle.js?[hash]',
        path: path.resolve(__dirname, '../dist')
    },
    resolve: {
        extensions: ['.js'],
        modules: [
            path.join(__dirname, '../src'),
            path.join(__dirname, '../node_modules')
        ]
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /(\.js|\.jsx)$/,
                exclude: /node_modules/,
                use: [
                    'eslint-loader'
                ]
            },
            {
                test: /(\.js|\.jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'stage-0', 'react']
                        }
                    }
                ]
            },
            {
                test: /(\.scss|\.css)$/,
                use: extractSass.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'resolve-url-loader',
                            options: {
                                includePaths: [path.resolve(__dirname, '../src')]
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => {
                                    require('postcss-flexbugs-fixes'),
                                    autoprefixer({
                                          browsers: [
                                                'Firefox >= 51',
                                                'Chrome >= 55',
                                                'Safari >= 10',
                                                'ios_saf >= 10',
                                                'ie >= 11',
                                                'Edge >= 14'
                                          ]
                                    })
                                }
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            },
            {
                test: /\.json$/,
                use: [
                    'json-loader'
                ]
            },
            {
                test: /\.(ttf|otf|eot|svg|ico|png|jpg|gif|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: Infinity
                        }
                    }
                ]
            },
            {
                test: /\.(i18n)$/i,
                use: [
                    {
                        loader: 'i18next-resource-store-loader'
                    }
                ]
            }
        ]
    }
};