<template>
  <div id="app">
    <div id="nav">
        <div class="nav-title">Microfrontends</div>
        <router-link class="nav-link endpoint-link" to="/endpoint"><span class="marker"></span>Endpoint Agent</router-link>
        <router-link class="nav-link revenue-link" to="/revenue"><span class="marker"></span>Revenue</router-link>
    </div>
    <router-view id="nav-view" />
  </div>
</template>

<style>
.marker {
  width: 7px;
  height: 7px;
  display: inline-block;
  border-radius: 3px;
  margin-bottom: 2px;
  margin-right: 4px;
}

.endpoint-link .marker {
  background: #851E3E;
}

.revenue-link .marker {
  background: #003D82;
}


html {
  color: white;
  background: rgba(24, 26, 27, 0.95);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#nav {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 200px;
  background: #181a1b;
}

#nav a.router-link-exact-active {
  cursor: default;
  font-weight: bold;
}

.nav-title {
    padding: 20px;
}

.nav-link {
    padding: 20px;
    text-align: left;
    text-decoration: none;
    color: white;
    display: block;
    cursor: pointer;
}

.nav-link:hover {
    background: #3c4144;
}

#nav-view {
    position: absolute;
    left: 200px;
    top: 0;
    right: 0;
    bottom: 0;
}
</style>
