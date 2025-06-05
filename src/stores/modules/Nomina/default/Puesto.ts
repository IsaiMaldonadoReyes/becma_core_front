import { defineStore } from 'pinia'
import axios from 'axios'
import type { PuestoModel } from '@/interfaces/nomina/default/nom10006'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface PuestoState {
  puesto: PuestoModel[]
  responseMessage: string
}

export const usePuestoStore = defineStore({
  id: 'nominaPuesto',
  state: (): PuestoState => ({
    puesto: [],
    responseMessage: '',
  }),
  actions: {
    async catalogoPuesto(idEmpresa: number) {
      try {
        const response = await axios.post(`/api/nominaPuesto/${idEmpresa}`)
        this.puesto = response.data.data
      } catch (error: any) {
        console.error('Error al obtener puesto:', error)
        this.responseMessage = error.message
        throw error
      }
    },
  },
})
