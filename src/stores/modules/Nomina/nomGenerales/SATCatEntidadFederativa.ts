import { defineStore } from 'pinia'
import axios from 'axios'
import type { SATCatEntidadFederativaModel } from '@/interfaces/nomina/nomGenerales/SATCatEntidadFederativa'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface EntidadFederativaState {
  entidadFederativa: SATCatEntidadFederativaModel[]
  responseMessage: string
}

export const useEntidadFederativaStore = defineStore({
  id: 'nominaEntidadFederativa',
  state: (): EntidadFederativaState => ({
    entidadFederativa: [],
    responseMessage: '',
  }),
  actions: {
    async catalogoEntidadFederativa(idEmpresa: number) {
      try {
        const response = await axios.post(`/api/nominaEntidadFederativa/${idEmpresa}`)
        this.entidadFederativa = response.data.data
      } catch (error: any) {
        console.error('Error al obtener enntidad federativa:', error)
        this.responseMessage = error.message
        throw error
      }
    },
  },
})
