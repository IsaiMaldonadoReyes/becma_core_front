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
    reset() {
      this.empresas = []
    },
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
        const response = await axios.post(`/api/nominaGapeEmpresa/sinAsignar`)
        this.empresas = response.data.data
      } catch (error: any) {
        console.error('Error al obtener empresas:', error)
        this.responseMessage = error.message
        throw error
      }
    },
    async empresasNominasPorClienteAsignadas(clienteId: number) {
      const data = {
        idCliente: clienteId,
      }
      try {
        const response = await axios.post(`/api/nominaGapeEmpresa/asignadasACliente`, data)
        this.empresas = response.data.data
      } catch (error: any) {
        console.error('Error al obtener empresas:', error)
        this.responseMessage = error.message
        throw error
      }
    },
  },
})
