// Иконки — svg-файлы из этой папки. Цвет — currentColor, размер задаёт UiIcon.
// Новая иконка: положить файл и добавить его сюда
import arrowUpRight from './arrow-up-right.svg?raw';
import check from './check.svg?raw';
import close from './close.svg?raw';

export const icons = {
  'arrow-up-right': arrowUpRight,
  check,
  close,
};

export type IconName = keyof typeof icons;
