<template>
  <div class="app-main">
    <TheHeader class="app-main__header" />
    <MainContent class="app-main__content" />
  </div>
</template>

<script lang="ts" setup>
import TheHeader from './components/TheHeader.vue';
import MainContent from './layouts/MainContent.vue';
import { useCoreStore } from './store';

const { initApp } = useCoreStore();

initApp();
</script>

<style lang="scss" scoped>
.app-main {
  height: 100%;
  display: flex;
  flex-direction: column;
  &__header {
    flex: 0 0 auto;
  }
  &__content {
    flex: 0 1 100%;
  }
}
</style>
