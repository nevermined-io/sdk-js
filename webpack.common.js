'use strict'

const { paths } = require('./webpack.parts.js')

module.exports = {
    entry: paths.entry,
    mode: 'none',
    optimization: {
        minimize: true,
        noEmitOnErrors: true
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
          { test: /snarkjs\/main\.js$/, use: 'babel-loader' }
        ]
    },
    resolve: {
        extensions: ['.js'],
        modules: ['node_modules']
    }
}
