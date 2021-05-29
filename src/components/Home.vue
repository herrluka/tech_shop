<template>
  <div class="main-content">
    <!--    <img src="../assets/shopping-cart-background.png"/>-->
    <div class="container">
      <h1 class="font-weight-bold">Vaša korpa</h1>
      <div v-for="product in productsInCart">
        <p>{{product.productName}}</p>
      </div>
      <button type="button" @click="addToChart">Dodaj</button>
      <button type="button" @click="checkState">Stampaj</button>
      <button type="button" @click="removeFromCart">Ukoli</button>
    </div>
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

  .main-content {
    padding-top: 20px;
  }

  .main-content::before {
    content: url("../assets/shopping-cart-background.png");
    position: absolute;
    right: 0;
  }
</style>
