import uiConfig from '@/ui-config';
import { setCSSVars } from '_helpers/theme';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ThemeName } from '../ui-config/types';

export const useThemesStore = defineStore('UI_themes', () => {
  const selectedTheme = ref<ThemeName>(uiConfig.themes.default_light.name);

  function changeTheme(themeName: ThemeName): void {
    selectedTheme.value = themeName;
    const colors = uiConfig.themes[selectedTheme.value].colors;
    setCSSVars(colors, document.documentElement);
  };

  return {
    selectedTheme,
    changeTheme,
  };
});
