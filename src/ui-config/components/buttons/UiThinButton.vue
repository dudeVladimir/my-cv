<template>
  <button
    :disabled="disabled"
    class="ui-thin-button"
    :class="`ui-thin-button_${variant}`"
  >
    <div class="ui-thin-button__content">
      <div class="main-button-content text-m-3">
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
.ui-thin-button {
  width: fit-content;
  transition: all 0.24s;
  border: none;
  background: none;
  outline: none;
  color: var(--th_main_text);
  padding: 4px 6px;
  cursor: pointer;

  &:hover:enabled {
    filter: brightness(110%);
  }
  &:active:enabled {
    filter: brightness(90%);
  }

  &:disabled {
    color: var(--th_secondary_text);
    cursor: not-allowed;
  }
}
</style>
