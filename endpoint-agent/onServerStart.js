const gitUtils = require('./gitUtils');

module.exports = onServerStart;

function onServerStart(app, server) {
    console.log('Custom server hook starting...');

    app.all((req, resp, next) => {
        console.log('Receiving request', {
            method: req.method,
            url: req.url,
            headers: req.headers,
        }, '\n');
        next();
    });


    app.get('/endpoint-agent/test-endpoint', function (req, res) {
        res.send('You\'re receiving data from the endpoint agent server!');
    });

    app.get('/endpoint-agent/version', () => gitUtils.getCurrentShortGitRevision());
}
