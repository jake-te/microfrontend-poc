import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import componentUtils from './utils/componentUtils';

Vue.use(Router);



export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/endpoint',
            name: 'endpoint',
            component: async () => componentUtils.getTeamComponent(`${await getTeamStaticUrl('endpoint')}/endpointAgent.umd.js`),
        }
    ]
});


async function getTeamStaticUrl(team) {

    // TODO: make this dynamic
    // const teamToServerUrl = {
    //     endpoint: process.env.VUE_APP_ENDPOINT_URL,
    // };

    // TODO: Use url based on prod, but CORS for local dev?
    // TODO: How to override with url based version?
    // const urlOverride = localStorage.getItem(`@te/${team}/url`);
    // const serverUrl = urlOverride || teamToServerUrl[team];

    // /namespace/endpoint
    const serverUrl = `/namespace/${team}`;
    // TODO: Use HTTP/2 server push on this
    const version = await fetch(`${serverUrl}/version`).then(response => response.text());
    return `${serverUrl}/${version}/static`;
}
