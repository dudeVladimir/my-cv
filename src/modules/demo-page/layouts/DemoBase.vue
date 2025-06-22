<template>
  <div class="demo-base">
    <div class="section">
      <div class="section__header header-l-2">
        Темы:
      </div>
      <ul class="section__body grid-ui-kit theme-buttons">
        <li
          v-for="(item, key) in uiConfig.themes"
          :key="key"
        >
          <UiButton @click="themeHandler(item.name)">
            {{ item.description }}
          </UiButton>
        </li>
      </ul>
    </div>

    <div class="v-divider my-8" />

    <div class="section">
      <div class="section__header header-l-2">
        Стили текста:
      </div>
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

    <div class="v-divider my-8" />

    <div class="section">
      <div class="section__header header-l-2">
        Цвета:
      </div>
      <ul class="section__body color-list">
        <li
          v-for="(_, colorName) in colors"
          :key="colorName"
          class="color-list__item text-m-3"
          :class="`${colorName}--text`"
        >
          {{ colorName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemesStore } from '@/store/themes';
import uiConfig from '@/ui-config';
import { ThemeName } from '@/ui-config/types';
import { storeToRefs } from 'pinia';

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

const themesStore = useThemesStore();
const { changeTheme } = themesStore;
const { selectedTheme } = storeToRefs(themesStore);

const colors = uiConfig.themes[selectedTheme.value].colors;

const themeHandler = (name: ThemeName) => {
  changeTheme(name);
};
</script>

<style lang="scss" scoped>
.demo-base {
  .section {
    &__body {
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
      &.color-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 12px;
      }
    }
  }
}
</style>
