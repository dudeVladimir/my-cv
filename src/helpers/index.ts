import themes from '@/ui-config/themes';
import { ColorName, ThemeColors, ThemeName, ThemeObj } from '@/ui-config/types';

function isObject(obj: unknown): boolean {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
}

function hasKeyInObject(object: unknown, key?: string): boolean {
  if (!key || !isObject(object)) return false;

  return Object.prototype.hasOwnProperty.call(object, key);
}

function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function setCSSVars(colors: ThemeColors, node: HTMLElement) {
  let key: ColorName;
  for (key in colors) {
    if (hasKeyInObject(colors, key)) {
      if (colors[key]) {
        node.style.setProperty(`--${key}`, colors[key]);
      }
      const rgbColors = hexToRgb(colors[key]);
      if (rgbColors) {
        const color = [rgbColors.r, rgbColors.g, rgbColors.b].join(', ');
        node.style.setProperty(`--${key}_rgb`, color);
      }
    }
  }
}

function connectThemes(element: HTMLElement, currentTheme?: ThemeName) {
  if (!currentTheme) {
    console.warn('current theme is null');
    return;
  }

  const theme: ThemeObj = themes[currentTheme];
  if (!theme) {
    console.warn('theme is not found');
    return;
  }

  let key: ColorName;
  for (key in theme.colors) {
    if (hasKeyInObject(theme.colors, key)) {
      element.style.setProperty(`--${key}`, theme.colors[key]);
    }
  }
}

export { connectThemes, hexToRgb, setCSSVars, isObject, hasKeyInObject };
