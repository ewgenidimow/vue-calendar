import Home from '../components/views/Home';
import Calendar from "../components/views/Calendar";
import PageNotFound from "../components/views/PageNotFound";

export const routes = [
  { path: '', component: Home },
  { path: '/calendar', component: Calendar },
  { path: "*", component: PageNotFound }
];
