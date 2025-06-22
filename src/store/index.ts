import { defineStore } from "pinia";
import { useThemesStore } from "./themes";

export const useCoreStore = defineStore('_core', () => {
  const themesStore = useThemesStore();
  const { changeTheme } = themesStore;

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
    initApp,
  }
});
