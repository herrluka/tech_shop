import { firebase } from "@firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCgAJEGmDhCTUBz6HIGuctuGYWHhuKuqI",
  authDomain: "tech-shop-4b111.firebaseapp.com",
  projectId: "tech-shop-4b111",
  storageBucket: "tech-shop-4b111.appspot.com",
  messagingSenderId: "292544968953",
  appId: "1:292544968953:web:2febd9d3c01a33e8970a28"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage().ref();
const auth = firebase.auth();
const ordersCollection = db.collection("orders");
const usersCollection = db.collection("users");
const deliverersCollection = db.collection("deliverers");
const customersCollection = db.collection("customers");
const productsCollection = db.collection("products");
const productTypeCollection = db.collection("productType");

export {
  db,
  storage,
  auth,
  usersCollection,
  deliverersCollection,
  customersCollection,
  ordersCollection,
  productsCollection,
  productTypeCollection
};
