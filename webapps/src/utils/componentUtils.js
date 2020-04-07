export default {
    getTeamComponent,
    updateImportMappings,
};

async function getTeamComponent(componentName) {
    // TODO: Webpack intercepts System.import, can we get it to not?
    return window.System.import(componentName).then(module => module.default);
}

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
