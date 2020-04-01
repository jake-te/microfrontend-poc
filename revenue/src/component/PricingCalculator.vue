<template>
  <div class="pricing-calculator">
    <div>Pricing Calculator</div>
    <div>
      <div v-if="isCostLoading">loading...</div>
      <div v-else>Your cost is: {{ cost }}</div>
    </div>
  </div>
</template>

<script>
import fetch from '../common/fetch';
export default {
  props: ['numberOfUnits'],
  data: () => ({
    cost: null,
    isCostLoading: true,
  }),
  watch: {
    numberOfUnits: {
      async handler(newNumberOfUnits) {
        this.isCostLoading = true;
        this.cost = await getCost(newNumberOfUnits)
        this.isCostLoading = false;
      },
      immediate: true,
    }
  }
}

function getCost(numberOfUnits) {
    return fetch(`/cost?numberOfUnits=${numberOfUnits}`).then(response => response.json());
}
</script>

<style scoped>
</style>
