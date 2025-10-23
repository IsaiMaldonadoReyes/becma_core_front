import { defineStore } from 'pinia'
import axios from 'axios'
import type { EmpresaDatabaseModel } from '@/interfaces/core/EmpresaDatabase'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface EmpresasState {
  empresas: EmpresaDatabaseModel[]
  responseMessage: string
}

export const useEmpresasStore = defineStore({
  id: 'empresas',
  state: (): EmpresasState => ({
    empresas: [],
    responseMessage: '',
  }),
  actions: {
    async empresasNominas() {
      try {
        const response = await axios.post('/api/empresasNominas')
        this.empresas = response.data.data
      } catch (error: any) {
        console.error('Error al obtener empresas:', error)
        this.responseMessage = error.message
        throw error
      }
    },
    async empresasNominasPorCliente(clienteId: number) {
      try {
        const response = await axios.post(`/api/empresasNominasPorCliente/${clienteId}`)
        this.empresas = response.data.data
      } catch (error: any) {
        console.error('Error al obtener empresas:', error)
        this.responseMessage = error.message
        throw error
      }
    },
    async empresasNominasPorClienteEdit(clienteId: number) {
      try {
        const response = await axios.post(`/api/empresasNominasPorClienteEdit/${clienteId}`)
        this.empresas = response.data.data
      } catch (error: any) {
        console.error('Error al obtener empresas:', error)
        this.responseMessage = error.message
        throw error
      }
    },
  },
})
