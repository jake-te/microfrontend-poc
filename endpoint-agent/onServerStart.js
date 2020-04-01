module.exports = onServerStart;

function onServerStart(app, server) {
    console.log('Custom server hook starting...');

    app.use(function (req, resp, next) {
        console.log('Receiving request');
        console.log({
            method: req.method,
            url: req.url,
            headers: req.headers,
        }, '\n');
        next();
    });


    app.get('/test-endpoint', function (req, resp) {
        console.log('Receiving request test-url');
        resp.send('You\'re receiving data from the endpoint agent server!');
    });
}
