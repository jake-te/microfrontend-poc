export default {
    getTeamComponent,
    updateImportMappings,
};

// TODO: Better to infer from url, or be explicit?
async function getTeamComponent(componentName) {
    // const componentName = getFilenameWithoutExtension(urlToComponent); // inferred from filename (which should always match 1:1)


    // TODO: Webpack intercepts System.import, can we get it to not?
    const { default: component } = await window.System.import(componentName);
    return component;
    // return fetch(urlToComponent)
    // .then(teamJsResponse => teamJsResponse.text())
    // .then(rawTeamJs => eval(rawTeamJs)) // Register team component as web-component
    // // TODO: Team is creating web component on their end. Don't do this, do on this end
    // .then(() => ({ render: h => h(componentName) })); // Render team web-component
}

// TODO: hacky, use more robust implementation
// Assumes urls are relative
// function getTeamNamespace(url) {
//     const urlSegments = url.split('/');
//     return urlSegments[0];
// }

// TODO: hacky, use more robust implementation
// Assumes urls are relative
// function getFilenameWithoutExtension(url) {
//     const urlSegments = url.split('/');
//     return urlSegments[urlSegments.length - 1].split('.').slice(0, -1).join('.');
// }


function updateImportMappings(importNameToPath) {
    // TODO: Throw error when system js has already registered imports, unable to modify after that
    const script = Object.assign(
        document.createElement('script'),
        {
            type: 'systemjs-importmap',
            text: JSON.stringify({
                imports: importNameToPath,
            })
        }
    );

    document.head.append(script);
}
