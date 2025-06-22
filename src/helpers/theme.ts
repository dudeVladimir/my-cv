import themes from '@/ui-config/themes';
import { ColorName, ThemeColors, ThemeName, ThemeObj } from '@/ui-config/types';
import { hasKeyInObject } from '.';

/**
 * Converts a hex color string to an RGB object.
 *
 * @param hex - The hex color string (e.g., "#ff0000").
 * @returns {Object|null} An object with `r`, `g`, and `b` properties, or null if the input is invalid.
 */
export function hexToRgb(hex: string) {
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

/** * Sets CSS variables for the provided colors on the specified HTML element.
 * @param {ThemeColors} colors - An object containing color names as keys and their hex values as values.
 * @param {HTMLElement} node - The HTML element on which to set the CSS variables.
 * @example
 * setCSSVars({
 *   primary: '#ff0000',
 *   secondary: '#00ff00',
 *   accent: '#0000ff'
 */
export function setCSSVars(colors: ThemeColors, node: HTMLElement) {
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

/**
 * Connects the specified HTML element to the current theme by setting CSS variables.
 * @param {HTMLElement} element - The HTML element to connect to the theme.
 * @param {ThemeName} [currentTheme] - The name of the current theme.
 */
export function connectThemes(element: HTMLElement, currentTheme?: ThemeName) {
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
