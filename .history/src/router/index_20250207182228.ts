import { createRouter, createWebHistory } from 'vue-router'
import { sessionStore } from '../stores/modules/Core/sesion'
import Login from '../views/LoginView.vue'
import SistemaForm from '../views/core/SistemaForm.vue'
import SistemaList from '../views/core/SistemaList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: Login,
      name: 'Login',
      path: '/login',
      meta: { requiresAuth: false, sistema: '' },
    },
    {
      component: SistemaForm,
      name: 'CoreSistemaForm',
      path: '/core/sistemaForm',
      meta: { requiresAuth: true, sistema: 'comercial' },
    },
    {
      component: SistemaList,
      name: 'CoreSistemaList',
      path: '/core/sistemaList',
      meta: { requiresAuth: true, sistema: 'core' },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const session = sessionStore()

  if (!session.authRoutes) {
    await session.authDirectories()
  }

  const isAuthenticated = session.authRoutes
  const userRoutes = session.userRoutes

  // Verifica si la ruta actual está permitida
  const hasAccess = userRoutes.some(
    (route: { sistema: string; ruta: string }) =>
      route.sistema === to.meta.sistema && route.ruta === to.path,
  )
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' }) // Si no está autenticado, lo manda a login
  } else if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'CoreSistemaList' }) // Si ya está autenticado, lo manda al dashboard
  } else if (to.meta.requiresAuth && !hasAccess) {
    next({ path: '/error' }) // Si no tiene acceso, lo manda a /error
  } else {
    next() // Si todo está bien, deja que navegue normalmente
  }
})

export default router
