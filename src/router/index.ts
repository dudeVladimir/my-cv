import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import DemoPage from '../views/DemoPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: 'home-page',
    path: '/home',
    component: HomePage,
  },
  {
    name: 'demo',
    path: '/demo',
    component: DemoPage,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
});
