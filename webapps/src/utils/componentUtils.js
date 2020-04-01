export default {
    getTeamComponent,
};

// TODO: Better to infer from url, or be explicit?
function getTeamComponent(teamNamespace, urlToComponent) {
    // const teamNamespace = getTeamNamespace(urlToComponent); // inferred from url
    const componentName = getFilenameWithoutExtension(urlToComponent); // inferred from filename (which should always match 1:1)

    return fetch(urlToComponent, {
        headers: {
            'X-ThousandEyes-Namespace': teamNamespace,
        }
    })
    .then(teamJsResponse => teamJsResponse.text())
    .then(rawTeamJs => eval(rawTeamJs)) // Register team component as web-component
    // TODO: Team is creating web component on their end. Don't do this, do on this end
    .then(() => ({ render: h => h(componentName) })); // Render team web-component
}

// TODO: hacky, use more robust implementation
// Assumes urls are relative
// function getTeamNamespace(url) {
//     const urlSegments = url.split('/');
//     return urlSegments[0];
// }

// TODO: hacky, use more robust implementation
// Assumes urls are relative
function getFilenameWithoutExtension(url) {
    const urlSegments = url.split('/');
    return urlSegments[urlSegments.length - 1].split('.').slice(0, -1).join('.');
}
