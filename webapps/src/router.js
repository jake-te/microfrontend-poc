import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import componentUtils from './utils/componentUtils';

Vue.use(Router);

// TODO: Fetch urls at runtime
componentUtils.updateImportMappings({
  '@te/endpoint-agent/view': '/endpoint-agent/endpointAgent.umd.js'
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
      path: '/endpoint-agent',
      name: 'endpoint-agent',
      component: () => componentUtils.getTeamComponent('@te/endpoint-agent/view'),
    }
  ]
});
