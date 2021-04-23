<template>
  <div class="in-the-centre">
    <b-icon-emoji-frown class="h1"></b-icon-emoji-frown>
    <h1>Page not found</h1>
    <div>
      <router-link to="/" class="btn btn-primary">Back to home</router-link>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>
  .in-the-centre {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  }
</style>
