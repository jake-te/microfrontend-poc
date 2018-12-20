export default {
    createUpdateTeamPageOnNavigation,
    updateTeamPage,
};


function createUpdateTeamPageOnNavigation(url) {
    return onRouteChanged;

    function onRouteChanged() {
        return updateTeamPage(url); // TODO: implement cache busting
    }
}

function updateTeamPage(url) {
    const componentName = getFilenameWithoutExtension(url); // inferred from filename (which should always match 1:1)
    return fetch(url)
    .then(teamJsResponse => teamJsResponse.text())
    .then(rawTeamJs => eval(rawTeamJs)) // Register team component as web-component
    .then(() => ({ render: h => h(componentName) })); // Render team web-component
}


// TODO: hacky, use more robust implementation
function getFilenameWithoutExtension(url) {
    const urlSegments = url.split('/');
    return urlSegments[urlSegments.length - 1].split('.').slice(0, -1).join('.');
}