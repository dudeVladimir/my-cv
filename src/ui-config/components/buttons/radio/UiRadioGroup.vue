<template>
  <div
    class="ui-radio-group"
    role="radiogroup"
    :aria-disabled="disabled || undefined"
  >
    <ul class="ui-radio-group__list">
      <li
        v-for="(item, idx) in items"
        :key="`radio-item-${idx}`"
        class="radio-item"
      >
        <UiRadioItem
          class="radio-item__component"
          :item="item"
          :name="name"
          :item-text="itemText"
          :item-value="itemValue"
          :disabled="disabled"
          :is-active="findReturnValue(item, itemValue) === _value"
          @select-item="selectItem(idx)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { generateUiElementId } from '@/ui-config/helper';
import type { Item, ItemValueOrText, Value } from './types';
import { findReturnValue } from './helpers';

interface Props {
  modelValue: Value;
  items: Item[];
  itemText?: ItemValueOrText;
  itemValue?: ItemValueOrText;
  disabled?: boolean;
};
interface Emits {
  (ev: 'update:modelValue', v: Value): void;
};

const props = withDefaults(defineProps<Props>(), {
  itemText: 'text',
  itemValue: 'value',
});
const emit = defineEmits<Emits>();

// Общий name связывает input'ы в одну группу: стрелки, один выбранный
const name = generateUiElementId('radio_group');

const _value = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v),
});

function selectItem(idx: number) {
  if (!props.disabled)
    _value.value = findReturnValue(props.items[idx], props.itemValue);
};
</script>

<style lang="scss" scoped>
.ui-radio-group {
  &__list {
    display: flex;
    gap: 8px 20px;
    flex-wrap: wrap;

    // Без flex li берёт line-height родителя и становится выше метки
    .radio-item {
      display: flex;
    }
  }
}
</style>
