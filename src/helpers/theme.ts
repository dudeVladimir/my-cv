import themes from '@/ui-config/themes';
import { ColorName, isThemeName, ThemeColors, ThemeName, ThemeObj } from '@/ui-config/types';

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
 * Sets theme colors as CSS variables (`--th_text`, ...) on the specified element.
 * For transparency use `color-mix(in srgb, var(--th_accent) 50%, transparent)`.
 *
 * @param {ThemeColors} colors - Theme colors: CSS variable names as keys, colors as values.
 * @param {HTMLElement} node - The element on which to set the CSS variables.
 */
export function setCSSVars(colors: ThemeColors, node: HTMLElement) {
  (Object.keys(colors) as ColorName[]).forEach((key) => {
    node.style.setProperty(`--${key}`, colors[key]);
  });
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

  setCSSVars(theme.colors, element);
}
