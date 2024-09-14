import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/views/login/login.vue'),
    meta: {
      title: 'Login - To Do'
    }
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

// router.afterEach((to) => {
//   document.title = to.meta.title
// })

export default router