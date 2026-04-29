import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('accessToken');

  // เช็คว่ามีตัวใดตัวหนึ่งในลำดับชั้นของ Route มี meta.requiresAuth หรือไม่
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !accessToken) {
    // ไม่มี Token และหน้าที่จะไปต้องการ Auth -> ส่งไป Login
    next('/login');
  } else if (to.path === '/login' && accessToken) {
    // มี Token อยู่แล้วแต่อยากเข้าหน้า Login -> ส่งไป Admin
    next('/admin/festival');
  } else {
    // กรณีอื่นๆ เช่น หน้าทั่วไป หรือมี Token ครบถ้วน -> อนุญาตให้ผ่าน
    next();
  }
});

export default router;
