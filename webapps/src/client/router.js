import Vue from 'vue'
import Router from 'vue-router'
import componentUtils from '../../../common/componentUtils';

Vue.use(Router);



export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            redirect: "/endpoint"
        },
        {
            path: '/endpoint',
            name: 'endpoint',
            component: async () => componentUtils.getTeamComponent('endpoint', 'endpointAgent.umd.js'),
        },
        {
            path: '/revenue',
            name: 'revenue',
            component: async () => componentUtils.getTeamComponent('revenue', 'revenue.umd.js'),
        }
    ]
});
