<template>
  <div class="demo">
    <div class="demo__header header-xl-3">
      demo page
      <router-link :to="{ name: 'main-home-page' }">home</router-link>
    </div>
    <div class="section">
      <div class="section__header header-l-2">Кнопка:</div>
      <div class="section__body grid-ui-kit buttons-variant">
        <UiButton>Дефолтная кнопка</UiButton>
        <UiButton disabled>Дизэйблед кнопка</UiButton>
        <UiButton variant="primary">Primary button</UiButton>
      </div>
    </div>

    <div class="v-divider my-8" />

    <div class="section">
      <div class="section__header header-l-2">Thin кнопка:</div>
      <div class="section__body grid-ui-kit thin-buttons-variant">
        <UiThinButton>Дефолтная кнопка</UiThinButton>
        <UiThinButton disabled>Дизэйблед кнопка</UiThinButton>
        <UiThinButton variant="primary">Primary button</UiThinButton>
      </div>
    </div>

    <div class="v-divider my-8" />

    <div class="section">
      <div class="section__header header-l-2">Кнопка-иконка:</div>
      <div class="section__body grid-ui-kit buttons-icon-variant"></div>
    </div>

    <div class="v-divider my-8" />

    <div class="section">
      <div class="section__header header-l-2">Темы:</div>
      <ul class="section__body grid-ui-kit theme-buttons">
        <li v-for="(item, key) in uiConfig.themes" :key="key">
          <UiButton @click="themeHandler(item.name)">
            {{ item.description }}
          </UiButton>
        </li>
      </ul>
    </div>

    <div class="v-divider my-8" />

    <div class="section">
      <div class="section__header header-l-2">Стили текста:</div>
      <ul class="section__body font-list">
        <li
          v-for="className in fontClasses"
          :key="className"
          class="font-list__item"
          :class="className"
        >
          {{ className }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import uiConfig from '@/ui-config';
import { useCoreStore } from '@/store';
import { ThemeName } from '@/ui-config/types';

const fontClasses = [
  'text-xs-1',
  'text-xs-2',
  'text-xs-3',
  'text-s-1',
  'text-s-2',
  'text-s-3',
  'text-m-1',
  'text-m-2',
  'text-m-3',
  'text-l-1',
  'text-l-2',
  'text-l-3',
  'header-m-1',
  'header-m-2',
  'header-m-3',
  'header-l-1',
  'header-l-2',
  'header-l-3',
  'header-xl-1',
  'header-xl-2',
  'header-xl-3',
];

const core = useCoreStore();

const themeHandler = (name: ThemeName) => {
  core.changeTheme(name);
};
</script>

<style lang="scss" scoped>
.demo {
  max-width: 900px;
  margin: 0 auto;
  &__header {
    margin: 20px auto;
    width: fit-content;
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
      &.buttons-variant {
        grid-template-columns: 1fr 1fr;
      }
      &.thin-buttons-variant {
        justify-items: center;
        grid-template-columns: 1fr 1fr 1fr;
      }
      &.buttons-icon-variant {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
      }
      &.theme-buttons {
        display: flex;
        justify-content: space-around;
      }
      &.font-list {
        width: fit-content;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 12px;
      }
    }
  }
}
</style>
