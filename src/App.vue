<template>
  <div id="app">
    <navbar/>
  </div>
</template>

<script>
import Navbar from './components/navbar';
export default {
  name: 'app',
  components: {
    'navbar': Navbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
