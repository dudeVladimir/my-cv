import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'main-home-page',
    path: '/',
    component: () => import('../layouts/HomePage.vue'),
  },
];

export default routes;
