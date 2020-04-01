// Map all relative URLs to correct host for the environment
// NOTE: Not a robust hook, just for examples sake
export default appUrlPrefix => {
    return (url, options) => {
        return fetch(
            getUrlThatPointsToService(appUrlPrefix, url),
            options,
        );
    };
}

// NOTE: Assuming that invalid urls are well-formed absolute paths
// Not a robust implementation
function getUrlThatPointsToService(appUrlPrefix, url) {
    return isValidURL(url)  ? url
                            : `${appUrlPrefix}${url}`;
}

function isValidURL(url) {
    try {
        new URL(url)
        return true;
    }
    catch {
        return false;
    }
}
