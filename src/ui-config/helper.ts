import { generateUniqId } from '@/helpers';

export const generateUiElementId = (prefix: string) => `${prefix}--${generateUniqId()}`;
