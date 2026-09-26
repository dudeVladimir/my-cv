import type { Item, ItemValueOrText, Value } from '../types';

export function findReturnValue(item: Item, itemResult?: ItemValueOrText): Value {
  if (typeof item === 'string')
    return item;

  let result: unknown = undefined;

  if (typeof itemResult === 'string')
    result = item[itemResult];

  if (typeof itemResult === 'function')
    result = itemResult(item);

  if (result === undefined || typeof result === 'string' || typeof result === 'number')
    return result;

  console.warn('wrong returned type', result);
  return undefined;
};
