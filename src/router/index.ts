import { createRouter, createWebHistory } from 'vue-router'
import { sessionStore } from '../stores/modules/Core/sesion'
import Login from '../views/LoginView.vue'
//import SistemaForm from '../views/core/SistemaForm.vue'
import SistemaList from '../views/core/SistemaList.vue'
import VentasPorMarcasChart from '@/views/comercial/VentasPorMarcasChart.vue'
import VentasPorConcepto from '@/views/comercial/VentaPorConceptoChart.vue'
import PresupuestosChart from '@/views/comercial/PresupuestosChart.vue'
import EmpleadoList from '@/views/nominas/EmpleadoList.vue'
import EmpleadoForm from '@/views/nominas/EmpleadoForm.vue'
import EmpresaForm from '@/views/nominas/gape/EmpresaForm.vue'
import EmpresaList from '@/views/nominas/gape/EmpresaList.vue'
import ParametrizacionForm from '@/views/nominas/gape/ParametrizacionForm.vue'
import ParametrizacionList from '@/views/nominas/gape/ParametrizacionList.vue'
import LayoutDispersion from '@/views/nominas/gape/LayoutDispersion.vue'
import IncidenciasForm from '@/views/nominas/gape/IncidenciasForm.vue'
import ClienteModalForm from '@/views/nominas/gape/ClienteModalForm.vue'
import ClienteList from '@/views/nominas/gape/ClienteList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: Login,
      name: 'Login',
      path: '/login',
      meta: { requiresAuth: false, sistema: '' },
    },
    /*{
      component: SistemaForm,
      name: 'CoreSistemaForm',
      path: '/core/sistemaForm',
      meta: { requiresAuth: true, sistema: 'comercial' },
    },*/
    {
      component: SistemaList,
      name: 'CoreSistemaList',
      path: '/core/sistemaList',
      meta: { requiresAuth: true, sistema: 'core' },
    },
    {
      component: VentasPorMarcasChart,
      name: 'ComercialVentasPorMarcasChart',
      path: '/comercial/ventasPorMarcasChart',
      meta: { requiresAuth: true, sistema: 'comercial' },
    },
    {
      component: VentasPorConcepto,
      name: 'ComercialVentasPorConceptoChart',
      path: '/comercial/ventasPorConceptoChart',
      meta: { requiresAuth: true, sistema: 'comercial' },
    },
    {
      component: PresupuestosChart,
      name: 'PresupuestosChart',
      path: '/comercial/presupuestosChart',
      meta: { requiresAuth: true, sistema: 'comercial' },
    },

    {
      component: EmpleadoList,
      name: 'EmpleadoList',
      path: '/nominas/empleadoList',
      meta: { requiresAuth: true, sistema: 'nominas' },
    },
    {
      component: EmpleadoForm,
      name: 'EmpleadoForm',
      path: '/nominas/empleadoForm',
      meta: { requiresAuth: true, sistema: 'nominas' },
    },
    {
      component: EmpresaForm,
      name: 'EmpresaForm',
      path: '/nominas/gape/empresaForm',
      meta: { requiresAuth: true, sistema: 'nominas' },
    },
    {
      component: EmpresaList,
      name: 'EmpresaList',
      path: '/nominas/gape/empresaList',
      meta: { requiresAuth: true, sistema: 'nominas' },
    },
    {
      component: ParametrizacionList,
      name: 'ParametrizacionList',
      path: '/nominas/gape/parametrizacionList',
      meta: { requiresAuth: true, sistema: 'nominas' },
    },
    {
      component: ParametrizacionForm,
      name: 'ParametrizacionForm',
      path: '/nominas/gape/parametrizacionForm',
      meta: { requiresAuth: true, sistema: 'nominas' },
    },
    {
      component: LayoutDispersion,
      name: 'LayoutDispersion',
      path: '/nominas/gape/layoutDispersion',
      meta: { requiresAuth: true, sistema: 'nominas' },
    },
    {
      component: IncidenciasForm,
      name: 'IncidenciasForm',
      path: '/nominas/gape/incidenciasForm',
      meta: { requiresAuth: true, sistema: 'nominas' },
    },
    {
      component: ClienteModalForm,
      name: 'ClienteModalForm',
      path: '/nominas/gape/clienteModalForm',
      meta: { requiresAuth: true, sistema: 'nominas' },
    },
    {
      component: ClienteList,
      name: 'ClienteList',
      path: '/nominas/gape/clienteList',
      meta: { requiresAuth: true, sistema: 'nominas' },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const session = sessionStore()

  if (!session.auth) {
    await session.authUserInformation()
  }

  /*

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
  */

  next()
})

export default router
