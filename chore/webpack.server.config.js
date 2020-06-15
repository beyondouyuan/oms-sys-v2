const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const projectConfig = require('../project.config')[process.env.NODE_ENV];
const nodeExternals = require('webpack-node-externals');

const { resolve } = require('./utils');

module.exports = merge(baseConfig(projectConfig), {
    target: 'node',
    devtool: projectConfig.devtool,
    entry: resolve('client/server.js'),
    output: {
        filename: 'js/server-bundle.js',
        libraryTarget: 'commonjs2'
    },
    externals: nodeExternals({
        whitelist: /\.css$/,
    }),
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(projectConfig.env),
            'process.env.REACT_ENV': '"server"'
        })
    ]
})