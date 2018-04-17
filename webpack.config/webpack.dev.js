const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

console.log(process.env.NODE_PRIVATE_KEY)

module.exports = Merge(CommonConfig, {
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        hot: true,
        historyApiFallback: true,
        noInfo: false,
        https: true,
        host: '0.0.0.0',
        port: process.env.NODE_DEV_PORT || 8081,
        proxy: {
            '/v3': {
                target: 'https://api.yelp.com',
                secure: false,
                changeOrigin: true
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('dev'),
                'NODE_PRIVATE_KEY': JSON.stringify(process.env.NODE_PRIVATE_KEY)
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
})