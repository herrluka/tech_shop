<template>
  <div>
    <table class="table">
      <th colspan="6" class="header table-primary">Stavke</th>
      <tr>
        <td>Proizvod</td>
        <td>Ime Proizvoda</td>
        <td>Cena</td>
        <td>Kolicina</td>
        <td>Ukupna cena</td>
      </tr>
      <tr v-for="item in itemsToDisplay" :key="item.productId">
        <td><img width="75" height="75" :src="item.imageUrl" /></td>
        <td>{{ item.productName }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.quantity }}</td>
        <td>{{ item.price * item.quantity }}</td>
      </tr>
      <tr>
        <td colspan="4">Ukupna cena svih proizvoda:</td>
        <td>
          <b>
            {{ this.sumOfPrice }}
          </b>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "OrderItems",
  props: ["itemsToDisplay"],
  data() {
    return {
      sumOfPrice: 0
    };
  },
  mounted() {
    this.sumOfPrice = 0;
    this.itemsToDisplay.forEach(item => {
      this.sumOfPrice += item.price * item.quantity;
    });
  }
};
</script>

<style scoped>
.header {
  text-align: center;
}
tr {
  text-align: center;
}
</style>
