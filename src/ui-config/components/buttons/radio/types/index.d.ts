export type Item = string | { [key: string]: never };
export type ItemValueOrText = string | ((item: Item) => string | number);
export type Value = string | number | undefined;
