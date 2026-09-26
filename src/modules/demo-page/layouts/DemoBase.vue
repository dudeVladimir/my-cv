<template>
  <div class="demo-base">
    <div class="section">
      <div class="section__header header-l-2">
        Темы:
      </div>
      <ul class="section__body grid-ui-kit theme-buttons">
        <li>
          <UiButton
            :variant="isSystemTheme ? 'primary' : 'default'"
            @click="followSystemTheme"
          >
            Как в системе
          </UiButton>
        </li>
        <li
          v-for="(item, key) in uiConfig.themes"
          :key="key"
        >
          <UiButton
            :variant="!isSystemTheme && selectedTheme === item.name ? 'primary' : 'default'"
            @click="themeHandler(item.name)"
          >
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
          class="color-list__item text-s-2"
        >
          <span
            class="color-list__swatch"
            :class="`${colorName}--background`"
          />
          {{ colorName }}
        </li>
      </ul>
    </div>

    <div class="v-divider my-8" />

    <div class="section">
      <div class="section__header header-l-2">
        Иконки:
      </div>
      <ul class="section__body icon-list">
        <li
          v-for="name in iconNames"
          :key="name"
          class="icon-list__item text-xs-2"
        >
          <UiIcon
            :name="name"
            class="icon-list__icon"
          />
          {{ name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemesStore } from '@/store/themes';
import uiConfig from '@/ui-config';
import { icons, type IconName } from '@/ui-config/icons';
import { ThemeName } from '@/ui-config/types';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

// Повторяет матрицу из src/styles/fonts.scss
const fontWeights = [1, 2, 3, 4];
const fontSizes = {
  text: ['xs', 's', 'm', 'l'],
  header: ['s', 'm', 'l', 'xl'],
};
const fontClasses = Object.entries(fontSizes).flatMap(([prefix, sizes]) => (
  sizes.flatMap((size) => fontWeights.map((weight) => `${prefix}-${size}-${weight}`))
));

const iconNames = Object.keys(icons) as IconName[];

const themesStore = useThemesStore();
const { changeTheme, followSystemTheme } = themesStore;
const { selectedTheme, isSystemTheme } = storeToRefs(themesStore);

const colors = computed(() => uiConfig.themes[selectedTheme.value].colors);

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
        grid-template-columns: repeat(4, auto);
        align-items: baseline;
        gap: 12px 24px;
      }
      &.color-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 12px;

        .color-list__item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .color-list__swatch {
          flex: 0 0 auto;
          width: 24px;
          height: 24px;
          border-radius: 6px;
          border: 1px solid var(--th_border_strong);
        }
      }
      &.icon-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
        gap: 12px;

        .icon-list__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 12px 8px;
          border: 1px solid var(--th_border);
          border-radius: 8px;
          color: var(--th_text_muted);
        }
        .icon-list__icon {
          width: 24px;
          height: 24px;
          color: var(--th_text);
        }
      }
    }
  }
}
</style>
