import { defineStore } from 'pinia'
import axios from 'axios'
import type { SATCatTipoContratoModel } from '@/interfaces/nomina/nomGenerales/SATCatTipoContrato'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface TipoContratoState {
  tipoContrato: SATCatTipoContratoModel[]
  responseMessage: string
}

export const useTipoContratoStore = defineStore({
  id: 'nominaTipoContrato',
  state: (): TipoContratoState => ({
    tipoContrato: [],
    responseMessage: '',
  }),
  actions: {
    async catalogoTipoContrato(idEmpresa: number) {
      try {
        const response = await axios.post(`/api/nominaTipoContrato/${idEmpresa}`)
        this.tipoContrato = response.data.data
      } catch (error: any) {
        console.error('Error al obtener tipo de contrato:', error)
        this.responseMessage = error.message
        throw error
      }
    },
  },
})
