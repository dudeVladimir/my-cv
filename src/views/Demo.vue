<template>
	<div class="demo">
		<div class="title">
			demo page
			<router-link to="home">home</router-link>
		</div>
		<ul class="theme-buttons">
			<li v-for="(item, key) in uiConfig.themes" :key="key">
				<button @click="themeHandler(item.name)">{{ item.description }}</button>
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
import uiConfig from '../../public/ui-config';
import { useCoreStore } from '../store';

const core = useCoreStore();

const themeHandler = (name: string) => {
	core.changeTheme(name);
}
</script>

<style lang="scss" scoped>
.demo {
	.title {
		margin: 0 auto;
		width: fit-content;
	}
	.theme-buttons {
		display: flex;
		justify-content: space-around;
	}
}
</style>