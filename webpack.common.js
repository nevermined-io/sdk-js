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
    resolve: {
        extensions: ['.js'],
        modules: ['node_modules']
    }
}
