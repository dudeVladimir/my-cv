<template>
  <div class="section">
    <div class="section__header header-l-2">
      Fields:
    </div>
    <div class="section__body grid-ui-kit field-items">
      <UiTextField v-model="testTextValue" />
      <UiTextField
        v-model="testTextValue"
        label="default"
      />
      <UiTextField
        v-model="testTextValue"
        label="disabled"
        disabled
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const testTextValue = ref('');
</script>

<!-- <style lang="scss" scoped>
.demo-fields {
  .section {
    &__body {
      &.field-items {}
    }
  }
}
</style> -->
