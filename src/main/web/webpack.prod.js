const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
    mode : 'production',
    devtools: 'inline-sourcemap',
    output: {
        path: path.resolve(__dirname, './build'),
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),
        ],
    }
});