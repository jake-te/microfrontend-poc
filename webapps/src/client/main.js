// Adds SystemJS to window
import 'systemjs/dist/system';

import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// TODO: Not robust polyfill
const originalFetch = window.fetch;
window.fetch = (url, options) => {
  return originalFetch(
    url,
    {
      ...options,
      credentials: 'include',
    }
  );
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
