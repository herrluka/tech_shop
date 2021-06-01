<template>
  <div style="min-height: calc(100vh - 45.88px)" class="bg-info">
    <div class="row p-0 m-0">
      <AddForm
        v-if="
          this.$store.state.user && this.$store.state.user.role == 'employee'
        "
        v-bind:images="imageList"
        v-bind:productTypes="productTypes"
        v-bind:changeImgHandler="showImage"
        v-bind:product="selectedProduct"
      />
      <div
        class="col-xl-6 col-lg-6 col-md-6 col-12 jumbotron m-0"
        v-if="
          this.$store.state.user && this.$store.state.user.role == 'employee'
        "
      >
        <input
          @change="previewImage"
          type="file"
          accept="image/"
          class="form-control m-2"
        />
        <img
          height="200px"
          width="200px"
          style="object-fit: contain; min-height: 200px"
          :src="picture"
        />
        <button @click="onUpload" class="btn btn-dark form-control m-2">
          Upload
        </button>
      </div>
    </div>
    <div class="row p-0 m-0">
      <Card
        v-for="product in products"
        v-bind:key="product.id"
        v-bind:product="product"
        v-bind:showDetails="showDetails"
      />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Card from "./Card/Card";
import AddForm from "./AddForm/AddForm";
import firebase from "firebase";
export default {
  name: "products",
  components: {
    Card: Card,
    AddForm: AddForm,
  },
  data() {
    return {
      imageData: null,
      picture: null,
      uploadedValue: 0,
      imageList: [],
      selectedProduct: {},
    };
  },
  methods: {
    showDetails(product) {
      this.selectedProduct = product;
      this.picture = `https://firebasestorage.googleapis.com/v0/b/tech-shop-4b111.appspot.com/o/productImages%2F${product.imageUrl}?alt=media`;
    },
    showImage(src) {
      this.picture = `https://firebasestorage.googleapis.com/v0/b/tech-shop-4b111.appspot.com/o/productImages%2F${src}?alt=media`;
    },
    previewImage(event) {
      this.uploadedValue = 0;
      this.picture = URL.createObjectURL(event.target.files[0]);
      this.imageData = event.target.files[0];
    },
    onUpload() {
      this.picture = null;
      const storageRef = firebase
        .storage()
        .ref(`productImages/${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        "state_changed",
        (snapshot) => {},
        (error) => console.log(`error`, error),
        () => {
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url;
            firebase
              .storage()
              .ref("/productImages")
              .listAll()
              .then(({ items }) => {
                this.imageList = items.map((img) => img.fullPath.split("/")[1]);
              });
            alert(`Uspesno upload-ovano`);
          });
        }
      );
    },
  },
  computed: {
    ...mapState(["products"]),
    products() {
      return this.$store.state.products;
    },
    productTypes() {
      return this.$store.state.productTypes;
    },
  },
  mounted() {
    this.$store.dispatch("getAllProducts");
    this.$store.dispatch("getAllProductTypes");
    firebase
      .storage()
      .ref("/productImages")
      .listAll()
      .then(({ items }) => {
        this.imageList = items.map((img) => img.fullPath.split("/")[1]);
      });
  },
};
</script>