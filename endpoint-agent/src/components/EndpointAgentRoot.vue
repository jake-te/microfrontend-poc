<template>
  <div id="app">
    <img alt="Endpoint Agent Logo" src="../assets/laptop.png">
    <div>HELLO I AM THE ENDPOINT AGENT</div>
    <div>
      <div>Here's a message from my server:</div>
      <div>{{ messageFromEndpointAgentServer || 'loading...' }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

// Prepend all fetches with endpoint-agents so it can be proxied back to this service
if (process.env.NODE_ENV === 'production') {
  axios.interceptors.request.use(config => {
      return {
        ...config,
        url: `/endpoint-agent${config.url}`,
      };
  });
}

export default {
  data: () => ({
    messageFromEndpointAgentServer: null,
  }),
  mounted() {
    this.getDataFromEndpointAgentServer()
        .then(text => {
          this.messageFromEndpointAgentServer = text;
        });
  },
  methods: {
    getDataFromEndpointAgentServer: () => axios.get('/test-endpoint').then(response => response.data)//.then(response => response.text()),
  },
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
