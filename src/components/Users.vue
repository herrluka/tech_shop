<template>
  <div class="text-center my-3">  
    <b-table
      :items="users"
      :fields="fields"
      class="table"
      head-variant="light"
    >
      <template #cell(actions)="row">
        <svg
          @click="openUpdateDialog(row.item)"
          style="cursor: pointer"
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
        <svg
          @click="openDeleteDialog(row.item)"
          style="cursor: pointer"
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
      </template>
    </b-table>
    <div>
      <Modal modalClass="modal-wrapper" v-model="showDeleteModal">
        <h4 class="modal-title">
          Brisanje kupca:
          {{ itemForDelete.name + " " + itemForDelete.last_name }}
        </h4>
        <div class="delete-action-buttons">
          <button
            class="btn btn-danger"
            @click="confirmDelete(itemForDelete.id)"
          >
            Obriši
          </button>
          <button @click="closeDeleteDialog" class="btn btn-primary">
            Odustani
          </button>
        </div>
      </Modal>
      <Modal v-model="showUpdateModal" modalClass="modal-wrapper modal-info">
        <h3 class="modal-title">Ažuriranje resursa</h3>
        <div class="modal-content">
          <p class="text">Ime</p>
          <input
            class="modal-input"
            type="text"
            :maxlength="25"
            v-model.lazy="itemForUpdate.name"
          />
          <p class="text">Prezime</p>
          <input
            class="modal-input"
            type="text"
            :maxlength="25"
            v-model.lazy="itemForUpdate.surname"
          />
          <p class="text">Adresa</p>
          <input
            class="modal-input"
            type="text"
            :maxlength="25"
            v-model.lazy="itemForUpdate.address"
          />
           <p class="text">Telefon</p>
          <input
            class="modal-input"
            type="text"
            :maxlength="25"
            v-model.lazy="itemForUpdate.phoneNumber"
          />
        
          <p class="text">Uloga</p>
          <!-- <input
            class="modal-input"
            type="text"
            :maxlength="25"
            v-model.lazy="itemForUpdate.role"
          /> -->
        <select v-model="itemForUpdate.role" class="w-100 my-3 p-1">
          <option value="customer">Customer</option>
          <option value="employee">Employee</option>
        </select>
        </div>
        <div class="delete-action-buttons">
          <button class="btn btn-primary" @click="confirmUpdate()">
            Ažuriraj
          </button>
          <button class="btn btn-danger" @click="closeUpdateDialog()">
            Odustani
          </button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      itemForDelete: {},
      itemForUpdate: {},
      showDeleteModal: false,
      showUpdateModal: false,
      copyOfItemForUpdate: {},
      fields: [
        {
          key: "name",
          label: "Ime",
          sortable: true,
        },
        {
          key: "surname",
          label: "Prezime",
          sortable: true,
        },
        {
          key: "email",
          label: " Email",
          sortable: true,
        },
         {
          key: "role",
          label: " Uloga",
          sortable: true,
        },
        {
          key: "address",
          label: "Adresa",
        },
         {
          key: "phoneNumber",
          label: "Telefon",
        },
        {
          key: "actions",
          label: "",
        },
      ],
    };
  },
  methods: {
    openDeleteDialog(deliverer) {
      this.itemForDelete = deliverer;
      this.showDeleteModal = true;
    },
    openUpdateDialog(deliverer) {
      this.itemForUpdate = deliverer;
      this.copyOfItemForUpdate = Object.assign({}, deliverer); //target i source objekat
      this.showUpdateModal = true;
    },
    closeDeleteDialog() {
      this.showDeleteModal = false;
    },
    closeUpdateDialog() {
      this.showUpdateModal = false;
      Object.assign(this.itemForUpdate, this.copyOfItemForUpdate);
    },
    confirmDelete(id) {
      this.$store.dispatch("deleteUser", id);
       const newUsers = this.users.filter(user => {
          return user.id !== id;
        });
      this.$store.commit('setUsers', newUsers);
      this.closeDeleteDialog()
    },
  
    confirmUpdate() {
      this.$store.dispatch("updateUser", this.itemForUpdate);
      this.showUpdateModal = false;
    },
   },
  computed: {
    ...mapState(["users"]),
  },
  mounted() {
    this.$store.dispatch("getAllUsers");
  },
};
</script>
<style scoped>
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
  width: 70%;
  margin-left: 15%;
  background: white;
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
</style>
