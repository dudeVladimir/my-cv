<template>
  <header class="the-header">
    <div class="the-header__left">
      <div class="header-m-3">dude.vladimir CV</div>
    </div>
    <div class="the-header__center"></div>
    <div class="the-header__right">
      <div v-if="isDev" class="dev-container"></div>
      <router-link :to="{ name: 'main-demo-page' }">demo</router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { isDev } from '@/helpers';
</script>

<style lang="scss" scoped>
.the-header {
  background: var(--th_primary_background);
  padding: 20px;
}
</style>
