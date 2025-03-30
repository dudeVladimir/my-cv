<template>
  <div class="demo-page">
    <div class="demo-page__header header-xl-3">
      demo page
    </div>

    <ul class="demo-links mt-4">
      <li
        v-for="(link, idx) in linkList"
        :key="idx"
        class="demo-links__item"
      >
        <RouterLink :to="{ name: link.name }">
          {{ link.name }}
        </RouterLink>
      </li>
    </ul>

    <div class="v-divider my-4" />

    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import routes from './router';

const linkList = [...(routes[0].children as Array<{ name: string }>), { name: 'main-home-page' }];
</script>

<style lang="scss">
.demo-page {
  max-width: 900px;
  margin: 0 auto;
  &__header {
    margin: 20px auto;
    width: fit-content;
  }

  .demo-links {
    display: flex;
    gap: 12px;
    justify-content: space-between;
    // &__item
  }

  .section {
    &__header {
      text-transform: uppercase;
      text-align: center;
      margin-bottom: 16px;
    }
    &__body {
      &.grid-ui-kit {
        display: grid;
        gap: 12px;
      }
    }
  }
}
</style>
