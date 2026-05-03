import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   component: () => import('src/layouts/OutsiderLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/SenderPage.vue') },
  //     { path: 'list', component: () => import('pages/ListSenderPage.vue') },
  //   ],
  // },

  {
    path: '/',
    component: () => import('src/layouts/OutsiderLayout.vue'),
    children: [
      // 1. ถ้าเข้า path เปล่าๆ (/) ให้กระโดดไปที่ /1 ทันที
      {
        path: '',
        redirect: '/1',
      },

      // 2. หน้าหลัก (รับ ID)
      {
        path: ':id',
        component: () => import('pages/SenderPage.vue'),
        props: true, // ส่ง :id เข้าไปเป็น props ในหน้า SenderPage โดยอัตโนมัติ
      },

      // 3. หน้ารายชื่อ (ย้าย :id มาไว้ข้างหน้า เพื่อความสม่ำเสมอ)
      {
        path: ':id/list',
        component: () => import('pages/ListSenderPage.vue'),
        props: true,
      },

      // 4. กรณีเข้า /list เปล่าๆ ให้ไปที่ /list/1
      {
        path: 'list',
        redirect: '1/list',
      },
      // {
      //   path: 'list/:id',
      //   component: () => import('pages/ListSenderPage.vue'),
      //   props: true
      // },

      // // 4. กรณีเข้า /list เปล่าๆ ให้ไปที่ /list/1
      // {
      //   path: 'list',
      //   redirect: '/list/1'
      // }
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
      { path: 'create', component: () => import('pages/admin/create/CreatePage.vue') },
      { path: 'edit/:id', component: () => import('pages/admin/edit/EditPage.vue'), props: true },
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
