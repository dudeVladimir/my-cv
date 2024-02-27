import { hasKeyInObject, isObject } from '@/helpers';
import { ConfigObject } from '../types';
import { Component } from 'vue';

function findModuleList(): ConfigObject[] {
  const modules = import.meta.glob('/src/modules/*/config.ts', {
    eager: true,
  });

  const moduleConfigLits: ConfigObject[] = [];

  if (!isObject(modules)) return moduleConfigLits;

  for (const path in modules) {
    if (hasKeyInObject(modules, path)) {
      const module = isObject(modules[path]) ? modules[path] : null;

      if (module) {
        moduleConfigLits.push(module.default);
      }
    }
  }

  return moduleConfigLits;
}

function findUiComponents() {
  const uiComponents = import.meta.glob('/src/ui-config/components/*.vue', {
    eager: true,
  });

  if (!isObject(uiComponents)) return [];

  const uiKit: Component = [];

  for (const key in uiComponents) {
    if (hasKeyInObject(uiComponents, key)) {
      const uiElement = uiComponents[key].default;

      const filePathArr = uiElement.__file.split('/');
      const fileName = filePathArr[filePathArr.length - 1];

      const name = fileName.split('.')[0];

      uiKit.push({ name, component: uiElement });
    }
  }

  return uiKit;
}

export { findModuleList, findUiComponents };
