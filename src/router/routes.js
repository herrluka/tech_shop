import Home from '../components/Home';
import PageNotFound from "../components/PageNotFound";
import Login from "../components/Login";
import Register from "../components/Register";
import Cart from "../components/Cart";

const routes = [
  { path: '/cart', component: Cart},
  { path: '/register', component: Register},
  { path: '/login', component: Login},
  { path: '/', component: Home},
  { path: "*", component: PageNotFound }
];

export default routes;
