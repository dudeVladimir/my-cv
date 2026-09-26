import type { ThemeObj } from '../../../types';

const default_light: ThemeObj = {
  name: 'default_light',
  description: 'Стандартная тема (светлая)',
  colors: {
    th_bg: '#F7F7F7',
    th_surface: '#FFFFFF',
    th_surface_muted: '#EDEDED',
    th_surface_raised: '#FFFFFF',
    // При альфе 0.3 даёт то же, что чёрный с альфой 0.06
    th_shadow: '#CCCCCC',

    th_text: '#1F1F1F',
    th_text_muted: '#666666',

    th_border: '#E4E4E4',
    th_border_strong: '#C4C4C4',

    th_accent: '#A8502F',
    th_accent_hover: '#8C3F24',
    th_on_accent: '#FFFFFF',

    th_error: '#C4312B',
    th_success: '#2E7A4E',
    th_warning: '#9A5B00',
  },
};

export default default_light;
