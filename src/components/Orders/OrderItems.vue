<template>
  <div>
    <table class="table table-bordered">
      <th colspan="6" class="header">Stavke</th>
      <tr>
        <td>Proizvod</td>
        <td>Ime Proizvoda</td>
        <td>Cena</td>
        <td>Kolicina</td>
      </tr>
      <tr v-for="item in itemsToDisplay" :key="item.productId">
        <td><img width="75" height="75" :src="item.imageUrl" /></td>
        <td>{{ item.productName }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.quantity }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "OrderItems",
  props: ["itemsToDisplay"]
};
</script>

<style scoped>
.header,
tr {
  text-align: center;
}
</style>
