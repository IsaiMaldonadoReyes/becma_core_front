import { defineStore } from 'pinia'
import axios from 'axios'
import type { TipoPrestacionModel } from '@/interfaces/nomina/default/nom10050'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface TipoPrestacionState {
  tipoPrestacion: TipoPrestacionModel[]
  responseMessage: string
}

export const useTipoPrestacionStore = defineStore({
  id: 'nominaTipoPrestacion',
  state: (): TipoPrestacionState => ({
    tipoPrestacion: [],
    responseMessage: '',
  }),
  actions: {
    async catalogoTipoPrestacion(data: any) {
      try {
        const response = await axios.post(`/api/catalogoNomina/tipoPrestacion`, data)
        this.tipoPrestacion = response.data.data
      } catch (error: any) {
        console.error('Error al obtener tipo de prestacion:', error)
        this.responseMessage = error.message
        throw error
      }
    },
  },
})
