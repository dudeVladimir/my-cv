import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import Demo from '../views/Demo.vue';

const routes = [
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
		component: Demo,
	},
];

export default createRouter({
	history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
});