<template>
  <div class="revenue-root">
    <img
      alt="Revenue Logo"
      class="revenue-logo"
      src="./money.png">
    <div>REVENUE</div>
    <div>
      <div>You owe:</div>
      <div>{{ amountOwed || 'loading...' }}</div>
    </div>
  </div>
</template>

<script>
import fetch from '../common/fetch';
export default {
  data: () => ({
    bill: null,
  }),
  async mounted() {
    this.bill = await getBill();
  },
  computed: {
    amountOwed() {
      return this.bill != null ? `$${this.bill}` : null;
    }
  }
}

async function getBill() {
  return fetch('/bill').then(response => response.json());
}
</script>

<style scoped>
.revenue-root {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  border: dashed 5px #003D82;
}

.revenue-logo {
  width: 175px;
  height: 175px;
}
</style>
