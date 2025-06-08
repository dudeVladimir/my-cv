import uiConfig from '@/ui-config';
import { setCSSVars } from '_helpers/theme';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ThemeName } from '../ui-config/types';

export const useCoreStore = defineStore('_core', () => {
  const selectedTheme = ref<ThemeName>(uiConfig.themes.default_light.name);

  function changeTheme(themeName: ThemeName): void {
    selectedTheme.value = themeName;
    const colors = uiConfig.themes[selectedTheme.value].colors;
    setCSSVars(colors, document.documentElement);
  };

  function initApp(): void {
    const isDarkThemePrefer = window.matchMedia(
      '(prefers-color-scheme: dark)',
    )?.matches;
    const defaultThemeName = isDarkThemePrefer
      ? 'default_dark'
      : 'default_light';
    changeTheme(defaultThemeName);
  };

  return {
    selectedTheme,

    changeTheme,
    initApp,
  }
});
