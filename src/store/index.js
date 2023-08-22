import { defineStore } from 'pinia';
import uiConfig from '../../public/ui-config'

export const useCoreStore = defineStore('_core', {
	state: () => ({
		selectedTheme: uiConfig.themes.default_light,
	}),
	actions: {
		changeTheme(themeName) {
			console.log(themeName);
		},
	},
})