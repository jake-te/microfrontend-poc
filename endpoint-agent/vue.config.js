const onServerStart = require('./onServerStart.js');

module.exports = {
    devServer: {
        before: onServerStart,
        port: 2222,
        historyApiFallback: false,
    },
};
