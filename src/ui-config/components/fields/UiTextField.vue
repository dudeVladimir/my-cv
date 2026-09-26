<template>
  <div
    v-bind="pickRootAttrs($attrs)"
    class="ui-text-field"
    :class="{
      'ui-text-field_disabled': disabled,
      'ui-text-field_invalid': !!error,
      'ui-text-field_labeled': !!label,
    }"
  >
    <div
      class="ui-text-field__control"
      @click="setFocus"
    >
      <div
        v-if="slots.prepend"
        class="ui-text-field__prepend"
      >
        <slot name="prepend" />
      </div>
      <div class="ui-text-field__body">
        <!-- name, autocomplete, inputmode и т.п. уходят на input; class и style — на корень -->
        <input
          v-bind="omitRootAttrs($attrs)"
          :id="id"
          ref="nativeInput"
          v-model="_value"
          class="ui-text-field__input text-m-2"
          :type="type"
          :disabled="disabled"
          :required="required"
          :placeholder="placeholder || (label ? ' ' : undefined)"
          :aria-invalid="!!error || undefined"
          :aria-describedby="message ? messageId : undefined"
          @focus="focusHandler"
          @blur="blurHandler"
        >
        <!-- Метка после input: плавает через `input:focus + label` и `:placeholder-shown` -->
        <label
          v-if="label"
          :for="id"
          class="ui-text-field__label text-m-2"
        >
          {{ label }}
          <span
            v-if="required"
            class="ui-text-field__required"
            aria-hidden="true"
          >*</span>
        </label>
      </div>
      <div
        v-if="slots.append"
        class="ui-text-field__append"
      >
        <slot name="append" />
      </div>
    </div>
    <div
      v-if="message"
      :id="messageId"
      class="ui-text-field__message text-xs-2"
    >
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { generateUiElementId } from '@/ui-config/helper';
import { computed, ref, onMounted } from 'vue';

type Value = string | number | null;
type InputType = 'text' | 'number' | 'tel' | 'email';
interface Props {
  modelValue?: Value;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  type?: InputType;
  autofocus?: boolean;
  trimmed?: boolean;
  required?: boolean;
};
interface Emits {
  (ev: 'update:modelValue', v: Value): void;
  (ev: 'focus', v: FocusEvent): void;
  (ev: 'blur', v: FocusEvent): void;
};
interface Slots {
  prepend?: unknown;
  append?: unknown;
};

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  modelValue: null,
  label: '',
  placeholder: '',
  hint: '',
  error: '',
});
const slots = defineSlots<Slots>();
const emit = defineEmits<Emits>();

// region attrs
defineOptions({ inheritAttrs: false });

const ROOT_ATTRS = ['class', 'style'];
// $attrs не реактивны в script, поэтому делятся при рендере, а не в computed
function pickRootAttrs(attrs: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => ROOT_ATTRS.includes(key)));
};
function omitRootAttrs(attrs: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => !ROOT_ATTRS.includes(key)));
};
// endregion attrs

const nativeInput = ref<HTMLInputElement>();
const id = generateUiElementId('text_field');
const messageId = `${id}_message`;

// Ошибка важнее подсказки
const message = computed(() => props.error || props.hint);

const _value = computed({
  get: () => props.modelValue,
  set: v => {
    let newValue = v;

    if (props.type === 'number') {
      // Пустое поле — null, а не 0 (+'' === 0)
      const toNumberV = v === null || v === '' ? NaN : +v;
      newValue = Number.isFinite(toNumberV) ? toNumberV : null;
    }

    emit('update:modelValue', newValue);
  },
});

// region focus
function focusHandler($event: FocusEvent) {
  emit('focus', $event);
};
function blurHandler($event: FocusEvent) {
  if (props.trimmed && typeof _value.value === 'string')
    _value.value = _value.value.trim();

  emit('blur', $event);
};
function setFocus() {
  if (!nativeInput.value) {
    console.warn('focus not seted, input not found');
    return;
  }
  nativeInput.value.focus();
};
// endregion focus

onMounted(() => {
  if (props.autofocus)
    setFocus();
});

defineExpose({
  focus: setFocus,
});
</script>

<style lang="scss" scoped>
.ui-text-field {
  // Геометрия в rem: поле и метка масштабируются вместе с корневым шрифтом.
  // Позиции метки считаются от этих переменных — менять только их
  --field-height: 3rem;
  --field-border: 1px;
  --field-line: 1.25rem;
  --label-top: 0.3125rem;
  --label-scale: 0.75;

  &__control {
    display: flex;
    align-items: center;
    gap: 8px;
    height: var(--field-height);
    padding: 0 12px;
    border: var(--field-border) solid var(--th_border_strong);
    border-radius: 6px;
    // Фон контейнера, если он его задаёт (UiCard): поле не выделяется на нём другим тоном
    background: var(--ui-surface, var(--th_surface));
    cursor: text;
    transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
  }

  &:not(.ui-text-field_disabled, .ui-text-field_invalid) &__control:hover {
    border-color: var(--th_text_muted);
  }

  &__control:focus-within {
    border-color: var(--th_accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--th_accent) 20%, transparent);
  }

  &__prepend,
  &__append {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--th_text_muted);
  }

  &__body {
    position: relative;
    flex: 1 1 auto;
    align-self: stretch;
    min-width: 0;
  }

  &__input {
    display: block;
    width: 100%;
    height: 100%;
    min-width: 0;
    padding: 0;
    border: none;
    outline: none;
    background: transparent;
    color: var(--th_text);
    line-height: var(--field-line);

    &::placeholder {
      color: var(--th_text_muted);
      opacity: 1;
    }
  }

  // Место под всплывшую метку
  &_labeled &__input {
    padding: calc(var(--label-top) + var(--field-line) * var(--label-scale) - 0.125rem) 0 0.25rem;
  }

  // Плейсхолдер не должен налезать на метку в покое
  &_labeled &__input:not(:focus)::placeholder {
    color: transparent;
  }

  &__label {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 100%;
    overflow: hidden;
    color: var(--th_text_muted);
    line-height: var(--field-line);
    white-space: nowrap;
    text-overflow: ellipsis;
    pointer-events: none;
    // В покое — по центру внутренней высоты контрола
    transform: translateY(calc((var(--field-height) - 2 * var(--field-border) - var(--field-line)) / 2));
    transform-origin: 0 0;
    transition: transform 0.15s ease-out, color 0.2s;
  }

  &__input:focus + &__label,
  &__input:not(:placeholder-shown) + &__label {
    max-width: calc(100% / var(--label-scale));
    transform: translateY(var(--label-top)) scale(var(--label-scale));
  }

  &__input:focus + &__label {
    color: var(--th_accent);
  }

  &__required {
    color: var(--th_error);
  }

  &__message {
    margin-top: 4px;
    padding: 0 12px;
    color: var(--th_text_muted);
  }

  &_invalid {
    .ui-text-field__control {
      border-color: var(--th_error);
    }
    .ui-text-field__control:focus-within {
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--th_error) 20%, transparent);
    }
    .ui-text-field__input:focus + .ui-text-field__label,
    .ui-text-field__message {
      color: var(--th_error);
    }
  }

  &_disabled {
    .ui-text-field__control {
      border-color: var(--th_border);
      background: var(--th_surface_muted);
      cursor: not-allowed;
    }
    .ui-text-field__input {
      color: var(--th_text_muted);
      cursor: not-allowed;
      // Safari приглушает disabled-поле ещё и прозрачностью
      opacity: 1;
    }
  }
}
</style>
