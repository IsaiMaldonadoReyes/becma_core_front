import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import type { ClienteModel } from '@/interfaces/nomina/gape/ClienteModel'

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
        this.responseMessage = error.message
      }
    },

    async sincronizarEmpresas() {
      try {
        const response = await axios.post('/api/sincronizarEmpresas')
        this.responseMessage = response.data
      } catch (error: any) {
        this.responseMessage = error.message
        if (error.type === 'validation') throw error
      }
    },

    async storeCliente(data: ClienteModel) {
      try {
        const response = await axios.post('/api/nominaGapeCliente/store', data)
        this.clientes = response.data
      } catch (error: any) {
        this.responseMessage = error.message
        if (error.type === 'validation') throw error
      }
    },

    async updateCliente(data: ClienteModel, id: number) {
      try {
        const response = await axios.put(`/api/nominaGapeCliente/update/${id}`, data)
        this.clientes = response.data
      } catch (error: any) {
        this.responseMessage = error.message
        if (error.type === 'validation') throw error
      }
    },

    async destroyCliente(id: number) {
      try {
        const response = await axios.delete(`/api/nominaGapeCliente/destroy/${id}`)
        this.clientes = response.data
      } catch (error: any) {
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
        this.responseMessage = error.message
      }
    },
    async catalogoCliente() {
      try {
        const response = await axios.post(`/api/catalogoNomina/gapeCliente`)
        this.clientes = response.data.data
      } catch (error: any) {
        this.responseMessage = error.message
      }
    },
  },
})
