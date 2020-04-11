const express = require('express');
const cors = require('cors');
const path = require('path');

console.log('Starting server...');

const app = express();
const port = 2222;

app.listen(port, () => console.log(`Listening on port: ${port}`));

app.use(
    cors(),
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


app.get('/data', function (req, res) {
    res.send('You\'re receiving data from the endpoint agent server!');
});


app.get('/version', (req, res) => {
    res.send(process.env.GIT_REVISION_SHORT)
});
