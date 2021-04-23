import Home from '../components/Home';
import PageNotFound from "../components/PageNotFound";

const routes = [
  { path: '/', component: Home},
  { path: "*", component: PageNotFound }
];

export default routes;
