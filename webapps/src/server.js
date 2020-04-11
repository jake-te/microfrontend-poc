const express = require('express');
const path = require('path');

console.log('Starting server...');

const app = express();
const port = 1111;

app.listen(port, () => console.log(`Listening on port: ${port}`));

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
