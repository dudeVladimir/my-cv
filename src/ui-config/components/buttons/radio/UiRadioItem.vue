<template>
  <div
    class="ui-radio-item"
    :class="{
      'ui-radio-item_active': isActive,
      'ui-radio-item_disabled': disabled,
    }"
  >
    <div class="ui-radio-item__content">
      <button
        class="item-activaor"
        :disabled="disabled"
        @click="selectItem"
      >
        <div class="item-marker">
          <div class="item-marker__inner" :class="{ 'item-marker__inner_filled': isActive }" />
        </div>
        <div class="item-text">
          <template v-if="slots.default">
            <slot v-bind="{ item }" />
          </template>
          <template v-else>
            {{ itemText }}
          </template>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { findReturnValue } from './helpers';
import type { Item, ItemValueOrText, Value } from './types';

interface Props {
  item: Item;
  itemText?: ItemValueOrText;
  itemValue?: ItemValueOrText;
  disabled?: boolean;
  isActive?: boolean;
};
interface Emits {
  (ev: 'select-item', v: Value): void;
};
interface Slots {
  default?: unknown;
};

const props = withDefaults(defineProps<Props>(), {
  itemText: 'value',
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
  &__content {
    .item-activaor {
      border: none;
      display: flex;
      gap: 8px;
      padding: 4px;
      align-items: center;

      &:disabled {
        cursor: not-allowed;
        filter: brightness(70%);
      }
      .item-marker {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        border: 1px solid var(--th_main_text);

        &__inner {
          border-radius: inherit;
          width: 20px;
          height: 20px;
          transform: scale(.65);
          background: transparent;
          transition: 0.1s;

          &_filled {
            background: var(--th_main_accent);
          }
        }
      }
    }
  }
}
</style>
