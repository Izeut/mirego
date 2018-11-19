<template>
  <div id="app">
    <router-view :key="$route.fullPath"></router-view>
    <v-dialog/>
  </div>
</template>

<script>
    export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import "./styles/main.scss";

  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
