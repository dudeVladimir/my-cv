<template>
  <span
    class="ui-chip"
    :class="[
      `ui-chip_size-${size}`,
      {
        'ui-chip_selected': modelValue,
        'ui-chip_disabled': disabled,
      },
    ]"
  >
    <button
      type="button"
      class="ui-chip__main"
      :class="size === 's' ? 'text-xs-3' : 'text-s-3'"
      :disabled="disabled"
      :aria-pressed="isSelectable ? modelValue : undefined"
      @click="mainClickHandler"
    >
      <!-- Галочка дублирует цвет: выбранное различимо и без него -->
      <svg
        v-if="modelValue"
        class="ui-chip__check"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path d="M3 8.5l3.2 3L13 4.5" />
      </svg>
      <slot />
    </button>
    <button
      v-if="removable"
      type="button"
      class="ui-chip__remove"
      :disabled="disabled"
      :aria-label="removeLabel"
      @click="emit('remove-clicked')"
    >
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" />
      </svg>
    </button>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  /** Выбран ли чип. Не передан — чип просто кликабельный, без состояния */
  modelValue?: boolean;
  size?: 's' | 'm';
  disabled?: boolean;
  removable?: boolean;
  /** Доступное имя кнопки удаления, лучше с названием чипа */
  removeLabel?: string;
};
interface Emits {
  (ev: 'update:modelValue', v: boolean): void;
  (ev: 'click', v: MouseEvent): void;
  (ev: 'remove-clicked'): void;
};
interface Slots {
  default?: unknown;
};

const props = withDefaults(defineProps<Props>(), {
  // Явный undefined: иначе Vue приведёт отсутствующий boolean-проп к false
  modelValue: undefined,
  size: 'm',
  removeLabel: 'Удалить',
});
const emit = defineEmits<Emits>();
defineSlots<Slots>();

const isSelectable = computed(() => props.modelValue !== undefined);

function mainClickHandler($event: MouseEvent) {
  if (isSelectable.value)
    emit('update:modelValue', !props.modelValue);

  emit('click', $event);
};
</script>

<style lang="scss" scoped>
.ui-chip {
  --chip-height: 32px;
  --chip-padding: 12px;

  display: inline-flex;
  align-items: center;
  height: var(--chip-height);
  border: 1px solid var(--th_border_strong);
  border-radius: 999px;
  background: var(--th_surface);
  color: var(--th_text);
  transition: color 0.2s, background-color 0.2s, border-color 0.2s, transform 0.1s;

  &_size-s {
    --chip-height: 24px;
    --chip-padding: 8px;
  }

  &:not(.ui-chip_disabled):hover {
    border-color: var(--th_text_muted);
    background: var(--th_surface_muted);
  }

  &:not(.ui-chip_disabled):has(.ui-chip__main:active) {
    transform: scale(0.97);
  }

  &_selected {
    border-color: var(--th_accent);
    background: color-mix(in srgb, var(--th_accent) 12%, transparent);
    color: var(--th_accent);

    &:not(.ui-chip_disabled):hover {
      border-color: var(--th_accent_hover);
      background: color-mix(in srgb, var(--th_accent) 18%, transparent);
      color: var(--th_accent_hover);
    }
  }

  &_disabled {
    border-color: var(--th_border);
    background: var(--th_surface_muted);
    color: var(--th_text_muted);
  }

  button {
    display: inline-flex;
    align-items: center;
    border: none;
    background: none;
    color: inherit;
    outline: none;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }

    &:focus-visible {
      outline: 2px solid color-mix(in srgb, var(--th_accent) 50%, transparent);
      outline-offset: 2px;
    }

    svg {
      flex: 0 0 auto;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.8;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  }

  &__main {
    gap: 4px;
    height: 100%;
    padding: 0 var(--chip-padding);
    border-radius: inherit;
    white-space: nowrap;
  }

  &__check {
    width: 14px;
    height: 14px;
    margin-left: -2px;
  }

  // С крестиком правый отступ основной части уходит в сам крестик
  &:has(&__remove) &__main {
    padding-right: 4px;
  }

  &__remove {
    justify-content: center;
    width: 18px;
    height: 18px;
    margin-right: calc(var(--chip-padding) - 6px);
    padding: 0;
    border-radius: 50%;
    opacity: 0.7;
    transition: opacity 0.2s, background-color 0.2s;

    svg {
      width: 12px;
      height: 12px;
    }

    &:hover:enabled {
      opacity: 1;
      background: color-mix(in srgb, var(--th_text) 10%, transparent);
    }
  }
}
</style>
