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
    getDataFromEndpointAgentServer: () => fetch('/test-endpoint').then(response => response.data),
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
