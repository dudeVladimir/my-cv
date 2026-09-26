<template>
  <span
    class="ui-tag"
    :class="[
      `ui-tag_${color}`,
      `ui-tag_size-${size}`,
      size === 's' ? 'text-xs-3' : 'text-s-3',
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  color?: 'neutral' | 'accent' | 'success' | 'warning' | 'error';
  size?: 's' | 'm';
};
interface Slots {
  default?: unknown;
};

withDefaults(defineProps<Props>(), {
  color: 'neutral',
  size: 's',
});
defineSlots<Slots>();
</script>

<style lang="scss" scoped>
.ui-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-radius: 999px;
  white-space: nowrap;

  &_size-s {
    padding: 2px 8px;
  }

  &_size-m {
    padding: 4px 10px;
  }

  &_neutral {
    background: var(--th_surface_muted);
    color: var(--th_text_muted);
  }

  @each $color in accent, success, warning, error {
    &_#{$color} {
      background: rgba(var(--th_#{$color}_rgb), 0.12);
      color: var(--th_#{$color});
    }
  }
}
</style>
