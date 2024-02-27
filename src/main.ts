import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { connectThemes } from './helpers';
import './styles/style.scss';
import App from './App.vue';
import router from './router';
import { isThemeName } from './ui-config/types';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.mount('#app');

// Подключение темы, если была выбрана другая
const currentTheme = localStorage.getItem('themeName');
if (currentTheme && isThemeName(currentTheme)) {
  connectThemes(document.documentElement, currentTheme);
}
