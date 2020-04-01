module.exports = onServerStart;

// This will be configured ahead of time on whatever proxy is used
const teamNamespaceSet = new Set([
    'endpoint-agent',
]);

function onServerStart(app, server) {
    console.log('Custom server hook starting...');

    app.use(function(req, res, next) {
        console.log('Receiving request:', {
            method: req.method,
            url: req.url,
            headers: req.headers,
        }, '\n');

        const teamNamespace = getTeamNamespace(req);
        console.log(teamNamespace);
        next();
    });

}

function getTeamNamespace(req) {
    // TODO: make more robust
    if (req.headers['X-ThousandEyes-Namespace']) {
        return req.headers['X-ThousandEyes-Namespace'];
    }

    return getNamespaceFromUrl(req.headers.referer);
}

// question, what about component within component?
// Scenario
// endpointAgent page
//   REV component
// referer - will be endpoint
// X-ThousandEyes-Namespace
//  - not able to set for img/css/etc
//  -
// Override Fetch - Can we determine what component we're in?

// Namespace is considered first segment of the url
function getNamespaceFromUrl(urlForNamespace) {
    const url = new URL(urlForNamespace);
    const pathParts = url.pathname.split('/');
    return (pathParts.length > 1) ? pathParts[1] : '';
}

function getFullUrl(req) {
    console.log(req.url)
    return req.protocol + '://' + req.hostname + req.url
}
