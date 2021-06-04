<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Adresa dostave</th>
          <th scope="col">Dostavljac</th>
          <th scope="col">Stanje</th>
          <th scope="col">Datum porudzbine</th>
          <th scope="col">Stavke</th>
        </tr>
      </thead>
      <tbody v-for="order in customerOrders" :key="order.id">
        <tr class="table-row">
          <td>{{ order.user.address }}</td>
          <td>{{ order.deliverer.companyName }}</td>
          <td>{{ order.state }}</td>
          <td>
            {{ order.orderDate }}
          </td>
          <td>
            <button
              class="btn btn-primary"
              @click="showOrderItems(order.orderItems)"
            >
              Prikazi stavke
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Modal v-model="showOrderItemsModal" modalClass="modal-wrapper">
      <OrderItems v-bind:itemsToDisplay="itemsToDisplay" />
    </Modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import OrderItems from "./OrderItems";

export default {
  data() {
    return {
      itemsToDisplay: [],
      showOrderItemsModal: false,
      user: this.$store.state.user
    };
  },
  methods: {
    showOrderItems(orderItems) {
      this.itemsToDisplay = [];
      orderItems.forEach(item => {
        this.itemsToDisplay.push(item);
      });
      if (this.itemsToDisplay.length !== 0) this.showOrderItemsModal = true;
      else alert("Porudzbina nema nijednu stavku");
    }
  },
  components: {
    OrderItems
  },
  computed: {
    ...mapState(["customerOrders"])
  },
  mounted() {
    this.$store.dispatch("getAllOrdersForCustomer");
  }
};
</script>

<style scoped>
.table-row:hover {
  cursor: pointer;
}
.items-row {
  background: lightblue;
}
.text {
  font-size: 20px;
  margin-bottom: 0px;
}
.modal-title {
  text-align: center;
  margin-bottom: 5px;
  font-weight: bold;
}
.modal-content {
  border: none !important;
  padding: 10x 0;
}
.modal-input {
  padding: 5px;
  margin-bottom: 15px;
}
.table {
  width: 80%;
  margin-left: 10%;
  background: white;
}
.modal-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
