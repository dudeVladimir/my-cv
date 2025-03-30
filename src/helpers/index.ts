function generateUniqId() {
  const dateTime = new Date().getTime();
  const random = (Math.random() * 10_000_000).toFixed();

  return `${dateTime}-${random}`;
};

function isObject(obj: unknown): boolean {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
};

function hasKeyInObject(object: unknown, key?: string): boolean {
  if (!key || !isObject(object)) return false;

  return Object.prototype.hasOwnProperty.call(object, key);
};

const isDev = import.meta.env.MODE === 'development';

export { generateUniqId, hasKeyInObject, isDev, isObject };
