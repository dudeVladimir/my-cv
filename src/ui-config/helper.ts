import { generateUniqId } from '_helpers/index';

export const generateUiElementId = (prefix: string) => `${prefix}--${generateUniqId()}`;
