module.exports = onServerStart;

// const { createProxyServer } = require('http-proxy');
const { createProxyMiddleware } = require('http-proxy-middleware');
const http = require('http');

// This will be configured ahead of time on whatever proxy is used
const teamNamespaceToServerAddress = {
    'endpoint-agent': 'http://localhost:2222',
};
// const proxy = createProxyServer();

function onServerStart(app, server) {
    console.log('Custom server hook starting...');

    app.use(async (req, res, next) => {

        console.log('Receiving request:', {
            method: req.method,
            url: req.url,
            headers: req.headers,
        });
        // console.log(Object.keys(req));


        // const namespace = getTeamNamespace(req);
        // const serverToForwardTo = teamNamespaceToServerAddress[namespace];
        // if (serverToForwardTo) {
        //     console.log(`Forwarding to: ${namespace}`);
        //     const proxyResponse = await forwardRequest(req, 'http://localhost:2222');
        //     console.log(proxyResponse);
        //     proxyResponse.pipe(res);
        // }

        next();
    });


    for (const [teamNamespace, serverAddress] of Object.entries(teamNamespaceToServerAddress)) {
        app.use(`/${teamNamespace}`, createProxyMiddleware(serverAddress, { onProxyReq: (_, req) => console.log(`Forwarding to: ${teamNamespace}\n`) }));
    }
}


function getTeamNamespace(req) {
    const url = new URL(getFullUrl(req));
    const pathParts = url.pathname.split('/');
    return (pathParts.length > 1) ? pathParts[1] : '';
}

// function getTeamNamespace(req) {
//     // TODO: make more robust
//     if (req.headers['X-ThousandEyes-Namespace']) {
//         return req.headers['X-ThousandEyes-Namespace'];
//     }

//     return getNamespaceFromUrl(req.headers.referer);
// }

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
// function getNamespaceFromUrl(urlForNamespace) {
//     const url = new URL(urlForNamespace);
//     const pathParts = url.pathname.split('/');
//     return (pathParts.length > 1) ? pathParts[1] : '';
// }

function getFullUrl(req) {
    return req.protocol + '://' + req.hostname + req.url
}

// function forwardRequest(req, res, target) {

//     return new Promise(resolve => {

//     })
//     proxy.web(req, res, { target }, resolve);
//     proxy.web()
// }


function forwardRequest(request, host) {
    return new Promise(resolve => {
        const proxyRequest = http.request(`${host}${request.url}`, {
            method: request.method,
            headers: request.headers,
            host,
          })
        .on('response', proxyResponse => resolve(proxyResponse));
        // request.pipe(proxyRequest);
    });


}
