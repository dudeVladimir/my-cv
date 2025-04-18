<template>
  <header class="the-header">
    <div class="the-header__left">
      <div class="header-m-3">
        dude.vladimir CV
      </div>
    </div>
    <div class="the-header__center" />
    <div class="the-header__right">
      <div
        v-if="isDev"
        class="dev-container"
      />
      <RouterLink :to="{ name: 'main-demo-page' }">
        demo
      </RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { isDev } from '_helpers/index';
</script>

<style lang="scss" scoped>
.the-header {
  background: var(--th_primary_background);
  padding: 20px;
}
</style>
