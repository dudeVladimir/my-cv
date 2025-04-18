<template>
  <div
    class="ui-text-field"
    :class="{
      'ui-text-field_focused': isFocused,
      'ui-text-field_disabled': disabled,
      'ui-text-field_has-value': hasValue,
    }"
  >
    <div
      class="ui-text-field__main"
      :class="{
        'ui-text-field__main_disabled': disabled,
      }"
      @click="inputMainClick"
    >
      <div
        v-if="slots.prepend"
        class="content-prepend"
      >
        <slot name="prepend" />
      </div>
      <div class="content-main">
        <label
          v-if="label"
          :for="id"
          class="input--label text-xs-2"
          :class="{
            'th_main_text--text': !disabled,
            'th_secondary_text--text': disabled,
          }"
        >
          {{ label }}
        </label>
        <div
          class="input--wrapper"
          :class="{
            'input--wrapper_has-label': !!label,
          }"
        >
          <input
            :id="id"
            ref="nativeInput"
            v-model="_value"
            class="text-m-1"
            :class="{
              'th_main_text--text': !disabled,
              'th_secondary_text--text': disabled,
            }"
            :type="type"
            :disabled="disabled"
            @focus="focusHandler"
            @blur="blurHandler"
          >
        </div>
      </div>
      <div
        v-if="slots.append"
        class="content-append"
      >
        <slot name="append" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { generateUiElementId } from '@/ui-config/helper';
import { computed, ref, onMounted } from 'vue';

type Value = string | number | null;
type InputType = 'text' | 'number' | 'tel';
interface Props {
  modelValue?: Value;
  disabled?: boolean;
  label?: string;
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
});
const slots = defineSlots<Slots>();
const emit = defineEmits<Emits>();

const isNumber = computed(() => props.type === 'number');
const hasValue = computed(() => (!isNumber.value && !!_value.value) || (isNumber.value && Number.isFinite(_value.value)));

const nativeInput = ref<HTMLInputElement>();
const id = generateUiElementId('text_field');
const _value = computed({
  get: () => props.modelValue,
  set: v => {
    let newValue = v;

    if (isNumber.value && v !== null) {
      const toNumberV = +v;
      newValue = Number.isFinite(toNumberV) ? toNumberV : null;
    }

    emit('update:modelValue', newValue);
  },
});

// region focus
const isFocused = ref(false);
function focusHandler($event: FocusEvent) {
  isFocused.value = true;
  emit('focus', $event);
};
function blurHandler($event: FocusEvent) {
  isFocused.value = false;
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

function inputMainClick() {
  setFocus();
};

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
  &_focused {
    .ui-text-field__main {
      background: rgba(var(--th_main_accent_rgb), 0.05);
    }
  }

  // region label
  &_has-value,
  &_focused {
    .ui-text-field__main {
      .content {
        &-main {
          .input {
            &--label {
              top: unset;
              bottom: unset;
              font-size: 0.85em;
            }
          }
        }
      }
    }
  }
  // endregion label

  &__main {
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(var(--th_main_accent_rgb), 0.5);
    border-radius: 6px;
    height: 48px;
    padding: 4px 8px;

    transition: all ease-in-out .1s;

    &:hover {
      &:not(.ui-text-field__main_disabled) {
        border-color: rgba(var(--th_main_accent_rgb), 0.8);
      }
    }

    &_disabled {
      * {
        cursor: not-allowed !important;
      }
    }

    .content {
      // &-prepend {}
      &-main {
        position: relative;
        height: 100%;
        .input {
          &--label {
            transition: all .2s;
            position: absolute;
            display: flex;
            align-items: center;
            font-size: 1.5em;
            top: 0;
            bottom: 0;
            max-width: 100%;
          }
          &--wrapper {
            height: 100%;
            width: 100%;

            &_has-label {
              padding-top: 14px;
            }
          }
        }
      }
      // &-append {}
    }
  }
}
</style>
