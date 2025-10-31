// stores/modules/Nomina/gape/useConceptoPagoParametrizacionStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'
import type { ConceptoPagoParametrizacionModel } from '@/interfaces/nomina/gape/ConceptoPagoParametrizacionModel'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface ConceptoPagoParametrizacionState {
  conceptosPagoParametrizacion: ConceptoPagoParametrizacionModel[]
  data: ConceptoPagoParametrizacionModel[] | ConceptoPagoParametrizacionModel | null
  responseMessage: string
}

export const useConceptoPagoParametrizacionStore = defineStore({
  id: 'conceptoPagoParametrizacion',
  state: (): ConceptoPagoParametrizacionState => ({
    conceptosPagoParametrizacion: [],
    data: null,
    responseMessage: '',
  }),
  actions: {
    async index() {
      try {
        const response = await axios.get('/api/parametrizacion/index')
        this.conceptosPagoParametrizacion = response.data.data
      } catch (error: any) {
        console.error(error)
        this.responseMessage = error.message
      }
    },

    async parametrizacionConceptosPorId(data: any) {
      try {
        const response = await axios.post('/api/parametrizacion/datosConceptosPorId', data)
        this.data = response.data.data
      } catch (error: any) {
        console.error(error)
        this.responseMessage = error.message
      }
    },

    async storeConceptoPagoParametrizacion(data: any) {
      try {
        const response = await axios.post('/api/parametrizacion/upsertConcepto', data)
        this.conceptosPagoParametrizacion = response.data

        return response.data
      } catch (error: any) {
        this._handleError(error)
        throw error
      }
    },

    async upsertParametrizacion(data: any) {
      try {
        const response = await axios.post('/api/parametrizacion/upsertParametrizacion', data)
        this.conceptosPagoParametrizacion = response.data

        return response.data
      } catch (error: any) {
        this._handleError(error)
        throw error
      }
    },

    async updateConceptoPagoParametrizacion(data: ConceptoPagoParametrizacionModel, id: number) {
      // TODO: implementar petición PUT
    },

    async destroyConceptoPagoParametrizacion(id: number) {
      // TODO: implementar petición DELETE
    },

    async destroyConceptosPagoParametrizacionByIds(ids: number[]) {
      // TODO: implementar eliminación múltiple
    },

    async catalogoConceptosPagoParametrizacion() {
      // TODO: implementar consulta de catálogo
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
