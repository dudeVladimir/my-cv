<template>
  <button
    class="ui-button"
    :class="`ui-button_${variant}`"
    :disabled="disabled"
  >
    <div class="ui-button__content text-s-3">
      <div class="main-container">
        <slot />
      </div>
    </div>
  </button>
</template>

<script lang="ts" setup>
interface Props {
  disabled?: boolean;
  variant?: 'default' | 'primary';
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
  border: 1px solid var(--th_border_strong);
  background: var(--th_surface);
  color: var(--th_text);
  outline: none;
  cursor: pointer;

  &_default:hover:enabled {
    border-color: var(--th_text_muted);
    background: var(--th_surface_muted);
  }
  &_default:active:enabled {
    box-shadow: 0px 0px 8px 1px rgba(var(--th_text_rgb), 0.15) inset;
  }

  &_primary {
    color: var(--th_accent);
    background: rgba(var(--th_accent_rgb), 0.06);
    border-color: var(--th_accent);

    &:hover:enabled {
      color: var(--th_accent_hover);
      border-color: var(--th_accent_hover);
      background: rgba(var(--th_accent_rgb), 0.12);
    }
  }

  &:disabled {
    cursor: not-allowed;
    background: var(--th_surface_muted);
    color: var(--th_text_muted);
    border-color: var(--th_border);
  }
}
</style>
