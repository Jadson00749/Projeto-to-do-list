import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/register',
    component: () => import('@/views/login/register.vue')
  },
  {
    path: '/tasks',
    component: () => import('@/views/main.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router