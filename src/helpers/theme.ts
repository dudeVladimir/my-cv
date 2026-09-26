import themes from '@/ui-config/themes';
import { ColorName, isThemeName, ThemeColors, ThemeName, ThemeObj } from '@/ui-config/types';
import { hasKeyInObject } from '.';

export const THEME_STORAGE_KEY = 'themeName';
export const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)';

/**
 * Returns the theme name chosen by the user and saved in localStorage.
 *
 * @returns {ThemeName | null} The saved theme name, or null if the user has not chosen a theme.
 */
export function getSavedThemeName(): ThemeName | null {
  const themeName = localStorage.getItem(THEME_STORAGE_KEY);
  return themeName && isThemeName(themeName) ? themeName : null;
}

/**
 * Returns the default theme name that matches the system color scheme.
 *
 * @returns {ThemeName} `default_dark` if the system prefers a dark scheme, otherwise `default_light`.
 */
export function getSystemThemeName(): ThemeName {
  return window.matchMedia(DARK_SCHEME_QUERY).matches
    ? 'default_dark'
    : 'default_light';
}

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
