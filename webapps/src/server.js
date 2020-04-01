import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';

console.log('Starting server...');

const app = express();
const port = 1111;

app.listen(port, () => console.log(`Listening on port: ${port}`));


app.get('/:page', (req, res) => {
    // TODO: Don't hardcode, generate valid list from ssot
    const validPageSet = new Set(['endpoint', 'revenue']);
    if (!validPageSet.has(req.params.page)) {
        res.sendStatus(404);
    }
    else {
        res
        // TODO: Finish HTTP/2 push implementation
        .header('Link', '<http://app.local.microfrontend:1111/namespace/endpoint/version>; rel=preload; as=fetch;')
        .sendFile('./public/index.html', { root: __dirname });
    }
});


app.use(
    // For local dev
    createProxyMiddleware('/namespace/endpoint', {
        target: process.env.ENDPOINT_SERVER_URL,
        pathRewrite: {
            '^/namespace/endpoint': '',
        }
    }),
    createProxyMiddleware('/namespace/revenue', {
        target: process.env.REVENUE_SERVER_URL,
        pathRewrite: {
            '^/namespace/revenue': '',
        }
    }),
    cookieParser(),
    express.static(path.join(__dirname, 'public')),
    express.json(),
);


app.all('*', (req, resp, next) => {
    console.log('Receiving request', {
        method: req.method,
        url: req.url,
        query: req.query,
        body: req.body,
        headers: req.headers,
        cookies: { ...req.cookies },
    }, '\n');
    next();
});
