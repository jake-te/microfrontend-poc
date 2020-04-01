import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';

console.log('Starting server...');

const app = express();
const port = 2222;

app.listen(port, () => console.log(`Listening on port: ${port}`));

app.use(
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


app.get('/num-agents', (req, res) => {
    res.json(Math.ceil(Math.random() * 10));
});


app.get('/version', (req, res) => {
    res.send(process.env.GIT_REVISION_SHORT)
});
