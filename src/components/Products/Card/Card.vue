<template>
    <div class="card col-xl-4 col-lg-6 col-12 p-4 m-0 border-0 bg-transparent">
      <img
        class="card-img-top bg-dark p-4"
        style="height:200px;object-fit: contain;"
        :src="'https://firebasestorage.googleapis.com/v0/b/tech-shop-4b111.appspot.com/o/productImages%2F'+product.imageUrl+'?alt=media'"
        alt="Card image cap"
      />
      <div class="card-body bg-light">
        <h5 class="card-title">{{product.name}}</h5>
        <p class="card-text">
          Cena:{{product.price}}RSD<br>
          Kategorija:{{product.productType.name}}
        </p>
        <div class="d-flex justify-content-center">
         Quantity: <input type="number" class="quantity-input" v-model="quantity" style="width:40px" />
        </div>

        <button class="btn btn-dark mt-2" style="width:100px" @click="addToCart">Buy</button><br>
        <div v-if="this.$store.state.user && this.$store.state.user.role=='employee'">
        <button class="btn btn-dark mt-2" style="width:100px" @click="removeProductHandler">Delete</button>
        <button class="btn btn-dark mt-2" style="width:100px" @click="showDetailsHandler">Update</button>
        </div>
      </div>
    </div>
</template>
<script>
import {addToChart} from './../../../utils/cart-services'
export default {
  name:"Card",
  props:['product','showDetails'],
  data(){
    return{
quantity:0}
  },
  methods:{
    showDetailsHandler(e)
    {
      this.showDetails(this.product);
    }
    ,
    addToCart(e)
    {
      if(this.quantity>0)
      addToChart(this.product.id,this.quantity,this.product.name,`https://firebasestorage.googleapis.com/v0/b/tech-shop-4b111.appspot.com/o/productImages%2F${this.product.imageUrl}?alt=media`,this.product.price)
    },
    removeProductHandler(e)
    {
      this.$store.dispatch("deleteProduct",this.product.id);
      this.$store.dispatch("getAllProducts");
    }
  }
}
</script>
