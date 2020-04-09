const express = require('express');
const cors = require('cors');
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
    cors()
);


app.all('*', (req, resp, next) => {
    console.log('Receiving request', {
        method: req.method,
        url: req.url,
        headers: req.headers,
    }, '\n');
    next();
});


// app.get('/test-endpoint', function (req, res) {
//     res.send('You\'re receiving data from the endpoint agent server!');
// });


// // Injected by webpack at build time
// // eslint-disable-next-line no-undef
// app.get('/version', (req, res) => res.send(__GIT_REVISION_SHORT__));




// app.post('/', (req, res) => {
//     console.log(req.body);
//     res.send();
// });

app.listen(port, () => console.log(`Test server listening on port ${port}!`));
