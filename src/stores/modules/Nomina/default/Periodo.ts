import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import type { PeriodoModel } from '@/interfaces/nomina/default/nom10002'

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
        const response = await axios.post(`/api/nominaPeriodo`)
        this.periodo = response.data.data
      } catch (error: any) {
        console.error('Error al obtener tipo de periodo:', error)
        this.responseMessage = error.message
      }
    },
    async periodoPorEjercicio(data: any) {
      try {
        const response = await axios.post(`/api/prenomina/periodoPorEjercicio`, data)
        this.periodo = response.data.data
      } catch (error: any) {
        console.error('Error al obtener tipo de periodo:', error)
        this.responseMessage = error.message
      }
    },
  },
})
