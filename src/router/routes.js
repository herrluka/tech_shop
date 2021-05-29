import Home from '../components/Home';
import PageNotFound from "../components/PageNotFound";
import Login from "../components/Login";
import Register from "../components/Register";
import Deliverer from '../components/Deliverer'
import Customer from '..//components/Customer'

const routes = [
  { path: "/deliverers", component: Deliverer },
  { path: "/customers", component: Customer },
  { path: '/register', component: Register},
  { path: '/login', component: Login},
  { path: '/', component: Home},
  { path: "*", component: PageNotFound },
];

export default routes;
