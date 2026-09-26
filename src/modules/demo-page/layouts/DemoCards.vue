<template>
  <div class="demo-cards">
    <div class="section">
      <div class="section__header header-l-2">
        Варианты:
      </div>
      <div class="section__body grid-ui-kit columns">
        <UiCard
          v-for="variant in variants"
          :key="variant"
          :variant="variant"
          :title="variant"
          subtitle="Подзаголовок"
        >
          Текст карточки.
        </UiCard>
        <UiCard
          title="accent"
          subtitle="Подзаголовок"
          accent
        >
          Текст карточки.
        </UiCard>
      </div>
    </div>

    <div class="section mt-8">
      <div class="section__header header-l-2">
        Размеры:
      </div>
      <div class="section__body grid-ui-kit columns">
        <UiCard
          v-for="size in sizes"
          :key="size"
          :size="size"
          :title="`size ${size}`"
        >
          Текст карточки.
        </UiCard>
      </div>
    </div>

    <div class="section mt-8">
      <div class="section__header header-l-2">
        Слоты:
      </div>
      <div class="section__body grid-ui-kit columns">
        <UiCard
          title="Заголовок"
          subtitle="Подзаголовок"
        >
          <template #media>
            <div class="demo-cards__media" />
          </template>
          <template #header-append>
            header-append
          </template>
          Текст карточки.
          <template #footer>
            <UiTag>Тег</UiTag>
            <UiTag color="accent">
              Тег
            </UiTag>
          </template>
        </UiCard>
      </div>
    </div>

    <div class="section mt-8">
      <div class="section__header header-l-2">
        Кликабельные:
      </div>
      <div class="section__body grid-ui-kit columns">
        <UiCard
          title="clickable"
          clickable
          @click="clickCount++"
        >
          Нажата {{ clickCount }} раз.
          <template #footer>
            <UiLink
              href="https://example.com"
              variant="subtle"
              new-tab
            >
              Ссылка внутри
            </UiLink>
          </template>
        </UiCard>
        <UiCard
          :to="{ name: 'demo-buttons' }"
          title="to"
          subtitle="Ссылка внутри приложения"
        />
        <UiCard
          href="https://example.com"
          new-tab
          title="href + new-tab"
          subtitle="Внешняя ссылка"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const variants = ['outlined', 'filled', 'elevated'] as const;
const sizes = ['s', 'm', 'l'] as const;

const clickCount = ref(0);
</script>

<style lang="scss" scoped>
.demo-cards {
  .section__body.columns {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    align-items: start;
  }

  &__media {
    height: 120px;
    background: var(--th_surface_muted);
  }
}
</style>
