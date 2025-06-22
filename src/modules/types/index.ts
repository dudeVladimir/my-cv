import { RouteRecordRaw } from 'vue-router';

/**
 * Represents the configuration object for a module.
 *
 * @property name - Unique name of the module, used for routing and identification.
 * @property title - Title of the module, used for display purposes.
 * @property routes - Array of route records associated with the module.
 */
export type ConfigObject = {
  name: string;
  title: string;
  routes: RouteRecordRaw[];
};
