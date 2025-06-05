import { defineStore } from 'pinia'
import axios from 'axios'
import type { SATCatTipoRegimenModel } from '@/interfaces/nomina/nomGenerales/SATCatTipoRegimen'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface TipoRegimenState {
  tipoRegimen: SATCatTipoRegimenModel[]
  responseMessage: string
}

export const useTipoRegimenStore = defineStore({
  id: 'nominaTipoRegimen',
  state: (): TipoRegimenState => ({
    tipoRegimen: [],
    responseMessage: '',
  }),
  actions: {
    async catalogoTipoRegimen(idEmpresa: number) {
      try {
        const response = await axios.post(`/api/nominaTipoRegimen/${idEmpresa}`)
        this.tipoRegimen = response.data.data
      } catch (error: any) {
        console.error('Error al obtener tipo de regimen:', error)
        this.responseMessage = error.message
        throw error
      }
    },
  },
})
