<template>
  <component
    :is="tag"
    class="ui-card"
    :class="[
      `ui-card_${variant}`,
      `ui-card_size-${size}`,
      {
        'ui-card_accent': accent,
        'ui-card_interactive': isInteractive,
      },
    ]"
  >
    <div
      v-if="slots.media"
      class="ui-card__media"
    >
      <slot name="media" />
    </div>

    <div class="ui-card__inner">
      <div
        v-if="hasTitle || hasSubtitle || slots['header-append']"
        class="ui-card__header"
      >
        <div class="ui-card__heading">
          <component
            :is="titleTag"
            v-if="hasTitle"
            class="ui-card__title"
            :class="size === 's' ? 'text-m-4' : 'header-s-3'"
          >
            <component
              :is="actionComponent"
              v-if="isInteractive"
              v-bind="actionAttrs"
              class="ui-card__action"
              @click="actionClickHandler"
            >
              <slot name="title">
                {{ title }}
              </slot>
            </component>
            <slot
              v-else
              name="title"
            >
              {{ title }}
            </slot>
          </component>
          <div
            v-if="hasSubtitle"
            class="ui-card__subtitle text-s-2"
          >
            <slot name="subtitle">
              {{ subtitle }}
            </slot>
          </div>
        </div>
        <div
          v-if="slots['header-append']"
          class="ui-card__header-append text-s-2"
        >
          <slot name="header-append" />
        </div>
      </div>

      <div
        v-if="slots.default"
        class="ui-card__body"
        :class="size === 's' ? 'text-s-2' : 'text-m-2'"
      >
        <slot />
      </div>

      <div
        v-if="slots.footer"
        class="ui-card__footer"
      >
        <slot name="footer" />
      </div>
    </div>

    <!-- Без заголовка действию нечего обернуть: пустое, с aria-label -->
    <component
      :is="actionComponent"
      v-if="isInteractive && !hasTitle"
      v-bind="actionAttrs"
      class="ui-card__action"
      :aria-label="actionLabel"
      @click="actionClickHandler"
    />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, type RouteLocationRaw } from 'vue-router';

interface Props {
  variant?: 'outlined' | 'filled' | 'elevated';
  size?: 's' | 'm' | 'l';
  /** Акцентная полоса слева — выделить главное */
  accent?: boolean;
  /** Корневой тег: article, section, li… */
  tag?: string;
  title?: string;
  /** Уровень заголовка под место карточки в структуре страницы */
  titleTag?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  subtitle?: string;
  /** Карточка-ссылка внутри приложения */
  to?: RouteLocationRaw;
  /** Карточка-ссылка наружу */
  href?: string;
  newTab?: boolean;
  /** Кликабельная без ссылки: слушать `@click` */
  clickable?: boolean;
  /** Доступное имя действия, если нет заголовка */
  actionLabel?: string;
};
interface Emits {
  (ev: 'click', v: MouseEvent): void;
};
interface Slots {
  media?: unknown;
  title?: unknown;
  subtitle?: unknown;
  'header-append'?: unknown;
  default?: unknown;
  footer?: unknown;
};

const props = withDefaults(defineProps<Props>(), {
  variant: 'outlined',
  size: 'm',
  tag: 'div',
  title: '',
  titleTag: 'h3',
  subtitle: '',
  to: undefined,
  href: '',
  actionLabel: '',
});
const emit = defineEmits<Emits>();
const slots = defineSlots<Slots>();

const hasTitle = computed(() => !!props.title || !!slots.title);
const hasSubtitle = computed(() => !!props.subtitle || !!slots.subtitle);

// region action
const isInteractive = computed(() => !!props.to || !!props.href || props.clickable);

const actionComponent = computed(() => {
  if (props.to) return RouterLink;
  if (props.href) return 'a';
  return 'button';
});

const actionAttrs = computed(() => {
  if (props.to) return { to: props.to };
  if (props.href) {
    return props.newTab
      ? { href: props.href, target: '_blank', rel: 'noopener noreferrer' }
      : { href: props.href };
  }
  return { type: 'button' };
});

function actionClickHandler($event: MouseEvent) {
  emit('click', $event);
};
// endregion action
</script>

<style lang="scss" scoped>
.ui-card {
  --card-padding: 20px;
  --card-radius: 10px;

  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: var(--card-radius);
  color: var(--th_text);
  transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s, transform 0.1s;

  // region variants
  &_outlined {
    background: var(--th_surface);
    border-color: var(--th_border);
  }

  &_filled {
    background: var(--th_surface_muted);
  }

  &_elevated {
    background: var(--th_surface);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.06);
  }

  &_accent::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 3px;
    background: var(--th_accent);
  }
  // endregion variants

  // region sizes
  &_size-s {
    --card-padding: 12px;
    --card-radius: 8px;
  }

  &_size-l {
    --card-padding: 28px;
  }
  // endregion sizes

  &__media {
    // Картинка/превью — во всю ширину, без внутренних отступов
    :deep(img),
    :deep(video) {
      display: block;
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  &__inner {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: calc(var(--card-padding) * 0.6);
    padding: var(--card-padding);
  }

  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  &__heading {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  &__title {
    overflow-wrap: anywhere;
    transition: color 0.2s;
  }

  &__subtitle,
  &__header-append {
    color: var(--th_text_muted);
  }

  &__header-append {
    flex: 0 0 auto;
    white-space: nowrap;
  }

  &__footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    // Прижимается к низу, если карточки в сетке одной высоты
    margin-top: auto;
  }

  // region interactive
  // Действие растягивается ::after на всю карточку: клик в любом месте — клик по нему.
  // Вложенные ссылки и кнопки поднимаются над ним и остаются самостоятельными
  &__action {
    padding: 0;
    border: none;
    border-radius: 0;
    background: none;
    color: inherit;
    font: inherit;
    letter-spacing: inherit;
    text-align: inherit;
    text-decoration: none;
    outline: none;
    cursor: pointer;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 0;
    }
  }

  &_interactive {
    :deep(:is(a, button, input, select, textarea, label, [tabindex]):not(.ui-card__action)) {
      position: relative;
      z-index: 1;
    }

    &:hover {
      border-color: var(--th_border_strong);

      .ui-card__title {
        color: var(--th_accent);
      }
    }

    &.ui-card_elevated:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.1);
    }

    &:has(.ui-card__action:active) {
      transform: scale(0.99);
    }

    &:has(.ui-card__action:focus-visible) {
      outline: 2px solid color-mix(in srgb, var(--th_accent) 50%, transparent);
      outline-offset: 2px;
    }
  }
  // endregion interactive
}
</style>
