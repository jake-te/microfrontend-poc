module.exports = onServerStart;

function onServerStart(app, server) {
    console.log('Custom server hook starting...');

    app.get('/test-endpoint', function (req, resp) {
        resp.send('You\'re receiving data from the endpoint agent server!');
    });
}