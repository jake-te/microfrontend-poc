import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'


// Adds SystemJS global
import 'systemjs/dist/system';

import componentUtils from './utils/componentUtils';

Vue.use(Router);


// window.customElements.define('wc-test', class HelloWorld extends HTMLElement {
//   constructor() {
//     super();
//     // Attach a shadow root to the element.
//     let shadowRoot = this.attachShadow({mode: 'open'});
//     shadowRoot.innerHTML = `<p>hello world</p>`;
//   }
// })

componentUtils.updateImportMappings({
  'endpoint-agent/view': '/endpoint-agent/endpointAgent.umd.js'
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
      component: () => componentUtils.getTeamComponent('endpoint-agent/view'),
    }
  ]
});
