import { defineStore } from 'pinia';
import uiConfig from '../../public/ui-config'
import { setCSSVars } from '../helpers';

export const useCoreStore = defineStore('_core', {
	state: () => ({
		selectedTheme: uiConfig.themes.default_light.name,
	}),
	actions: {
		changeTheme(themeName: string) {
			this.selectedTheme = themeName;
			const colors = uiConfig.themes[this.selectedTheme].colors;
			setCSSVars(colors, document.documentElement)
		},
		initApp() {
			const isDarkThemePrefer = window.matchMedia("(prefers-color-scheme: dark)")?.matches;
			const defaultThemeName = isDarkThemePrefer ? 'default_dark' : 'default_light';
			this.changeTheme(defaultThemeName);
		},
	},
})