module.exports = onServerStart;

function onServerStart(app, server) {
    console.log('Custom server hook starting...');
}


// // TODO: This is not the long term solution we'll use. We can't simply use original page to know
    // // which server to hit because
    // // 1) It will mess up any webapps requests that run on that page
    // // 2) it's brittle to maintain a list for this in multiple places
    // // 3) We'll have fragments that one team own within another team's page
    // // Instead we need to likely prepend XHR urls with teams identifier when serving/building for consumption by others
    // // (we won't prepend locally)
    // app.all('*', function(req, res, next) {
    //     const teamDomainId = getTeamDomainId(req.headers.referer);
    //     if (req.headers.referer.split('originalUrl === '/test-endpoint') {
    //         console.log(req);
    //     }

    //     // if (needToPrependDomainFragment) {
    //     //     console.log(req);
    //     //     // res.redirect(req.originalUrl)
    //     //     console.log('need to prepend')
    //     // }
    //     next();
    // });


// function getTeamDomainId(refererUrl) {
//     const url = new URL(refererUrl);
//     return url.pathname ? pathname.split('/')[1] : '';
// }

// function prependTeamDomainId(requestUrl) {

// }