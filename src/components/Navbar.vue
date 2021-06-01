<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">Tech Shop</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Početna</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item to="/products">Katalog</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-if="user !== null && user.role==='employee'">
          <b-nav-item to="/users">Korisnici</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-if="user !== null && user.role==='employee'">
          <b-nav-item to="#">Porudžbine</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-if="user !== null && user.role==='employee'">
          <b-nav-item to="/deliverers">Dostavljači</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-if="user">
          <b-nav-item v-if="user.role==='customer'" href="#">Moje porudžbine</b-nav-item>
          <b-nav-item class="mr-3" to="/cart" v-if="user.role==='customer'">
            <div class="d-inline">
              <font-awesome-icon icon="shopping-cart" :style="{ color: 'green', height: '25px', width: '25px' }"/>
              <div class="cart-number-of-products-span">{{numberOfProducts}}</div>
            </div>
          </b-nav-item>
          <b-nav-text class="ml-lg-2 ml-xl-2 mr-lg-2 mr-xl-2">Zdravo, {{user.name}}</b-nav-text>
          <b-nav-item @click="logout()">Odjavite se</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="!user">
            <b-nav-item to="/register">Registrujte se</b-nav-item>
            <b-nav-item to="/login">Ulogujte se</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  import router from "../router/router";

  export default {
    data() {
      return {
        user: this.$store.state.user,
        numberOfProducts: this.$store.state.productsInCart.length
      }
    },
    watch: {
      '$store.state.user': function() {
       this.user = this.$store.state.user;
      },
      '$store.state.productsInCart': function () {
        this.numberOfProducts = this.$store.state.productsInCart.length;
      }
    },
    methods: {
      logout() {
        this.$store.commit('setUser', null);
        router.push('/');
      }
    }
  }
</script>

<style scoped>
.cart-number-of-products-span{
  display: inline;
  background-color: white;
  color: black;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  padding: 4px;
  position: absolute;
  font-size: 12px;
  font-weight: bold;
  margin-left: -6px;
  margin-top: -10px;
}

</style>
