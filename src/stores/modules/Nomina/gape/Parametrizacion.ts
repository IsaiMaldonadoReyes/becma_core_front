// stores/modules/Nomina/gape/useConceptoPagoParametrizacionStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'
import type { ParametrizacionModel } from '@/interfaces/nomina/gape/ParametrizacionModel'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface ParametrizacionState {
  parametrizacion: ParametrizacionModel[]
  data: ParametrizacionModel[] | ParametrizacionModel | null
  responseMessage: string
}

export const useParametrizacionStore = defineStore({
  id: 'parametrizacion',
  state: (): ParametrizacionState => ({
    parametrizacion: [],
    data: null,
    responseMessage: '',
  }),
  actions: {
    async parametrizacionPorId(data: any) {
      try {
        const response = await axios.post('/api/parametrizacion/datosParametrizacionPorId', data)
        this.data = response.data.data
      } catch (error: any) {
        console.error(error)
        this.responseMessage = error.message
      }
    },

    _handleError(error: any) {
      if (error.response) {
        const status = error.response.status
        if (status === 422) {
          this.responseMessage = 'Error de validación'
          throw {
            type: 'validation',
            errors: error.response.data.errors,
            message: error.response.data.message,
          }
        }
        this.responseMessage = error.response.data.message || 'Error en la petición'
      } else {
        this.responseMessage = error.message || 'Error desconocido'
      }
    },
  },
})
