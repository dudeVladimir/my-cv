import { RouteRecordRaw } from 'vue-router';

export type ConfigObject = {
  name: string;
  title: string;
  routes: RouteRecordRaw[];
  isMain?: boolean;
};
