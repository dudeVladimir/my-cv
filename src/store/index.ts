import { defineStore } from 'pinia';
import uiConfig from '@/ui-config';
import { setCSSVars } from '../helpers';
import { ThemeName } from '../ui-config/types/index';

type State = {
  selectedTheme: ThemeName;
};

export const useCoreStore = defineStore('_core', {
  state: (): State => ({
    selectedTheme: uiConfig.themes.default_light.name,
  }),
  actions: {
    changeTheme(themeName: ThemeName): void {
      this.selectedTheme = themeName;
      const colors = uiConfig.themes[this.selectedTheme].colors;
      setCSSVars(colors, document.documentElement);
    },
    initApp(): void {
      const isDarkThemePrefer = window.matchMedia(
        '(prefers-color-scheme: dark)',
      )?.matches;
      const defaultThemeName = isDarkThemePrefer
        ? 'default_dark'
        : 'default_light';
      this.changeTheme(defaultThemeName);
    },
  },
});
