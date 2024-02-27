import { RouteRecordRaw } from 'vue-router';
import DemoPage from '../layouts/DemoPage.vue';

const routes: RouteRecordRaw[] = [
  {
    name: 'main-demo-page',
    path: '/demo',
    component: DemoPage,
  },
];

export default routes;
