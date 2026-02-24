import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import type { ConceptoModel } from '@/interfaces/nomina/default/nom10004'

interface ConceptoState {
  concepto: ConceptoModel[]
  responseMessage: string
}

export const useConceptoStore = defineStore({
  id: 'concepto',
  state: (): ConceptoState => ({
    concepto: [],
    responseMessage: '',
  }),
  actions: {
    async catalogoConceptoPrevision(data: any) {
      try {
        const response = await axios.post(`/api/nominaGapeEmpresa/conceptoPrevision`, data)
        this.concepto = response.data.data
      } catch (error: any) {
        console.error('Error al obtener empresa:', error)
        this.responseMessage = error.message
        throw error
      }
    },
  },
})
