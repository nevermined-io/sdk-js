'use strict'

const { paths } = require('./webpack.parts.js')
const path = require('path')

module.exports = {
    entry: paths.entry,
    mode: 'none',
    optimization: {
        minimize: true,
        emitOnErrors: false
    },
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
        ],
      },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        // modules: ['node_modules'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],

        fallback: {
            "os": require.resolve("os-browserify/browser"),
            "crypto": require.resolve("crypto-browserify"),
            "url": require.resolve("url/"),
            "https": require.resolve("https-browserify"),
            "http": require.resolve("stream-http"),
            "assert": require.resolve("assert/"),
            "path": require.resolve("path-browserify"),
            "stream": require.resolve("stream-browserify"),
            "zlib": false,
            "fs": false
        },
        alias: {
            '@': path.resolve(__dirname, 'src') 
        }
    }
}
