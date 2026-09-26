<template>
  <component
    :is="to ? RouterLink : 'a'"
    v-bind="linkAttrs"
    class="ui-link"
    :class="[`ui-link_${variant}`, { 'text-s-3': variant === 'nav' }]"
  >
    <SlotContent :nodes="trimSlot(slots.default?.())" />{{ newTab ? WORD_JOINER : '' }}<UiIcon
      v-if="newTab"
      name="arrow-up-right"
      class="ui-link__external"
    />
    <span
      v-if="newTab"
      class="ui-link__hidden"
    >(откроется в новой вкладке)</span>
  </component>
</template>

<script setup lang="ts">
import { computed, createTextVNode, Text, type VNode } from 'vue';
import { RouterLink, type RouteLocationRaw } from 'vue-router';

interface Props {
  /** Ссылка внутри приложения */
  to?: RouteLocationRaw;
  /** Ссылка наружу */
  href?: string;
  newTab?: boolean;
  /**
   * inline — в тексте, всегда подчёркнута;
   * subtle — второстепенная (футер, мета), подчёркивание на hover;
   * nav — навигация, активный роут отмечен полосой
   */
  variant?: 'inline' | 'subtle' | 'nav';
};
interface Slots {
  default?: () => VNode[];
};

const props = withDefaults(defineProps<Props>(), {
  to: undefined,
  href: '',
  variant: 'inline',
});
const slots = defineSlots<Slots>();

// Иконка не переносится на новую строку отдельно от текста
const WORD_JOINER = String.fromCharCode(0x2060);

// region slot
// Переносы строк в шаблоне оставляют пробелы по краям слота. Внутри строчной
// ссылки они видны: подчёркнутый пробел, зазор перед иконкой, «ссылка .»
function trimSlot(nodes: VNode[] = []) {
  return nodes.map((node, idx) => {
    if (node.type !== Text || typeof node.children !== 'string') return node;

    let text = node.children;
    if (idx === 0) text = text.trimStart();
    if (idx === nodes.length - 1) text = text.trimEnd();
    return createTextVNode(text);
  });
};

// Слот вызывается в рендере UiLink, чтобы его зависимости отслеживал UiLink
const SlotContent = (p: { nodes: VNode[] }) => p.nodes;
// endregion slot

const linkAttrs = computed(() => {
  const target = props.newTab
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return props.to
    ? { to: props.to, ...target }
    : { href: props.href, ...target };
});
</script>

<style lang="scss" scoped>
.ui-link {
  color: inherit;
  text-decoration-line: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.2em;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  transition: color 0.2s, text-decoration-color 0.2s;

  &:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--th_accent) 50%, transparent);
    outline-offset: 2px;
  }

  &_inline {
    color: var(--th_accent);
    text-decoration-color: color-mix(in srgb, var(--th_accent) 40%, transparent);

    &:hover {
      color: var(--th_accent_hover);
      text-decoration-color: currentColor;
    }
  }

  &_subtle {
    color: var(--th_text_muted);
    text-decoration-color: transparent;

    &:hover {
      color: var(--th_text);
      text-decoration-color: currentColor;
    }
  }

  &_nav {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 4px 0;
    color: var(--th_text_muted);
    text-decoration: none;

    &::after {
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;
      border-radius: 1px;
      background: var(--th_accent);
      transform: scaleX(0);
      transition: transform 0.2s;
    }

    // Классы активной ссылки задаются в createRouter (main.ts)
    &:hover,
    &.active-link {
      color: var(--th_text);
    }

    &.active-link::after {
      transform: scaleX(1);
    }

    // Текущая страница: переходить некуда
    &[aria-current='page'] {
      cursor: default;
    }
  }

  &__external {
    width: 0.75em;
    height: 0.75em;
    margin-left: 0.15em;
  }

  &__hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
}
</style>
