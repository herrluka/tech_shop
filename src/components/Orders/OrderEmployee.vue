<template>
  <div>
    <table class="table">
      <thead>
        <tr class="table-header">
          <th scope="col">Ime korisnika</th>
          <th scope="col">Broj telefona korisnika</th>
          <th scope="col">Adresa dostave</th>
          <th scope="col">Dostavljac</th>
          <th scope="col">Stanje</th>
          <th scope="col">Datum porudzbine</th>
          <th scope="col">Operacije</th>
          <th scope="col"></th>
          <th scope="col">Stavke</th>
        </tr>
      </thead>
      <tbody v-for="order in orders" :key="order.id">
        <tr class="table-row">
          <td>
            {{ order.user.name + " " + order.user.surname }}
          </td>
          <td>{{ order.user.phoneNumber }}</td>
          <td>{{ order.user.address }}</td>
          <td>{{ order.deliverer.companyName }}</td>
          <td>{{ order.state }}</td>
          <td>
            {{ order.orderDate }}
          </td>
          <td colspan="2">
            <!-- Modifikacija -->
            <svg
              @click="onUpdate(order)"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
            <!-- Brisanje -->
            <svg
              @click="onDelete(order)"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
              />
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
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
    <Modal v-model="showDeleteModal" modalClass="modal-wrapper">
      <h3 class="add__modal-title">Brisem porudzbinu:</h3>
      <div class="delete-action-buttons">
        <button
          class="btn btn-primary"
          @click="confirmDelete(itemForDelete.id)"
        >
          Potvrdi
        </button>
        <button class="btn btn-danger" @click="closeDeleteModal">
          Odustani
        </button>
      </div>
    </Modal>
    <Modal v-model="showOrderItemsModal" modalClass="modal-wrapper">
      <OrderItems v-bind:itemsToDisplay="itemsToDisplay" />
    </Modal>
    <Modal v-model="showUpdateModal" modalClass="modal-wrapper">
      <h3 class="add__modal-title">Izmena porudzbine:</h3>
      <form @submit.prevent="confirmUpdate">
        <div class="modal-content">
          <p>Izaberi korisnika:</p>
          <select v-model="itemForUpdate.user.id" class="form-control" required>
            <option v-for="user in users" :key="user.id" :value="user.id">{{
              user.email
            }}</option>
          </select>
          <p>Izaberi dostavljaca:</p>
          <select
            v-model="itemForUpdate.deliverer"
            class="form-control"
            required
          >
            <option
              v-for="deliverer in deliverers"
              :key="deliverer.id"
              :value="deliverer"
              >{{ deliverer.companyName }}</option
            >
          </select>
          <p>Izaberi datum porudzbine:</p>
          <input type="date" v-model="itemForUpdate.orderDate" required />
          <p>Izaberi stanje porudzbine:</p>
          <select v-model="itemForUpdate.state" class="form-control" required>
            <option value="novo">Novo</option>
            <option value="isporuceno">Isporuceno</option>
          </select>
        </div>
        <div class="delete-action-buttons">
          <button class="btn btn-primary" type="submit">
            Potvrdi
          </button>
          <button
            class="btn btn-danger"
            type="button"
            @click="closeUpdateModal"
          >
            Odustani
          </button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import OrderItems from "./OrderItems";
import moment from "moment";
import Datepicker from "vuejs-datepicker";

export default {
  data() {
    return {
      itemForDelete: {},
      itemsToDisplay: [],
      itemForUpdate: {
        user: {
          id: "placeholderSoItDoesntCrash"
        }
      },
      copyOfItemForUpdate: {},
      showDeleteModal: false,
      showOrderItemsModal: false,
      showUpdateModal: false
    };
  },
  methods: {
    toggleItems(id) {
      alert(id);
    },
    onDelete(order) {
      this.itemForDelete = order;
      this.showDeleteModal = true;
    },
    confirmDelete(id) {
      this.$store.dispatch("deleteOrder", id);
      this.closeDeleteModal();
      this.$store.dispatch("getAllOrders");
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
    },
    confirmUpdate() {
      let user = this.users.find(x => x.id === this.itemForUpdate.user.id);
      this.itemForUpdate.user = user;

      this.$store.dispatch("updateOrder", this.itemForUpdate);
      this.showUpdateModal = false;
      this.$store.dispatch("getAllOrders");
      alert("Uspesno azurirano");
    },
    onUpdate(order) {
      this.itemForUpdate = order;
      this.showUpdateModal = true;
      this.copyOfItemForUpdate = Object.assign({}, order);
    },
    closeUpdateModal() {
      Object.assign(this.itemForUpdate, this.copyOfItemForUpdate);
      this.showUpdateModal = false;
    },
    showOrderItems(orderItems) {
      this.itemsToDisplay = [];
      orderItems.forEach(item => {
        this.itemsToDisplay.push(item);
      });
      if (this.itemsToDisplay.length !== 0) this.showOrderItemsModal = true;
      else alert("Porudzbina nema nijednu stavku");
    },
    format_date(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    }
  },
  components: {
    OrderItems,
    Datepicker
  },
  computed: {
    ...mapState(["orders", "users", "deliverers"])
  },
  mounted() {
    this.$store.dispatch("getAllOrders");
    this.$store.dispatch("getAllUsers");
    this.$store.dispatch("getAllDeliverers");
  }
};
</script>

<style scoped>
.table-header {
  background: #e9ecef;
}
.table-row:hover {
  cursor: pointer;
}
.items-row {
  background: #e9ecef;
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
  margin-top: 1%;
}

.add-button {
  width: 20%;
  border-radius: 6px;
  background: white;
  background-color: limegreen;
  color: white;
}
.modal-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.delete-action-buttons {
  align-self: center;
  text-align: center;
  padding: 20px 0;
}
.add__modal-title {
  padding: 20px 10px;
  text-align: center;
  text-decoration: underline;
  font-size: 30px;
  font-weight: bolder;
  color: "#e9a358";
}
</style>
