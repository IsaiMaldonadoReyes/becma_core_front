import { defineStore } from 'pinia'
import axios from 'axios'
import type { EmpleadoModel } from '@/interfaces/nomina/gape/EmpleadoModel'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface EmpleadoState {
  empleado: EmpleadoModel[]
  responseMessage: string
  object: any
}

export const useEmpleadoStore = defineStore({
  id: 'nominaEmpleado',
  state: (): EmpleadoState => ({
    empleado: [],
    responseMessage: '',
    object: {},
  }),
  actions: {
    async guardarEmpleado(empleado: EmpleadoModel) {
      try {
        const response = await axios.post(`/api/nominaGuardarEmpleado`, empleado)
        this.object = response.data
      } catch (error: any) {
        console.error('Error al obtener departamento:', error)
        this.responseMessage = error.message
        throw error
      }
    },
  },
})
