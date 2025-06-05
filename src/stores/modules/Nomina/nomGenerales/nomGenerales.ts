import { defineStore } from 'pinia'
import axios from 'axios'
import type { NominaEmpresaModel } from '@/interfaces/nomina/nomGenerales/nom10000'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface NomGeneralesState {
  empresas: NominaEmpresaModel[]
  responseMessage: string
}

export const useNomGeneralesStore = defineStore({
  id: 'nomGenerales',
  state: (): NomGeneralesState => ({
    empresas: [],
    responseMessage: '',
  }),
  actions: {
    async empresasNominas() {
      try {
        const response = await axios.post('/api/empresasNominas')
        this.empresas = response.data
      } catch (error: any) {
        console.error('Error al obtener empresas:', error)
        this.responseMessage = error.message
        throw error
      }
    },
  },
})
