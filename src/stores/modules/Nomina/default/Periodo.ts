import { defineStore } from 'pinia'
import axios from 'axios'
import type { PeriodoModel } from '@/interfaces/nomina/default/nom10002'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface PeriodoState {
  periodo: PeriodoModel[]
  responseMessage: string
}

export const usePeriodoStore = defineStore({
  id: 'nominaPeriodo',
  state: (): PeriodoState => ({
    periodo: [],
    responseMessage: '',
  }),
  actions: {
    async catalogoPeriodo(idEmpresa: number, idPeriodo: number) {
      try {
        const response = await axios.post(`/api/nominaPeriodo/${idEmpresa}/${idPeriodo}`)
        this.periodo = response.data.data
      } catch (error: any) {
        console.error('Error al obtener tipo de periodo:', error)
        this.responseMessage = error.message
        throw error
      }
    },
  },
})
