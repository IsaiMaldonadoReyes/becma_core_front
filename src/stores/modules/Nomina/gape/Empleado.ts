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
        const response = await axios.post(`/api/nominaGapeEmpleado/store`, empleado)
        this.object = response.data
      } catch (error: any) {
        console.error('Error al obtener departamento:', error)
        this.responseMessage = error.message
        throw error
      }
    },
    async actualizarEmpleado(empleado: EmpleadoModel) {
      try {
        const response = await axios.put(`/api/nominaGapeEmpleado/update`, empleado)
        this.object = response.data
      } catch (error: any) {
        console.error('Error al obtener departamento:', error)
        this.responseMessage = error.message
        throw error
      }
    },
    async guardarEmpleadoNoFiscal(empleado: EmpleadoModel) {
      try {
        const response = await axios.post(`/api/nominaGapeEmpleado/storeNoFiscal`, empleado)
        this.object = response.data
      } catch (error: any) {
        console.error('Error al obtener departamento:', error)
        this.responseMessage = error.message
        throw error
      }
    },
    async actualizarEmpleadoNoFiscal(empleado: EmpleadoModel) {
      try {
        const response = await axios.put(`/api/nominaGapeEmpleado/updateNoFiscal`, empleado)
        this.object = response.data
      } catch (error: any) {
        console.error('Error al obtener departamento:', error)
        this.responseMessage = error.message
        throw error
      }
    },
    async indexEmpleados(data: any) {
      try {
        const response = await axios.post('/api/nominaGapeEmpleado/index', data)
        this.empleado = response.data.data
      } catch (error: any) {
        console.error(error)
        this.responseMessage = error.message
      }
    },
    async editEmpleado(data: any) {
      try {
        const response = await axios.post('/api/nominaGapeEmpleado/edit', data)
        this.empleado = response.data.data
        return response.data.data
      } catch (error: any) {
        console.error(error)
        this.responseMessage = error.message
      }
    },
  },
})
