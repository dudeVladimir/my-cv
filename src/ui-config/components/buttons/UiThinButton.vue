<template>
  <button
    type="button"
    class="ui-thin-button"
    :class="`ui-thin-button_${variant}`"
    :disabled="disabled"
  >
    <span class="ui-thin-button__content text-s-3">
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
.ui-thin-button {
  width: fit-content;
  transition: color 0.2s, background-color 0.2s;
  padding: 2px 8px;
  border: none;
  border-radius: 4px;
  background: transparent;
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
      background: rgba(var(--th_text_rgb), 0.06);
    }
    &:active:enabled {
      background: rgba(var(--th_text_rgb), 0.1);
    }
  }

  &_primary {
    color: var(--th_accent);

    &:hover:enabled {
      color: var(--th_accent_hover);
      background: rgba(var(--th_accent_rgb), 0.08);
    }
    &:active:enabled {
      background: rgba(var(--th_accent_rgb), 0.14);
    }
  }

  &:focus-visible {
    outline: 2px solid rgba(var(--th_accent_rgb), 0.5);
    outline-offset: 2px;
  }

  &:disabled {
    color: var(--th_text_muted);
    cursor: not-allowed;
  }
}
</style>
