import { defineStore } from 'pinia'
import axios from 'axios'
import type { TurnoModel } from '@/interfaces/nomina/default/nom10032'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface TurnoState {
  turno: TurnoModel[]
  responseMessage: string
}

export const useTurnoStore = defineStore({
  id: 'nominaTurno',
  state: (): TurnoState => ({
    turno: [],
    responseMessage: '',
  }),
  actions: {
    async catalogoTurno(idEmpresa: number) {
      try {
        const response = await axios.post(`/api/nominaTurno/${idEmpresa}`)
        this.turno = response.data.data
      } catch (error: any) {
        console.error('Error al obtener turno:', error)
        this.responseMessage = error.message
        throw error
      }
    },
  },
})
