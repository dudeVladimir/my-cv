<template>
  <!-- eslint-disable vue/no-v-html -- разметка только из локальных svg-файлов -->
  <span
    class="ui-icon"
    :role="label ? 'img' : undefined"
    :aria-label="label || undefined"
    :aria-hidden="label ? undefined : 'true'"
    v-html="icons[name]"
  />
  <!-- eslint-enable vue/no-v-html -->
</template>

<script setup lang="ts">
import { icons, type IconName } from '@/ui-config/icons';

interface Props {
  name: IconName;
  /** Доступное имя. Не передано — иконка декоративная, скрыта от скринридеров */
  label?: string;
};

withDefaults(defineProps<Props>(), {
  label: '',
});
</script>

<style lang="scss" scoped>
// Размер по умолчанию — под текст; переопределяется классом снаружи
.ui-icon {
  display: inline-flex;
  flex: 0 0 auto;
  width: 1em;
  height: 1em;

  :deep(svg) {
    width: 100%;
    height: 100%;
  }
}
</style>
