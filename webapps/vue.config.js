const onServerStart = require('./onServerStart.js');

module.exports = {
    devServer: {
        before: onServerStart,
        port: 1111,
        historyApiFallback: false,
    }
};
