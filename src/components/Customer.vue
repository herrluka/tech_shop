<template>
  <div class="text-center my-3">  
      <button @click="openAddDialog()" class="add-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-plus-square-dotted"
        viewBox="0 0 16 16"
      >
        <path
          d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834-1v1h.916v-1h-.916zm1.833 1h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
        />
      </svg>
      Dodaj kupca
    </button>
    <b-table
      :items="customers"
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
      <Modal v-model="showAddModal" modalClass="modal-wrapper">
        <h3 class="modal-title">Dodaj kupca</h3>
        <div class="modal-content">
          <p class="text">Ime</p>
          <input
            type="text"
            class="modal-input"
            placeholder="Unesite ime kupca"
            v-model="newCustomer.name"
          />
          <p class="text">Prezime</p>
          <input
            type="text"
            class="modal-input"
            placeholder="Unesite prezime kupca"
            v-model="newCustomer.last_name"
          />
          <p class="text">Kontakt</p>
          <input
            type="text"
            class="modal-input"
            placeholder="Unesite kontakt"
            name="desc"
            v-model="newCustomer.contact"
          />
          <p class="text">Adresa</p>
          <input
            type="text"
            class="modal-input"
            placeholder="Unesite adresu"
            v-model="newCustomer.address"
          />
        </div>
        <div class="delete-action-buttons">
          <button @click="confirmAdd(newCustomer)" class="btn btn-primary">
            Dodaj
          </button>
          <button class="btn btn-danger" @click="closeAddModal">
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
            v-model.lazy="itemForUpdate.last_name"
          />
          <p class="text">Kontakt</p>
          <input
            class="modal-input"
            type="text"
            :maxlength="25"
            v-model.lazy="itemForUpdate.contact"
          />
          <p class="text">Adresa</p>
          <input
            class="modal-input"
            type="text"
            :maxlength="25"
            v-model.lazy="itemForUpdate.address"
          />
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
      showAddModal: false,
      showDeleteModal: false,
      showUpdateModal: false,
      copyOfItemForUpdate: {},
      newCustomer: {
        name: "",
        last_name: "",
        address: "",
        contact: 0,
      },
      fields: [
        {
          key: "name",
          label: "Ime",
          sortable: true,
        },
        {
          key: "last_name",
          label: "Prezime",
          sortable: true,
        },
        {
          key: "address",
          label: " Adresa",
          sortable: true,
        },
        {
          key: "contact",
          label: " Kontakt",
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
    openAddDialog() {
      this.showAddModal = true;
    },
    closeDeleteDialog() {
      this.showDeleteModal = false;
    },
    closeUpdateDialog() {
      this.showUpdateModal = false;
      Object.assign(this.itemForUpdate, this.copyOfItemForUpdate);
    },
    confirmDelete(id) {
      this.$store.dispatch("deleteCustomer", id);
       const newCustomers = this.customers.filter(customer => {
          return customer.id !== id;
        });
      this.$store.commit('setCustomers', newCustomers);
      this.closeDeleteDialog()
    },
    closeAddModal() {
      this.showAddModal = false;
      this.newCustomer.name = "";
      (this.newCustomer.last_name = ""),
        (this.newCustomer.address = ""),
        (this.newCustomer.contact = 0);
    },
    confirmUpdate() {
      this.$store.dispatch("updateCustomer", this.itemForUpdate);
      this.showUpdateModal = false;
    },
    confirmAdd(customer) {
      const customerForInsert = {
        name: customer.name,
        last_name: customer.last_name,
        address: customer.address,
        contact: customer.contact,
      };
      this.$store.dispatch("insertCustomer", customerForInsert);
      this.$store.dispatch("getAllCustomers");
      this.showAddModal = false;
      this.newCustomer.name = "";
      (this.newCustomer.last_name = ""),
        (this.newCustomer.address = ""),
        (this.newCustomer.contact = 0);
    },
  },
  computed: {
    ...mapState(["customers"]),
  },
  mounted() {
    this.$store.dispatch("getAllCustomers");
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
  width: 60%;
  margin-left: 20%;
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
