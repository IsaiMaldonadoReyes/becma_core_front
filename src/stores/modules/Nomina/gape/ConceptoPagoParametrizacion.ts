// stores/modules/Nomina/gape/useConceptoPagoParametrizacionStore.ts
import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import type { ConceptoPagoParametrizacionModel } from '@/interfaces/nomina/gape/ConceptoPagoParametrizacionModel'

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
        this.responseMessage = error.message
      }
    },

    async parametrizacionConceptosPorId(data: any) {
      try {
        const response = await axios.post('/api/parametrizacion/datosConceptosPorId', data)
        this.data = response.data.data
      } catch (error: any) {
        this.responseMessage = error.message
      }
    },

    async storeConceptoPagoParametrizacion(data: any) {
      try {
        const response = await axios.post('/api/parametrizacion/upsertConcepto', data)
        this.conceptosPagoParametrizacion = response.data

        return response.data
      } catch (error: any) {
        this.responseMessage = error.message
        throw error
      }
    },

    async upsertParametrizacion(data: any) {
      try {
        const response = await axios.post('/api/parametrizacion/upsertParametrizacion', data)
        this.conceptosPagoParametrizacion = response.data

        return response.data
      } catch (error: any) {
        this.responseMessage = error.message
        throw error
      }
    },
  },
})
