const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

console.log('Starting server...');

const app = express();
const port = 1111;

app.listen(port, () => console.log(`Listening on port: ${port}`));


app.get('/:page', (req, res) => {
    // TODO: Don't hardcode, generate valid list from ssot
    const validPageSet = new Set(['endpoint']);
    if (!validPageSet.has(req.params.page)) {
        res.sendStatus(404);
    }
    else {
        res
        // TODO: Finish HTTP/2 push implementation
        // .header('Link', '<http://endpoint.app.microfrontend/version>; rel=preload;')
        .sendFile('./public/index.html', { root: __dirname });
    }
});

// console.log(process.env.VUE_APP_ENDPOINT_URL);

app.use(
    // createProxyMiddleware('/namespace/endpoint', { target: 'http://app.local.microfrontend:2222' }),
    cookieParser(),
    express.static(path.join(__dirname, 'public')),
    express.json(),
);


app.all('*', (req, resp, next) => {
    console.log('Receiving request', {
        method: req.method,
        url: req.url,
        headers: req.headers,
        cookies: req.cookies,
    }, '\n');
    next();
});
