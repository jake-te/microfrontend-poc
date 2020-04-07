const onServerStart = require('./onServerStart.js');
const path = require('path');

module.exports = {
    css: {
        extract: false,
    },
    devServer: {
        before: onServerStart,
        port: 2222,
        historyApiFallback: false,
        contentBase: path.join(__dirname, 'public'),
        contentBasePublicPath: '/endpoint-agent'
    },
};
