import demoConfig from '@/modules/demo-page/config';
import { ConfigObject } from '@/modules/types';
import type { Component } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { isDev, isObject } from '.';

type Module<T> = () => Promise<{ default: T }>;
type ModuleConfig = Record<string, Module<ConfigObject>>;
type ModuleComponent = Record<string, Module<Component & { __file?: string, __name?: string }>>;

/**
 * Finds and returns a list of module configurations defined in the application.
 *
 * @returns {Promise<ConfigObject[]>} A promise that resolves to an array of module configurations.
 */
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

/**
 * Finds and returns a list of UI components defined in the application.
 *
 * @returns {Promise<ComponentOptions[]>} A promise that resolves to an array of UI component options.
 */
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

/**
 * Initializes the module configurations by discovering and returning all module routes.
 * @returns {Promise<{ routes: RouteRecordRaw[] }>} A promise that resolves to an object containing the module routes.
 */
async function initModulesConfig() {
  const moduleList = await findModuleList();

  const routes: RouteRecordRaw[] = [];
  moduleList.forEach((module) => {
    if (demoConfig.name === module.name && !isDev)
      return; // skip demo module in production

    if (!Array.isArray(module.routes)) return;
    routes.push(...module.routes);
  });

  return {
    routes,
  };
}


/**
 * Initializes the UI Kit by discovering and returning all UI components.
 *
 * @returns {Promise<ComponentOptions[]>} A promise that resolves to the list of found UI components.
 */
async function initUiKit() {
  const uiComponents = await findUiComponents();
  return uiComponents;
}

/**
 * Initializes the main elements of the application, including module configurations and UI components.
 *
 * @returns {Promise<{ modules: ConfigObject | null, uiKit: ComponentOptions[] | null }>} A promise that resolves to an object containing the module configurations and UI components.
 */
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
