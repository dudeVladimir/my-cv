import { RouteRecordRaw } from 'vue-router';
import HomePage from '../layouts/HomePage.vue';

const routes: RouteRecordRaw[] = [
  {
    name: 'main-home-page',
    path: '/',
    component: HomePage,
  },
];

export default routes;
