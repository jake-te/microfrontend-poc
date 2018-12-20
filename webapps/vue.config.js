const onServerStart = require('./onServerStart.js');

module.exports = {
    devServer: {
        before: onServerStart,
        port: 1111,
        historyApiFallback: false,
        proxy: {
            '^/endpoint-agent/': {
                target: 'http://localhost:2222',
                pathRewrite: {
                    '^/endpoint-agent': '',
                },
                changeOrigin: true,
            },
        },
    }
};
