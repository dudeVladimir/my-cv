<template>
  <label
    class="ui-radio-item"
    :class="{
      'ui-radio-item_active': isActive,
      'ui-radio-item_disabled': disabled,
    }"
  >
    <input
      class="ui-radio-item__input"
      type="radio"
      :name="name"
      :value="itemValue"
      :checked="isActive"
      :disabled="disabled"
      @change="selectItem"
    >
    <span class="ui-radio-item__marker" />
    <span class="ui-radio-item__text text-s-2">
      <slot
        v-if="slots.default"
        :item="item"
      />
      <template v-else>
        {{ itemText }}
      </template>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { findReturnValue } from './helpers';
import type { Item, ItemValueOrText, Value } from './types';

interface Props {
  item: Item;
  name?: string;
  itemText?: ItemValueOrText;
  itemValue?: ItemValueOrText;
  disabled?: boolean;
  isActive?: boolean;
};
interface Emits {
  (ev: 'select-item', v: Value): void;
};
interface Slots {
  default?: (props: { item: Item }) => unknown;
};

const props = withDefaults(defineProps<Props>(), {
  name: undefined,
  itemText: 'text',
  itemValue: 'value',
});
const emit = defineEmits<Emits>();
const slots = defineSlots<Slots>();

const itemText = computed(() => findReturnValue(props.item, props.itemText));
const itemValue = computed(() => findReturnValue(props.item, props.itemValue));

function selectItem() {
  if (!props.disabled)
    emit('select-item', itemValue.value);
};
</script>

<style lang="scss" scoped>
.ui-radio-item {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--th_text);
  cursor: pointer;

  // Нативный input скрыт визуально, но остаётся в табе и для скринридеров
  &__input {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  // Точка — фон, видимый внутри inset-тени: один элемент, поэтому всегда по центру
  &__marker {
    flex: 0 0 auto;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid var(--th_border_strong);
    background: var(--th_surface);
    box-shadow: inset 0 0 0 8px var(--th_surface);
    transition: border-color 0.2s, background-color 0.2s, box-shadow 0.15s ease-out;
  }

  &:not(.ui-radio-item_disabled):hover &__marker {
    border-color: var(--th_text_muted);
  }

  &__input:checked + &__marker {
    border-color: var(--th_accent);
    background: var(--th_accent);
    box-shadow: inset 0 0 0 3px var(--th_surface);
  }

  &:not(.ui-radio-item_disabled):hover &__input:checked + &__marker {
    border-color: var(--th_accent_hover);
    background: var(--th_accent_hover);
  }

  &__input:focus-visible + &__marker {
    outline: 2px solid rgba(var(--th_accent_rgb), 0.5);
    outline-offset: 2px;
  }

  &_disabled {
    color: var(--th_text_muted);
    cursor: not-allowed;
  }

  &__input:disabled + &__marker {
    border-color: var(--th_border);
    background: var(--th_surface_muted);
    box-shadow: inset 0 0 0 8px var(--th_surface_muted);
  }

  &__input:disabled:checked + &__marker {
    background: var(--th_text_muted);
    box-shadow: inset 0 0 0 3px var(--th_surface_muted);
  }
}
</style>
