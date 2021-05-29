<template>
  <div class="d-flex flex-column flex-lg-row flex-xl-row flex-sm-column align-content-around justify-content-around">
    <div class="d-flex flex-column flex-lg-column flex-xl-column flex-sm-column justify-content-center align-content-center">
      <h1 class="text-white display-1">Tech shop</h1>
      <h3 class="h1 font-weight-bold" style="color: forestgreen">Mesto gde inovacije ne prestaju</h3>
      <div class="text-center">
        <router-link to="/products" class="btn btn-warning text-decoration-none"><b class="h3 font-weight-bold text-white">Katalog</b></router-link>
      </div>
    </div>
    <img src="../assets/shopping-cart-background.png"/>
  </div>
</template>

<script>
  import {addToChart, removeFromChart} from '../utils/cart-services'
  export default {
    data() {
      return {
        productsInCart: this.$store.state.productsInCart,
      }
    },
    methods: {
      addToChart() {
        addToChart(1,5);
      },
      removeFromCart() {
        removeFromChart(1,2);
      },
      checkState() {
        const productsInCart = this.$store.state.productsInCart;
        console.log(productsInCart);
      },
    },
    mounted: function() {
      document.body.style = 'background-color: deepskyblue';
    },
    destroyed: function () {
      document.body.style = 'background-color: none';
    }
  }
</script>

<style scoped>
</style>
