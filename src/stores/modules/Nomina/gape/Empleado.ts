import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import type { EmpleadoModel } from '@/interfaces/nomina/gape/EmpleadoModel'

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
        this.responseMessage = error.message
        if (error.type === 'validation') throw error
      }
    },
    async actualizarEmpleado(empleado: EmpleadoModel) {
      try {
        const response = await axios.put(`/api/nominaGapeEmpleado/update`, empleado)
        this.object = response.data
      } catch (error: any) {
        this.responseMessage = error.message
        if (error.type === 'validation') throw error
      }
    },
    async guardarEmpleadoNoFiscal(empleado: EmpleadoModel) {
      try {
        const response = await axios.post(`/api/nominaGapeEmpleado/storeNoFiscal`, empleado)
        this.object = response.data

        return response.data
      } catch (error: any) {
        this.responseMessage = error.message
        if (error.type === 'validation') throw error
      }
    },
    async actualizarEmpleadoNoFiscal(empleado: EmpleadoModel) {
      try {
        const response = await axios.put(`/api/nominaGapeEmpleado/updateNoFiscal`, empleado)
        this.object = response.data
      } catch (error: any) {
        this.responseMessage = error.message
        if (error.type === 'validation') throw error
      }
    },
    async indexEmpleados(data: any) {
      try {
        const response = await axios.post('/api/nominaGapeEmpleado/index', data)
        this.empleado = response.data.data
      } catch (error: any) {
        this.responseMessage = error.message
      }
    },
    async editEmpleado(data: any) {
      try {
        const response = await axios.post('/api/nominaGapeEmpleado/edit', data)
        this.empleado = response.data.data
        return response.data.data
      } catch (error: any) {
        this.responseMessage = error.message
      }
    },
    async listEmpleadosNoFiscales(data: any) {
      try {
        const response = await axios.post('/api/nominaGapeEmpleado/noFiscalesEmpresaCliente', data)
        this.empleado = response.data.data
      } catch (error: any) {
        this.responseMessage = error.message
      }
    },
    async listEmpleadosFiscales(data: any) {
      try {
        const response = await axios.post('/api/nominaGapeEmpleado/fiscalesEmpresaCliente', data)
        this.empleado = response.data.data
      } catch (error: any) {
        this.responseMessage = error.message
      }
    },
  },
})
