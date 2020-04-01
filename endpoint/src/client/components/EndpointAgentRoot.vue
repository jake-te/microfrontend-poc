<template>
  <div class="endpoint-agent-root">
    <img
      alt="Endpoint Logo"
      class="endpoint-logo"
      src="./laptop.png">
    <div>ENDPOINT AGENT</div>
    <div>
      <div>Number of agents:</div>
      <div>
        <div v-if="numberOfAgentsAvailable == null">loading...</div>
        <div>{{ numberOfAgentsAvailable }}</div>
      </div>

      <div
          class="pricing-calculator-container"
          ref="pricingCalculatorContainer">
        <div v-if="!pricingCalculator">loading...</div>
        <component
          v-else
          :is="pricingCalculator"
          :numberOfUnits="numberOfAgentsAvailable"></component>
      </div>
    </div>
  </div>
</template>

<script>
import componentUtils from '../../../../common/componentUtils';
import fetch from '../fetch';
export default {
  data: () => ({
    messageFromEndpointAgentServer: null,
    pricingCalculator: null,
    numberOfAgentsAvailable: null,
  }),
  async mounted() {
    this.getDataFromEndpointAgentServer()
        .then(numAgentsAvailable => {
          this.numberOfAgentsAvailable = numAgentsAvailable;
        });

    this.pricingCalculator = (await componentUtils.getTeamComponent('revenue', 'pricingCalculator.umd.js')).default
  },
  methods: {
    getDataFromEndpointAgentServer: () => fetch('/num-agents').then(response => response.json()),
  },
}
</script>

<style scoped>
.endpoint-agent-root {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  border: dashed 5px #851E3E;
}

.pricing-calculator-container {
  width: 300px;
  height: auto;
  border: dashed 5px #003D82;
  display: inline-block;
}

.endpoint-logo {
  filter: invert();
  width: 175px;
  height: 175px;
}
</style>
