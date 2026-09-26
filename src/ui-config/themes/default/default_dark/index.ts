import type { ThemeObj } from '../../../types';

const default_dark: ThemeObj = {
  name: 'default_dark',
  description: 'Стандартная тема (темная)',
  colors: {
    th_bg: '#161616',
    th_surface: '#1F1F1F',
    th_surface_muted: '#262626',

    th_text: '#E6E6E6',
    th_text_muted: '#A3A3A3',

    th_border: '#2C2C2C',
    th_border_strong: '#4A4A4A',

    th_accent: '#E08E6D',
    th_accent_hover: '#E6A084',
    th_on_accent: '#1A1A1A',

    th_error: '#F07A72',
    th_success: '#6CC592',
    th_warning: '#E3B060',
  },
};

export default default_dark;
