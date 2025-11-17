// stores/modules/Nomina/gape/useConceptoPagoParametrizacionStore.ts
import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import type { ParametrizacionModel } from '@/interfaces/nomina/gape/ParametrizacionModel'

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
        this.responseMessage = error.message
      }
    },
  },
})
