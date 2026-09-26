const themeNames = {
  default_dark: 'default_dark',
  default_light: 'default_light',
} as const;

export type ThemeName = keyof typeof themeNames;

export type ThemeColors = {
  // region surfaces
  /** Page background */
  th_bg: string;
  /** Raised blocks: header, cards, fields */
  th_surface: string;
  /** Subtle fills: disabled states, hover backgrounds */
  th_surface_muted: string;
  /**
   * Elevated blocks (elevated card). In dark themes it is lighter than th_surface:
   * shadows are barely visible on a dark background
   */
  th_surface_raised: string;
  /**
   * Shadow color, used with a fixed alpha: color-mix(in srgb, var(--th_shadow) 30%, transparent).
   * Shadow strength is tuned by the color: lighter color — weaker shadow
   */
  th_shadow: string;
  // endregion surfaces

  // region text
  th_text: string;
  th_text_muted: string;
  // endregion text

  // region borders
  /** Dividers and decorative borders */
  th_border: string;
  /** Borders of interactive elements */
  th_border_strong: string;
  // endregion borders

  // region accent
  th_accent: string;
  th_accent_hover: string;
  /** Text and icons on top of th_accent */
  th_on_accent: string;
  // endregion accent

  // region statuses
  th_error: string;
  th_success: string;
  th_warning: string;
  // endregion statuses
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
