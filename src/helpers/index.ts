
/**
 * Generates a unique identifier string based on the current timestamp and a random number.
 *
 * @returns {string} A unique identifier in the format `${timestamp}-${random}`.
 */
export function generateUniqId() {
  const dateTime = new Date().getTime();
  const random = (Math.random() * 10_000_000).toFixed();

  return `${dateTime}-${random}`;
};

/**
 * Checks if the provided value is a plain object (not an array and not null).
 *
 * @param obj - The value to check.
 * @returns {boolean} True if the value is a plain object, false otherwise.
 */
export function isObject(obj: unknown): boolean {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
};

/**
 * Determines if the specified key exists as a direct property of the given object.
 *
 * @param object - The object to check.
 * @param key - The property key to look for.
 * @returns {boolean} True if the key exists in the object, false otherwise.
 */
export function hasKeyInObject(object: unknown, key?: string): boolean {
  if (!key || !isObject(object)) return false;

  return Object.prototype.hasOwnProperty.call(object, key);
};

export const isDev = import.meta.env.MODE === 'development';
