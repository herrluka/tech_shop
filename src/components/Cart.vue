<template>
    <div class="container main-content">
      <div class="row h-100 w-100">
        <div class="col-lg-8 col-xl-8 col-sm-12 col-xs-12 products-in-cart p-lg-5 p-xl-5 p-sm-0">
          <div class="title">
            <span class="h3 font-weight-bold m-0">Vaša korpa</span>
            <span class="h4 font-weight-bold m-0">{{numberOfProducts}} proizvoda</span>
          </div>
          <hr />
          <div class="table-responsive">
            <table class="table">
              <thead>
              <tr>
                <th scope="col" class="border-0 bg-light">
                  <div class="p-2 px-3">Proizvod</div>
                </th>
                <th scope="col" class="border-0 bg-light">
                  <div class="py-2">Cena</div>
                </th>
                <th scope="col" class="border-0 bg-light">
                  <div class="py-2">Količina</div>
                </th>
                <th scope="col" class="border-0 bg-light">
                  <div class="py-2">Ukupno</div>
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="product in productsInCart">
                <th scope="row" class="border-0">
                  <div class="p-2 d-lg-flex d-sm-inline-block ">
                    <img :src="product.imageUrl" alt="" width="70" class="img-fluid rounded shadow-sm">
                    <div class="ml-3 d-flex justify-content-center align-content-center">
                      <a href="#" class="text-dark font-weight-normal text-left">{{product.productName}}</a>
                    </div>
                  </div>
                </th>
                <td class="border-0 align-middle"><strong>{{product.price}} din.</strong></td>
                <td class="border-0 align-middle">
                  <div class="quantity-container">
                    <button class="btn btn-success" @click="subtractOne(product.productId)">
                      <font-awesome-icon icon="minus" class="plus-minus-icons" />
                    </button>
                    <input type="number" class="quantity-input" :value="product.quantity" />
                    <button class="btn btn-success" @click="addOneToChart(product.productId)">
                      <font-awesome-icon icon="plus" class="plus-minus-icons"/>
                    </button>
                  </div>
                </td>
                <td class="border-0 align-middle"><strong>{{product.price * product.quantity}} din.</strong></td>
                <td class="border-0 align-middle">
                  <button class="btn btn-danger" @click="removeProductFromCart(product.productId)">
                    <font-awesome-icon icon="trash" class="trash-icon" />
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-lg-4 col-xl-4 col-sm-12 col-xs-12 order-summary p-lg-5 p-xl-5 p-sm-0">
          <div class="title">
            <span class="h3 font-weight-bold">Informacije o porudžbini</span>
          </div>
          <hr />
          <div class="text-left">
            <h6>Izaberite dostavljača</h6>
          </div>
          <div>
            <select class="w-100 my-3 p-1">
              <option value="Luka">Luka</option>
            </select>
          </div>
          <div class="text-left">
            <h6>Vaša adresa:</h6>
            <h5>{{user.address}}</h5>
          </div>
          <div class="text-left">
            <h6>Kontakt telefon:</h6>
            <h5>{{user.phoneNumber}}</h5>
          </div>
          <div class="total-price-container">
            <div class="d-flex justify-content-between align-content-between" style="padding: 10px 12%">
              <span class="font-weight-bold">UKUPNO</span>
              <span class="font-weight-bold">{{totalPrice}} din.</span>
            </div>
            <button class="btn btn-success w-75">PORUČI</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {addToChart, removeFromChart, subtractProductQuantityFromChart} from '../utils/cart-services'
    export default {
        data() {
          return {
            productsInCart: this.$store.state.productsInCart,
            user: this.$store.state.user,
          }
        },
        computed: {
          numberOfProducts: function() {
            return this.productsInCart.length;
          },
          totalPrice: function () {
            let price = 0;
            this.productsInCart.forEach(product => {
              price += product.price * product.quantity;
            });
            return price;
          }
        },
        methods: {
          addOneToChart(productId) {
            addToChart(productId,1);
          },
          removeProductFromCart(productId) {
            removeFromChart(productId);
            this.productsInCart = this.$store.state.productsInCart;
          },
          checkState() {
            const productsInCart = this.$store.state.productsInCart;
          },
          subtractOne(productId) {
            subtractProductQuantityFromChart(productId, 1);
            this.productsInCart = this.$store.state.productsInCart;
          }
        },
        mounted: function() {
          document.body.style.backgroundColor = 'deepskyblue';
        },
        destroyed: function () {
          document.body.style = 'background-color: none';
        }
    }
</script>

<style scoped>

.main-content {
  margin-top: 3rem;
  margin-bottom: 25px;
  height: 80vh;
  min-width: 85vw;
}

.order-summary {
  background-color: #f5f5f5;
}

.products-in-cart {
  background-color: white;
  max-height: 100%;
  overflow: auto;
}

.title {
  display: flex;
  justify-content: space-between;
}

.quantity-container {
  display: flex;
  justify-content: center;
  align-content: center;
}

.quantity-input {
  width: 40px;
  -moz-appearance: textfield;
  text-align: center;
}
.quantity-input::-webkit-outer-spin-button,
.quantity-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.plus-minus-icons {
  color: white;
  height: 15px;
  width: 15px;
}

.trash-icon {
  color: white;
  height: 15px;
  width: 15px;
}

.total-price-container {
  bottom: 40px;
  left: 0;
  position: absolute;
  width: 100%;
  text-align: center;
}

@media only screen and (max-width: 600px) {
  .total-price-container {
    position: relative;
    display: block;
    bottom: 0;
  }

  .title {
    padding-top: 20px;
  }

  .products-in-cart {
    width: 100vw;
  }

  .order-summary {
    width: 100vw;
    padding-bottom: 20px;
  }

  .main-content {
    margin: 0;
    width: 100vw;
    padding-right: 0;
  }
}

</style>
