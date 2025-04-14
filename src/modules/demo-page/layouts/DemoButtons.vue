<template>
  <div class="demo-buttons">
    <div class="section">
      <div class="section__header header-l-2">
        Кнопка:
      </div>
      <div class="section__body grid-ui-kit buttons-variant">
        <UiButton>Дефолтная кнопка</UiButton>
        <UiButton disabled>
          Дизэйблед кнопка
        </UiButton>
        <UiButton variant="primary">
          Primary button
        </UiButton>
      </div>
    </div>

    <div class="section mt-8">
      <div class="section__header header-l-2">
        Thin-кнопка:
      </div>
      <div class="section__body grid-ui-kit thin-buttons-variant">
        <UiThinButton>Дефолтная кнопка</UiThinButton>
        <UiThinButton disabled>
          Дизэйблед кнопка
        </UiThinButton>
        <UiThinButton variant="primary">
          Primary button
        </UiThinButton>
      </div>
    </div>

    <div class="section mt-8">
      <div class="section__header header-l-2">
        Радио-кнопка:
      </div>
      <div class="section__body grid-ui-kit radio-buttons-variant">
        <UiRadioGroup
          v-model="radioValue"
          :items="items"
        />
        <UiRadioGroup
          v-model="radioValue"
          :items="[...items, ...items, ...items, ...items]"
        />
        <UiRadioGroup
          v-model="radioValue"
          :items="items"
          disabled
        />
      </div>
    </div>

    <div class="section mt-8">
      <div class="section__header header-l-2">
        Кнопка-иконка:
      </div>
      <div class="section__body grid-ui-kit buttons-icon-variant" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const items = [
  'some-text-1',
  'some text 2',
  'Some_Text_3',
];

const radioValue = ref<string>();
</script>

<style lang="scss" scoped>
.demo-buttons {
  .section {
    &__body {
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
    }
  }
}
</style>
