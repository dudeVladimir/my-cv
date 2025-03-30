<template>
  <button
    class="ui-button"
    :class="`ui-button_${variant}`"
    :disabled="disabled"
  >
    <div class="ui-button__content">
      <div class="main-container">
        <slot />
      </div>
    </div>
  </button>
</template>

<script lang="ts" setup>
interface Props {
  disabled?: boolean;
  variant?: string;
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  variant: 'default',
});
</script>

<style lang="scss" scoped>
.ui-button {
  transition: all 0.24s;
  padding: 7px 11px;
  border-radius: 6px;
  border: 1px solid var(--th_main_text);
  background: var(--th_main_background);
  color: var(--th_main_text);
  outline: none;
  cursor: pointer;

  &_default:hover:enabled {
    box-shadow: 0px 0px 12px 2px rgba(var(--th_main_text_rgb), 0.2) inset;
  }
  &_default:active:enabled {
    box-shadow: 0px 0px 12px 2px rgba(var(--th_main_text_rgb), 0.4) inset;
  }

  &:disabled {
    cursor: not-allowed;
    background: var(--th_secondary_background);
    color: var(--th_secondary_text);
    border-color: var(--th_primary);
  }

  &_primary {
    color: var(--th_primary);
    background: var(--th_primary_background);
    border-color: var(--th_primary);
  }
}
</style>
