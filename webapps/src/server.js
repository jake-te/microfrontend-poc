const express = require('express');
const path = require('path');
// const { createProxyMiddleware } = require('http-proxy-middleware');


// This will be configured ahead of time on whatever proxy is used
// const teamNamespaceToServerAddress = {
//     'endpoint-agent': 'endpoint.microfrontend:2222',
// };
// for (const [teamNamespace, serverAddress] of Object.entries(teamNamespaceToServerAddress)) {
//     app.use(`/${teamNamespace}`, createProxyMiddleware(serverAddress, { onProxyReq: (_, req) => console.log(`Forwarding to: ${teamNamespace}\n`) }));
// }

console.log('Starting server...');

const app = express();
const port = 1111;

app.use(
    express.static(path.join(__dirname, 'public')),
    express.json(),
);


app.all('*', (req, resp, next) => {
    console.log('Receiving request', {
        method: req.method,
        url: req.url,
        headers: req.headers,
    }, '\n');
    next();
});

app.listen(port, () => console.log(`Test server listening on port ${port}!`));
