import type { ConfigObject } from '@/modules/types';
import type { Component } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { isObject } from '.';

type Module<T> = () => Promise<{ default: T }>;
type ModuleConfig = Record<string, Module<ConfigObject>>;
type ModuleComponent = Record<string, Module<Component & { __file?: string, __name?: string }>>;

async function findModuleList() {
  const modules = import.meta.glob('/src/modules/*/config.ts') as ModuleConfig;

  const moduleConfigLits: ConfigObject[] = [];

  if (!isObject(modules)) return moduleConfigLits;

  await Promise.all(
    Object.keys(modules).map(async (path) => {
      try {
        const module = await modules[path]();
        if (!module) throw new Error('module not found');
        moduleConfigLits.push(module.default);
      } catch (error) {
        console.error(error);
        console.warn('something went wrong with upload app modules:', path);
      }
    }),
  );

  return moduleConfigLits;
}

async function findUiComponents() {
  const uiComponents = import.meta.glob(
    ['/src/ui-config/components/*/*.vue', '/src/ui-config/components/*/*/*.vue'],
  ) as ModuleComponent;

  if (!isObject(uiComponents)) return [];

  const uiKit: Component = [];

  await Promise.all(
    Object.keys(uiComponents).map(async (key) => {
      try {
        const uiElement = await uiComponents[key]();
        if (!uiElement) throw new Error('component not found');

        const filePathArr = uiElement.default.__file?.split('/');
        const fileName = filePathArr?.[filePathArr.length - 1] ?? uiElement.default?.__name;

        const name = fileName?.split('.')[0];

        uiKit.push({ name, component: uiElement.default });
      } catch (error) {
        console.error(error);
        console.warn('something went wrong with upload app modules:', key);
      }
    }),
  );

  return uiKit;
}

async function initModulesConfig() {
  const moduleList = await findModuleList();

  // =======================
  // Регистрация всех роутов
  const routes: RouteRecordRaw[] = [];
  moduleList.forEach((module) => {
    if (!Array.isArray(module.routes)) return;
    routes.push(...module.routes);
  });
  // =======================

  return {
    routes,
  };
}

async function initUiKit() {
  // Объявление глобальных компонентов
  const uiComponents = await findUiComponents();
  return uiComponents;
}

export async function initMainElements() {
  const [modules, uiKit] = await Promise.allSettled([
    await initModulesConfig(),
    await initUiKit(),
  ]);

  return {
    modules:
      modules.status === 'fulfilled' && modules.value ? modules.value : null,
    uiKit: uiKit.status === 'fulfilled' && uiKit.value ? uiKit.value : null,
  };
}
