<template>
  <div class="demo-fields">
    <div class="section">
      <div class="section__header header-l-2">
        Текстовое поле:
      </div>
      <div class="section__body grid-ui-kit field-items">
        <UiTextField v-model="textValue" />
        <UiTextField
          v-model="textValue"
          label="С меткой"
        />
        <UiTextField
          v-model="nameValue"
          label="Имя"
          placeholder="Иван Иванов"
          name="name"
          autocomplete="name"
        />
        <UiTextField
          v-model="nameValue"
          placeholder="Иван Иванов"
          name="name"
          autocomplete="name"
        />
        <UiTextField
          v-model="emailValue"
          label="Email"
          type="email"
          hint="Ответ придёт на эту почту"
          required
          trimmed
        />
        <UiTextField
          v-model="phoneValue"
          label="Телефон"
          type="tel"
          :error="phoneError"
        />
        <UiTextField
          v-model="numberValue"
          label="Число"
          type="number"
        />
        <UiTextField
          v-model="numberValue"
          label="Сумма"
          type="number"
        >
          <template #prepend>
            ≈
          </template>
          <template #append>
            ₽
          </template>
        </UiTextField>
        <UiTextField
          v-model="disabledValue"
          label="Disabled"
          disabled
        />
        <UiTextField
          label="Disabled пустое"
          disabled
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const textValue = ref('');
const nameValue = ref('');
const emailValue = ref('');
const phoneValue = ref('12-34');
const numberValue = ref<number | null>(null);
const disabledValue = ref('Нельзя изменить');

const phoneError = computed(() => (/^\+?\d{10,15}$/.test(phoneValue.value) ? '' : 'Только цифры, 10–15 знаков'));
</script>

<style lang="scss" scoped>
.demo-fields {
  .section {
    &__body {
      &.field-items {
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        align-items: start;
      }
    }
  }
}
</style>
