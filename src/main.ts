import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { connectThemes } from './helpers';
import './styles/style.scss';
import App from './App.vue';
import { isThemeName } from './ui-config/types';
import { findModuleList, findUiComponents } from './modules/helpers';
import { ConfigObject } from './modules/types';
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const app = createApp(App);
const pinia = createPinia();

const moduleList: ConfigObject[] = findModuleList();

// =======================
// Регистрация всех роутов

const routes: RouteRecordRaw[] = [];

moduleList.forEach((module) => {
  if (Array.isArray(module.routes) && module.routes.length) {
    routes.push(...module.routes);
  }
});

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
});

app.use(router);

// =======================

app.use(pinia);
app.mount('#app');

// =======================
// Объявление глобальных компонентов

const uiComponents = findUiComponents();

uiComponents.forEach((uiElement) => {
  const { name, component } = uiElement;
  app.component(name, component);
});

// =======================

// =======================
// Подключение темы, если была выбрана другая

const currentTheme = localStorage.getItem('themeName');
if (currentTheme && isThemeName(currentTheme)) {
  connectThemes(document.documentElement, currentTheme);
}

// =======================
