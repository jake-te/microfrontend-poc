import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import componentUtils from './utils/componentUtils';

Vue.use(Router);

// TODO: Fix race condition with System.import
// TODO: Use HTTP/2 Server Push on this
fetch(`${process.env.VUE_APP_ENDPOINT_URL}/version`)
.then(response => response.text())
.then(endpointVersion => {
    componentUtils.updateImportMappings({
        '@te/endpoint/view': `${process.env.VUE_APP_ENDPOINT_URL}/${endpointVersion}/static/endpointAgent.umd.js`,
    });
});



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
            component: () => componentUtils.getTeamComponent('@te/endpoint/view'),
        }
    ]
});
