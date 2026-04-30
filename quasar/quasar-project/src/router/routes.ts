import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/OutsiderLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SenderPage.vue') },
      { path: 'list', component: () => import('pages/ListSenderPage.vue') },
    ],
  },
  {
    path: '/',
    component: () => import('src/layouts/LoginLayout.vue'),
    children: [{ path: 'login', component: () => import('pages/admin/LoginPage.vue') }],
  },
  {
    path: '/admin',
    component: () => import('src/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'festival', component: () => import('pages/admin/FestivalPage.vue') },
      { path: 'unpolite', component: () => import('pages/admin/UnpolitePage.vue') },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
