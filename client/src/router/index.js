import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import Dashboard from '../views/Dashboard.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: AboutView },
    { 
      path: '/dashboard', 
      name: 'dashboard', 
      component: Dashboard,
      meta: { requiresAuth: true } // Tambahin meta untuk proteksi
    }
  ],
});

// Navigation Guard untuk proteksi dashboard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token"); // Cek token di localStorage
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/'); // Kalau belum login, redirect ke halaman utama
  } else {
    next(); // Lanjutkan ke route tujuan
  }
});

export default router;
