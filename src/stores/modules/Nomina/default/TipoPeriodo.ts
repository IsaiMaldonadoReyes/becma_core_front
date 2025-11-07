import { defineStore } from 'pinia'
import axios from 'axios'
import type { TipoPeriodoModel } from '@/interfaces/nomina/default/nom10023'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface TipoPeriodoState {
  tipoPeriodo: TipoPeriodoModel[]
  responseMessage: string
}

export const useTipoPeriodoStore = defineStore({
  id: 'nominaTipoPeriodo',
  state: (): TipoPeriodoState => ({
    tipoPeriodo: [],
    responseMessage: '',
  }),
  actions: {
    reset() {
      this.tipoPeriodo = []
    },
    async catalogoTipoPeriodo(data: any) {
      try {
        const response = await axios.post(`/api/catalogoNomina/tipoPeriodo`, data)
        this.tipoPeriodo = response.data.data
      } catch (error: any) {
        console.error('Error al obtener tipo de periodo:', error)
        this.responseMessage = error.message
        throw error
      }
    },
    async tipoPeriodoNGE(data: any) {
      try {
        const response = await axios.post(`/api/catalogoNomina/tipoPeriodoNGE`, data)
        this.tipoPeriodo = response.data.data
      } catch (error: any) {
        console.error('Error al obtener tipo de periodo:', error)
        this.responseMessage = error.message
        throw error
      }
    },
  },
})
