<template>
  <div class="ui-radio-group">
    <ul class="ui-radio-group__list">
      <li
        v-for="(item, idx) in items"
        :key="`radio-item-${idx}`"
        class="radio-item"
      >
        <UiRadioItem
          class="radio-item__component"
          :item="item"
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
import type { Item, ItemValueOrText, Value } from './types';
import { findReturnValue } from './helpers';

const UiRadioItem = () => './UiRadioItem.vue';
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

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

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
    gap: 12px;
    flex-wrap: wrap;
  }
}
</style>
