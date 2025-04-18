<template>
  <div class="main-content">
    <div class="main-content__body">
      <RouterView />
    </div>
    <footer class="main-content__footer">
      some footer
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.main-content {
  background: var(--th_secondary_background);
  display: flex;
  flex-direction: column;
  &__body {
    flex: 0 1 100%;
  }
  &__footer {
    flex: 0 0 auto;
  }
}
</style>
