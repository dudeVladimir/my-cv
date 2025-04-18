import { initMainElements } from '_helpers/modules';
import { connectThemes } from '_helpers/theme';
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

// =======================
// Подключение темы, если была выбрана другая

const currentTheme = localStorage.getItem('themeName');
if (currentTheme && isThemeName(currentTheme)) {
  connectThemes(document.documentElement, currentTheme);
}

// =======================

const app = createApp(App);
const pinia = createPinia();

console.time('loading');
console.log('load main elements');
initMainElements().then(({ modules, uiKit }) => {
  const routes: RouteRecordRaw[] = [];
  if (Array.isArray(modules?.routes)) {
    routes.push(...modules.routes);
  }

  const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'active-link active-link_exact',
  });

  app.use(router).use(pinia).mount('#app');

  if (Array.isArray(uiKit)) {
    uiKit.forEach((uiElement) => {
      const { name, component } = uiElement;
      app.component(name, component);
    });
  }

  console.timeEnd('loading');
});
