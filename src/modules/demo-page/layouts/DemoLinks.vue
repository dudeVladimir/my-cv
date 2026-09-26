<template>
  <div class="demo-links-page">
    <div class="section">
      <div class="section__header header-l-2">
        inline:
      </div>
      <div class="section__body grid-ui-kit">
        <p class="text-m-2">
          Текст абзаца со
          <UiLink :to="{ name: 'demo-buttons' }">
            ссылкой внутри приложения
          </UiLink>
          и
          <UiLink
            href="https://example.com"
            new-tab
          >
            внешней ссылкой
          </UiLink>. Длинная ссылка переносится как обычный текст:
          <UiLink
            href="https://example.com"
            new-tab
          >
            очень длинный текст ссылки, который не помещается в одну строку
          </UiLink>.
        </p>
        <p class="text-s-2 th_text_muted--text">
          Мелкий текст:
          <UiLink :to="{ name: 'demo-buttons' }">
            ссылка
          </UiLink>
          берёт размер у абзаца.
        </p>
      </div>
    </div>

    <div class="section mt-8">
      <div class="section__header header-l-2">
        subtle:
      </div>
      <div class="section__body grid-ui-kit">
        <div class="demo-links-page__row text-s-2">
          <UiLink
            :to="{ name: 'demo-buttons' }"
            variant="subtle"
          >
            Ссылка
          </UiLink>
          <UiLink
            href="https://example.com"
            variant="subtle"
            new-tab
          >
            Внешняя ссылка
          </UiLink>
        </div>
      </div>
    </div>

    <div class="section mt-8">
      <div class="section__header header-l-2">
        nav:
      </div>
      <div class="section__body grid-ui-kit">
        <nav class="demo-links-page__row">
          <UiLink
            :to="{ name: 'demo-links' }"
            variant="nav"
          >
            Текущая страница
          </UiLink>
          <UiLink
            :to="{ name: 'main-demo-page' }"
            variant="nav"
          >
            Родительский роут
          </UiLink>
          <UiLink
            :to="{ name: 'demo-buttons' }"
            variant="nav"
          >
            Другая страница
          </UiLink>
        </nav>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo-links-page {
  &__row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
  }
}
</style>
