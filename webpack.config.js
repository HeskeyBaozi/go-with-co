'use strict';
const path = require('path');
const webpack = require('webpack');
const packages = require('./package.json');

const banner = `${packages.name} ${packages.version} - ${packages.description}
built in ${ new Date().getFullYear() } ${packages.author} - ${packages.homepage}
License: ${packages.license}`;

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: `${packages.name}.min.js`,
        libraryTarget: 'umd'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel",
            query: {
                presets: ['es2015']
            }
        }]
    },
    plugins: [
        new webpack.BannerPlugin(banner)
    ]
};