// Map all relative URLs to correct host for the environment
// NOTE: Not a robust hook, just for examples sake
export default (url, options) => {
    return fetch(
        getUrlThatPointsToService(url),
        options,
    );
}

// NOTE: Assuming that invalid urls are well-formed paths
// Not a robust implementation
function getUrlThatPointsToService(url) {
    return isValidURL(url)  ? url
                            : `${process.env.VUE_APP_URL_PREFIX}/${url}`;
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
