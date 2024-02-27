const themeNames = {
  default_dark: 'default_dark',
  default_light: 'default_light',
} as const;

export type ThemeName = keyof typeof themeNames;

export type ThemeColors = {
  th_main_background: string;
  th_primary_background: string;
  th_secondary_background: string;
  th_main_accent: string;
  th_main_text: string;
  th_secondary_text: string;
  th_primary: string;
  th_error: string;

  th_white: string;
};

export type ColorName = keyof ThemeColors;

export type ThemeObj = {
  name: ThemeName;
  description: string;
  colors: ThemeColors;
};

export function isThemeName(name?: string): name is ThemeName {
  if (!name) return false;

  return Object.keys(themeNames).includes(name);
}
