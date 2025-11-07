import { defineStore } from 'pinia'
import axios from 'axios'
import type { IMSSCatTipoSemanaReducidaModel } from '@/interfaces/nomina/nomGenerales/IMSSCatTipoSemanaReducida'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface TipoJornadaState {
  tipoJornada: IMSSCatTipoSemanaReducidaModel[]
  responseMessage: string
}

export const useTipoJornadaStore = defineStore({
  id: 'nominaTipoJornada',
  state: (): TipoJornadaState => ({
    tipoJornada: [],
    responseMessage: '',
  }),
  actions: {
    async catalogoTipoJornada(data: any) {
      try {
        const response = await axios.post(`/api/catalogoNomina/tipoJornada`, data)
        this.tipoJornada = response.data.data
      } catch (error: any) {
        console.error('Error al obtener banco:', error)
        this.responseMessage = error.message
        throw error
      }
    },
  },
})
