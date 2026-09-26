export type Value = string | number | undefined;
export type Item = string | Record<string, unknown>;
/** Ключ поля объекта или функция, достающая значение из элемента */
export type ItemValueOrText = string | ((item: Item) => Value);
