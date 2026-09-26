import uiConfig from '@/ui-config';
import {
  DARK_SCHEME_QUERY,
  getSavedThemeName,
  getSystemThemeName,
  setCSSVars,
  THEME_STORAGE_KEY,
} from '_helpers/theme';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ThemeName } from '../ui-config/types';

export const useThemesStore = defineStore('UI_themes', () => {
  const selectedTheme = ref<ThemeName>(uiConfig.themes.default_light.name);
  const isSystemTheme = ref(!getSavedThemeName());

  function changeTheme(themeName: ThemeName, { save = true } = {}): void {
    selectedTheme.value = themeName;
    const colors = uiConfig.themes[selectedTheme.value].colors;
    setCSSVars(colors, document.documentElement);

    if (save) {
      localStorage.setItem(THEME_STORAGE_KEY, themeName);
      isSystemTheme.value = false;
    }
  };

  function followSystemTheme(): void {
    localStorage.removeItem(THEME_STORAGE_KEY);
    isSystemTheme.value = true;
    changeTheme(getSystemThemeName(), { save: false });
  };

  function initTheme(): void {
    changeTheme(getSavedThemeName() ?? getSystemThemeName(), { save: false });

    window.matchMedia(DARK_SCHEME_QUERY).addEventListener('change', () => {
      if (isSystemTheme.value) {
        changeTheme(getSystemThemeName(), { save: false });
      }
    });
  };

  return {
    selectedTheme,
    isSystemTheme,
    changeTheme,
    followSystemTheme,
    initTheme,
  };
});
