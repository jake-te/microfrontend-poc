export default {
    getTeamComponent,
    updateImportMappings,
    mountVueComponent,
};

// TODO: Should we have a higher level name for components, or just use paths?
// TODO: Webpack intercepts System.import, can we get it to not?
async function getTeamComponent(team, componentPath) {
    const staticUrl = await getTeamStaticUrl(team);
    return window.System.import(`${staticUrl}/${componentPath}`)
                        .then(module => module.default);
}

// NOTE: To make approach generic, either component supplier will provide mounting function
// Or all suppliers will provide web components.
// This approach is placeholder
async function mountVueComponent(container, componentConstructor) {
    const component = new componentConstructor();
    component.$mount();
    container.appendChild(component.$el);
}

// TODO: Check if Canary cookie state changes between sending and receiving version response
// Force Cookie to match /version response, don't allow overriding after that
// Refresh cookie on interval (here?)
// NOTE: still not handling case where non-version request issued in parallel with version request, and non-version request returns second
// Two ideas:
// 1) Don't use Set-Cookie, but instead custom response header and set cookie via js
// Like this approach better, JS maintains all Cookie state
// Requires overriding fetch and XHR to inspect headers though.
// 2) By design, force all requests to be versioned in url, that way /version has to be fetched first
// TODO: What if making two calls to version at same time? Not possible since we force that to be single request
async function getTeamStaticUrl(team) {
    // TODO: Implement url override logic
    // const urlOverride = localStorage.getItem(`@te/${team}/url`);
    // const serverUrl = urlOverride || teamToServerUrl[team];

    const serverUrl = `/namespace/${team}`;

    // TODO: Use HTTP/2 server push on this
    // We have to use window here since this library may be included in multiple contexts
    // TODO: Can we use Systemjs instead? Won't work for local dev
    window._te = window._te || { namespaceToVersion: {} };
    const { namespaceToVersion } = window._te;
    if (!namespaceToVersion[serverUrl]) {
        namespaceToVersion[serverUrl] = fetch(`${serverUrl}/version?ts=${Date.now()}`).then(response => response.text())
    }
    const version = await namespaceToVersion[serverUrl];
    return `${serverUrl}/${version}/static`;
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
