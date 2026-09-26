import { defineStore } from 'pinia';
import { useThemesStore } from './themes';

export const useCoreStore = defineStore('_core', () => {
  const themesStore = useThemesStore();
  const { initTheme } = themesStore;

  function initApp(): void {
    initTheme();
  };

  return {
    initApp,
  };
});
