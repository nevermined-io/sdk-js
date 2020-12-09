'use strict'

const { paths } = require('./webpack.parts.js')
const path = require('path')

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
    resolve: {
        extensions: ['.js'],
        modules: ['node_modules'],
        alias: {
            'jose/jwk/parse': path.resolve(__dirname, 'node_modules/jose/dist/node/esm/jwk/parse.js'),
            'jose/jwt/sign': path.resolve(__dirname, 'node_modules/jose/dist/node/esm/jwt/sign.js')
        }
    }
}
