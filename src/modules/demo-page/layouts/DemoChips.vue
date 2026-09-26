<template>
  <div class="demo-chips">
    <div class="section">
      <div class="section__header header-l-2">
        Тег:
      </div>
      <div class="section__body grid-ui-kit">
        <div
          v-for="size in sizes"
          :key="size"
          class="demo-chips__row"
        >
          <UiTag
            v-for="color in tagColors"
            :key="color"
            :color="color"
            :size="size"
          >
            {{ color }} {{ size }}
          </UiTag>
        </div>
      </div>
    </div>

    <div class="section mt-8">
      <div class="section__header header-l-2">
        Чип-фильтр (v-model):
      </div>
      <div class="section__body grid-ui-kit">
        <div class="demo-chips__row">
          <UiChip
            v-for="tech in techs"
            :key="tech"
            :model-value="selectedTechs.includes(tech)"
            @update:model-value="toggleTech(tech, $event)"
          >
            {{ tech }}
          </UiChip>
        </div>
        <div class="demo-chips__row">
          <UiChip
            v-for="tech in techs"
            :key="tech"
            :model-value="selectedTechs.includes(tech)"
            size="s"
            @update:model-value="toggleTech(tech, $event)"
          >
            {{ tech }}
          </UiChip>
        </div>
        <div class="text-s-2 th_text_muted--text">
          Выбрано: {{ selectedTechs.join(', ') || '—' }}
        </div>
      </div>
    </div>

    <div class="section mt-8">
      <div class="section__header header-l-2">
        Удаляемые, кликабельные, disabled:
      </div>
      <div class="section__body grid-ui-kit">
        <div class="demo-chips__row">
          <UiChip
            v-for="tech in removableTechs"
            :key="tech"
            removable
            :remove-label="`Удалить ${tech}`"
            @remove-clicked="removeTech(tech)"
          >
            {{ tech }}
          </UiChip>
          <UiButton
            v-if="removableTechs.length < techs.length"
            @click="removableTechs = [...techs]"
          >
            Вернуть
          </UiButton>
        </div>
        <div class="demo-chips__row">
          <UiChip @click="clickCount++">
            Кликнут {{ clickCount }} раз
          </UiChip>
          <UiChip
            v-model="disabledSelected"
            disabled
          >
            Disabled выбран
          </UiChip>
          <UiChip
            disabled
            removable
          >
            Disabled
          </UiChip>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const sizes = ['s', 'm'] as const;
const tagColors = ['neutral', 'accent', 'success', 'warning', 'error'] as const;

const techs = ['Vue 3', 'TypeScript', 'Pinia', 'Vite', 'SCSS'];

const selectedTechs = ref<string[]>(['Vue 3']);
function toggleTech(tech: string, isSelected: boolean) {
  selectedTechs.value = isSelected
    ? [...selectedTechs.value, tech]
    : selectedTechs.value.filter(item => item !== tech);
};

const removableTechs = ref([...techs]);
function removeTech(tech: string) {
  removableTechs.value = removableTechs.value.filter(item => item !== tech);
};

const clickCount = ref(0);
const disabledSelected = ref(true);
</script>

<style lang="scss" scoped>
.demo-chips {
  &__row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }
}
</style>
