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
        Чип (v-model):
      </div>
      <div class="section__body grid-ui-kit">
        <div
          v-for="size in sizes"
          :key="size"
          class="demo-chips__row"
        >
          <UiChip
            v-for="(_, idx) in selected"
            :key="idx"
            v-model="selected[idx]"
            :size="size"
          >
            Чип {{ idx + 1 }}
          </UiChip>
        </div>
      </div>
    </div>

    <div class="section mt-8">
      <div class="section__header header-l-2">
        Удаляемый, кликабельный, disabled:
      </div>
      <div class="section__body grid-ui-kit">
        <div class="demo-chips__row">
          <UiChip
            v-for="chip in removable"
            :key="chip"
            removable
            :remove-label="`Удалить ${chip}`"
            @remove-clicked="removable = removable.filter(item => item !== chip)"
          >
            {{ chip }}
          </UiChip>
          <UiButton
            v-if="removable.length < removableInitial.length"
            @click="removable = [...removableInitial]"
          >
            Вернуть
          </UiButton>
        </div>
        <div class="demo-chips__row">
          <UiChip @click="clickCount++">
            Нажат {{ clickCount }} раз
          </UiChip>
          <UiChip
            :model-value="true"
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

const sizes = ['m', 's'] as const;
const tagColors = ['neutral', 'accent', 'success', 'warning', 'error'] as const;

const selected = ref([true, false, false, false]);

const removableInitial = ['Чип 1', 'Чип 2', 'Чип 3'];
const removable = ref([...removableInitial]);

const clickCount = ref(0);
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
