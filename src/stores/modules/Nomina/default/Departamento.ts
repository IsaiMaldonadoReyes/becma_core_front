import { defineStore } from 'pinia'
import axios from 'axios'
import type { DepartamentoModel } from '@/interfaces/nomina/default/nom10003'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface DepartamentoState {
  departamento: DepartamentoModel[]
  responseMessage: string
}

export const useDepartamentoStore = defineStore({
  id: 'nominaDepartamento',
  state: (): DepartamentoState => ({
    departamento: [],
    responseMessage: '',
  }),
  actions: {
    async catalogoDepartamento(data: any) {
      try {
        const response = await axios.post(`/api/catalogoNomina/departamento`, data)
        this.departamento = response.data.data
      } catch (error: any) {
        console.error('Error al obtener departamento:', error)
        this.responseMessage = error.message
        throw error
      }
    },
  },
})
