const onServerStart = require('./onServerStart.js');

module.exports = {
    devServer: {
        before: onServerStart,
        port: 1111,
        historyApiFallback: false,
        // proxy: {
        //     '^/endpoint-agent/': {
        //         target: 'http://localhost:2222',
        //         pathRewrite: {
        //             '^/endpoint-agent': '',
        //         },
        //         changeOrigin: true,
        //         bypass(req) {
        //             console.log('Routing to endpoint-agent service');
        //             console.log({
        //                 method: req.method,
        //                 url: req.url,
        //                 headers: req.headers,
        //             }, '\n');
        //         }
        //     },
        // },
    }
};
