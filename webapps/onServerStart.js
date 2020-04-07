module.exports = onServerStart;

const { createProxyMiddleware } = require('http-proxy-middleware');
const http = require('http');

// This will be configured ahead of time on whatever proxy is used
const teamNamespaceToServerAddress = {
    'endpoint-agent': 'http://localhost:2222',
};

function onServerStart(app, server) {
    console.log('Custom server hook starting...');

    app.use(async (req, res, next) => {

        console.log('Receiving request:', {
            method: req.method,
            url: req.url,
            headers: req.headers,
        });

        next();
    });


    for (const [teamNamespace, serverAddress] of Object.entries(teamNamespaceToServerAddress)) {
        app.use(`/${teamNamespace}`, createProxyMiddleware(serverAddress, { onProxyReq: (_, req) => console.log(`Forwarding to: ${teamNamespace}\n`) }));
    }
}
