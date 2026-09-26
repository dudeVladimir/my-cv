<template>
  <div class="demo-cards">
    <div class="section">
      <div class="section__header header-l-2">
        Варианты:
      </div>
      <div class="section__body grid-ui-kit variants">
        <UiCard
          v-for="variant in variants"
          :key="variant"
          :variant="variant"
          :title="variant"
          subtitle="Подзаголовок"
        >
          Обычный текст карточки.
        </UiCard>
        <UiCard
          title="accent"
          subtitle="Любой вариант + accent"
          accent
        >
          Выделить главное.
        </UiCard>
      </div>
    </div>

    <div class="section mt-8">
      <div class="section__header header-l-2">
        Опыт работы:
      </div>
      <div class="section__body grid-ui-kit">
        <UiCard
          v-for="job in jobs"
          :key="job.company"
          tag="article"
          :title="job.position"
          :subtitle="job.company"
          :accent="job.isCurrent"
        >
          <template #header-append>
            {{ job.period }}
          </template>
          <ul class="demo-cards__list">
            <li
              v-for="task in job.tasks"
              :key="task"
            >
              {{ task }}
            </li>
          </ul>
          <template #footer>
            <UiTag
              v-for="tech in job.stack"
              :key="tech"
            >
              {{ tech }}
            </UiTag>
          </template>
        </UiCard>
      </div>
    </div>

    <div class="section mt-8">
      <div class="section__header header-l-2">
        Проекты (клик по карточке + ссылки внутри):
      </div>
      <div class="section__body grid-ui-kit projects">
        <UiCard
          v-for="project in projects"
          :key="project.name"
          tag="article"
          variant="elevated"
          :title="project.name"
          clickable
          @click="openedProject = project.name"
        >
          <template #media>
            <div
              class="demo-cards__preview"
              :style="{ background: project.preview }"
            />
          </template>
          {{ project.description }}
          <template #footer>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >GitHub</a>
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
            >Демо</a>
          </template>
        </UiCard>
      </div>
      <div class="text-s-2 th_text_muted--text mt-3">
        Открыт: {{ openedProject || '—' }}
      </div>
    </div>

    <div class="section mt-8">
      <div class="section__header header-l-2">
        Навыки (size s):
      </div>
      <ul class="section__body grid-ui-kit skills">
        <UiCard
          v-for="skill in skills"
          :key="skill"
          tag="li"
          variant="filled"
          size="s"
        >
          {{ skill }}
        </UiCard>
      </ul>
    </div>

    <div class="section mt-8">
      <div class="section__header header-l-2">
        Ссылки и секция (size l):
      </div>
      <div class="section__body grid-ui-kit">
        <UiCard
          :to="{ name: 'demo-buttons' }"
          title="Карточка-ссылка внутри приложения"
          subtitle="Проп to — ведёт в раздел кнопок"
        />
        <UiCard
          href="https://vuejs.org"
          new-tab
          title="Карточка-ссылка наружу"
          subtitle="Проп href + new-tab"
        />
        <UiCard
          tag="section"
          size="l"
          title-tag="h2"
          title="Связаться"
        >
          <div class="demo-cards__form">
            <UiTextField
              v-model="contactName"
              label="Имя"
            />
            <UiButton variant="primary">
              Отправить
            </UiButton>
          </div>
        </UiCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const variants = ['outlined', 'filled', 'elevated'] as const;

const jobs = [
  {
    company: 'Компания А',
    position: 'Frontend-разработчик',
    period: '2023 — сейчас',
    isCurrent: true,
    tasks: ['Разработка UI-кита', 'Перевод проекта на Vue 3 и TypeScript'],
    stack: ['Vue 3', 'TypeScript', 'Pinia', 'SCSS'],
  },
  {
    company: 'Компания Б',
    position: 'Junior frontend-разработчик',
    period: '2021 — 2023',
    isCurrent: false,
    tasks: ['Вёрстка лендингов', 'Поддержка админ-панели'],
    stack: ['Vue 2', 'JavaScript'],
  },
];

const projects = [
  {
    name: 'Сайт-резюме',
    description: 'Этот сайт: темы, UI-кит, витрина компонентов.',
    preview: 'linear-gradient(135deg, var(--th_accent), var(--th_surface_muted))',
  },
  {
    name: 'Пет-проект',
    description: 'Карточка кликабельна целиком, но ссылки внизу работают отдельно.',
    preview: 'linear-gradient(135deg, var(--th_success), var(--th_surface_muted))',
  },
];

const skills = ['Vue 3', 'TypeScript', 'Pinia', 'Vite', 'SCSS', 'Git'];

const openedProject = ref('');
const contactName = ref('');
</script>

<style lang="scss" scoped>
.demo-cards {
  .section__body {
    &.variants {
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    }
    &.projects {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
    &.skills {
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }
  }

  &__list {
    padding-left: 20px;
    list-style: disc;
  }

  &__preview {
    height: 140px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .ui-button {
      align-self: flex-start;
    }
  }
}
</style>
