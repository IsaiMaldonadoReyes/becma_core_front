import { defineStore } from 'pinia'
import axios from 'axios'
import type { ClienteModel } from '@/interfaces/nomina/gape/ClienteModel'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface ClienteState {
  clientes: ClienteModel[]
  responseMessage: string
}

export const useClienteStore = defineStore({
  id: 'cliente',
  state: (): ClienteState => ({
    clientes: [],
    responseMessage: '',
  }),
  actions: {
    async indexClientes() {
      try {
        const response = await axios.get('/api/nominaGapeCliente/index')
        this.clientes = response.data.data
      } catch (error: any) {
        console.error(error)
        this.responseMessage = error.message
      }
    },

    async sincronizarEmpresas() {
      try {
        const response = await axios.post('/api/sincronizarEmpresas')
        this.responseMessage = response.data
      } catch (error: any) {
        this._handleError(error)
        throw error
      }
    },

    async storeCliente(data: ClienteModel) {
      try {
        const response = await axios.post('/api/nominaGapeCliente/store', data)
        this.clientes = response.data
      } catch (error: any) {
        this._handleError(error)
        throw error
      }
    },

    async updateCliente(data: ClienteModel, id: number) {
      try {
        const response = await axios.put(`/api/nominaGapeCliente/update/${id}`, data)
        this.clientes = response.data
      } catch (error: any) {
        this._handleError(error)
        throw error
      }
    },

    async destroyCliente(id: number) {
      try {
        const response = await axios.delete(`/api/nominaGapeCliente/destroy/${id}`)
        this.clientes = response.data
      } catch (error: any) {
        console.error(error)
        this.responseMessage = error.message
      }
    },

    async destroyClientesByIds(ids: number[]) {
      try {
        const response = await axios.delete(`/api/nominaGapeCliente/destroyByIds`, {
          data: { ids },
        })
        this.clientes = response.data
      } catch (error: any) {
        console.error(error)
        this.responseMessage = error.message
      }
    },
    async catalogoCliente() {
      try {
        const response = await axios.post(`/api/catalogoNomina/gapeCliente`)
        this.clientes = response.data.data
      } catch (error: any) {
        console.error('Error al obtener clientes:', error)
        this.responseMessage = error.message
        throw error
      }
    },

    _handleError(error: any) {
      if (error.response) {
        const status = error.response.status
        if (status === 422) {
          this.responseMessage = 'Error de validación'
          throw {
            type: 'validation',
            errors: error.response.data.errors,
            message: error.response.data.message,
          }
        }
        this.responseMessage = error.response.data.message || 'Error en la petición'
      } else {
        this.responseMessage = error.message || 'Error desconocido'
      }
    },
  },
})
