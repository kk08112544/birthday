import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log('[guard] going to:', to.path); // <-- เพิ่มบรรทัดนี้
  const accessToken = localStorage.getItem('accessToken');
  const role = localStorage.getItem('role');
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  const isSuperAdmin = role === 'superAdmin';
  if (requiresAuth && !accessToken) {
    console.log('[guard] -> redirect login'); // <--
    next('/backoffice/login');
  } else if (to.path === '/backoffice/login' && accessToken) {
    console.log('[guard] -> redirect festival'); // <--
    next('/backoffice/festival');
  } else if (to.path.startsWith('/backoffice/admin') && !isSuperAdmin) {
    next('/backoffice/festival');
  } else {
    console.log('[guard] -> next() pass'); // <--
    next();
  }
});

export default router;
