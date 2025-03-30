import { initMainElements } from '@/helpers/modules';
import { connectThemes } from '@/helpers/theme';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';
import App from './App.vue';
import './styles/style.scss';
import { isThemeName } from './ui-config/types';

const app = createApp(App);
const pinia = createPinia();

console.time('loading');
console.log('load main elements');
const { modules, uiKit } = await initMainElements();
console.timeEnd('loading');

const routes: RouteRecordRaw[] = [];
if (Array.isArray(modules?.routes)) {
  routes.push(...modules.routes);
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
});

app.use(router).use(pinia).mount('#app');

if (Array.isArray(uiKit)) {
  uiKit.forEach((uiElement) => {
    const { name, component } = uiElement;
    app.component(name, component);
  });
}

// =======================
// Подключение темы, если была выбрана другая

const currentTheme = localStorage.getItem('themeName');
if (currentTheme && isThemeName(currentTheme)) {
  connectThemes(document.documentElement, currentTheme);
}

// =======================
