import Vue from 'vue'
import App from './App.vue'
import router from "./router/router";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {store} from "./vuex-store";


Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueMaterial);

library.add(faShoppingCart);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router: router,
  store,
  render: h => h(App)
});
