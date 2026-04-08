import { createRouter, createWebHistory } from 'vue-router'
import { sessionStore } from '../stores/modules/Core/sesion'
import Login from '../views/LoginView.vue'
//import SistemaForm from '../views/core/SistemaForm.vue'
import SistemaList from '../views/core/SistemaList.vue'
import EmpleadoList from '@/views/nominas/gape/EmpleadoList.vue'
import EmpleadoForm from '@/views/nominas/gape/EmpleadoForm.vue'
import EmpresaForm from '@/views/nominas/gape/EmpresaForm.vue'
import EmpresaList from '@/views/nominas/gape/EmpresaList.vue'
import ParametrizacionForm from '@/views/nominas/gape/ParametrizacionForm.vue'
import ParametrizacionList from '@/views/nominas/gape/ParametrizacionList.vue'
import IncidenciasForm from '@/views/nominas/gape/IncidenciasForm.vue'
import ClienteModalForm from '@/views/nominas/gape/ClienteModalForm.vue'
import ClienteList from '@/views/nominas/gape/ClienteList.vue'
import PrenominaForm from '@/views/nominas/gape/PrenominaForm.vue'
//import LayoutDispersion from '@/views/nominas/gape/LayoutDispersion.vue'
import LayoutDispersion from '@/views/nominas/gape/BancoDispersionForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
        const session = sessionStore()
        return session.auth ? '/nominas/gape/clienteList' : '/login'
      },
    },
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
      component: EmpleadoList,
      name: 'EmpleadoList',
      path: '/nominas/gape/empleadoList',
      meta: { requiresAuth: true, sistema: 'nominas' },
    },
    {
      component: EmpleadoForm,
      name: 'EmpleadoForm',
      path: '/nominas/gape/empleadoForm',
      meta: { requiresAuth: true, sistema: 'nominas' },
    },
    {
      component: EmpleadoForm,
      name: 'EmpleadoUpdateForm',
      path: '/nominas/gape/empleadoForm/:id',
      meta: { requiresAuth: true, sistema: 'nominas' },
      props: (route) => ({
        id: Number(route.params.id),
      }),
    },
    {
      component: EmpresaForm,
      name: 'EmpresaForm',
      path: '/nominas/gape/empresaForm',
      meta: { requiresAuth: true, sistema: 'nominas' },
    },
    {
      component: EmpresaForm,
      name: 'EmpresaUpdateForm',
      path: '/nominas/gape/empresaForm/:id',
      meta: { requiresAuth: true, sistema: 'nominas' },
      props: (route) => ({
        id: Number(route.params.id),
      }),
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
      component: ParametrizacionForm,
      name: 'ParametrizacionUpdateForm',
      path: '/nominas/gape/parametrizacionForm/:id',
      meta: { requiresAuth: true, sistema: 'nominas' },
      props: (route) => ({
        id: Number(route.params.id),
      }),
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
      component: PrenominaForm,
      name: 'PrenominaForm',
      path: '/nominas/gape/prenominaForm',
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

  // 1️⃣ Solo validar sesión UNA VEZ
  if (session.auth === null) {
    await session.authUserInformation()
  }

  // 2️⃣ Ruta protegida y NO autenticado
  if (to.meta.requiresAuth && session.auth === false) {
    return next({ name: 'Login' })
  }

  // 3️⃣ Usuario autenticado intentando ir a Login
  if (to.name === 'Login' && session.auth === true) {
    return next({ name: 'ClienteList' })
  }

  next()
})

export default router
