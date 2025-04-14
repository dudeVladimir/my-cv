import type { Item, ItemValueOrText, Value } from '../types';

export function findReturnValue(selectedItem: Item, itemResult?: ItemValueOrText) {
  if (typeof selectedItem === 'string')
    return selectedItem;

  let textContent: Value = undefined;

  if (typeof itemResult === 'string')
    textContent = selectedItem?.[itemResult];

  if (typeof itemResult === 'function')
    textContent = itemResult(selectedItem);

  if (textContent && typeof textContent !== 'string' && !Number.isFinite(+textContent))
    console.warn('wrong returned type');

  return textContent;
};
