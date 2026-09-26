import { isDev } from '@/helpers';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = isDev ? [
  {
    name: 'main-demo-page',
    path: '/demo',
    component: () => import('../DemoPage.vue'),
    redirect: {
      name: 'demo-base',
    },
    children: [
      {
        path: 'base',
        name: 'demo-base',
        component: () => import('../layouts/DemoBase.vue'),
      },
      {
        path: 'buttons',
        name: 'demo-buttons',
        component: () => import('../layouts/DemoButtons.vue'),
      },
      {
        path: 'fields',
        name: 'demo-fields',
        component: () => import('../layouts/DemoFields.vue'),
      },
      {
        path: 'cards',
        name: 'demo-cards',
        component: () => import('../layouts/DemoCards.vue'),
      },
      {
        path: 'chips',
        name: 'demo-chips',
        component: () => import('../layouts/DemoChips.vue'),
      },
      {
        path: 'links',
        name: 'demo-links',
        component: () => import('../layouts/DemoLinks.vue'),
      },
    ],
  },
] : [];

export default routes;
