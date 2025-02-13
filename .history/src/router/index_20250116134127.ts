import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import SistemaForm from '../views/core/SistemaForm.vue'
import SistemaList from '../views/core/SistemaList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      component: Login,
      name: 'Login',
      path: '/login',
    },
    {
      component: Login,
      name: 'Login',
      path: '/login',
    },
  ],
})

export default router
