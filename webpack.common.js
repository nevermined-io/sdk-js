'use strict'

const { paths } = require('./webpack.parts.js')

module.exports = {
    entry: paths.entry,
    mode: 'none',
    optimization: {
        minimize: true,
        emitOnErrors: false
    },
    externals: {
        "node:assert": "assert",
        "node:buffer": "buffer",
        "node:crypto": "crypto",
        "node:fs": "fs",
        "node:http": "http",
        "node:https": "https",
        "node:net": "net",
        "node:path": "path",
        "node:process": "process",
        "node:stream": "stream",
        "node:stream/web": "stream",
        "node:os": "os",
        "node:url": "url",
        "node:zlib": "zlib",
        "node:util": "util",
    },
    resolve: {
        extensions: ['.js'],
        modules: ['node_modules'],
        fallback: {
            "assert": require.resolve("assert/"),
            "crypto": require.resolve("crypto-browserify"),
            "fs": require.resolve("browserify-fs"),
            "https": require.resolve("https-browserify"),
            "http": require.resolve("stream-http"),
            "path": require.resolve("path-browserify"),
            "process": require.resolve("process/browser"),
            "stream": require.resolve("stream-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "url": require.resolve("url/"),
            "util": require.resolve("util/"),
            "worker_threads": false,
            "zlib": require.resolve('browserify-zlib'),
        }
    },

}
