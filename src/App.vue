<template>
  <div class="app-main">
    <header class="app-main__header">
      some header
    </header>
    <section class="app-main__content">
      <RouterView />
    </section>
    <footer class="app-main__footer">
      some footer
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.app-main {
  height: 100%;
  display: flex;
  flex-direction: column;
  &__header,
  &__footer {
    flex: 0 0 auto;
  }
  &__content {
    flex: 0 1 100%;
  }
}
</style>