<template>
  <button
    type="button"
    class="ui-button"
    :class="`ui-button_${variant}`"
    :disabled="disabled"
  >
    <span class="ui-button__content text-s-3">
      <slot />
    </span>
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s, background-color 0.2s, border-color 0.2s, transform 0.1s;
  padding: 7px 14px;
  border-radius: 6px;
  border: 1px solid var(--th_border_strong);
  background: var(--th_surface);
  color: var(--th_text);
  outline: none;
  cursor: pointer;

  &__content {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  &_default {
    &:hover:enabled {
      border-color: var(--th_text_muted);
      background: var(--th_surface_muted);
    }
    &:active:enabled {
      border-color: var(--th_text_muted);
      background: rgba(var(--th_text_rgb), 0.14);
    }
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
    &:active:enabled {
      background: rgba(var(--th_accent_rgb), 0.18);
    }
  }

  &:active:enabled {
    transform: scale(0.99);
  }

  &:focus-visible {
    outline: 2px solid rgba(var(--th_accent_rgb), 0.5);
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    background: var(--th_surface_muted);
    color: var(--th_text_muted);
    border-color: var(--th_border);
  }
}
</style>
