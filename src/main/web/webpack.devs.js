const common = require('./webpack.common');
const merge = require('webpack-merge');

module.exports = merge(common, {
    mode : 'development',
    devtools: 'inline-sourcemap',
    output: {
        path: path.resolve(__dirname, '../resources/static'),
    }
});