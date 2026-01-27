import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import type { EsquemaModel } from '@/interfaces/nomina/gape/EsquemaModel'
import type { CombinacionModel } from '@/interfaces/nomina/gape/CombinacionModel'

interface EsquemaState {
  esquemas: EsquemaModel[]
  combinacion: CombinacionModel[]
  responseMessage: string
}

export const useEsquemaStore = defineStore({
  id: 'esquema',
  state: (): EsquemaState => ({
    esquemas: [],
    combinacion: [],
    responseMessage: '',
  }),
  actions: {
    async esquemasPorTipoPeriodo(data: any) {
      try {
        const response = await axios.post(`/api/prenomina/esquemaPorTipoPeriodoDisponibles`, data)
        this.esquemas = response.data.data
      } catch (error: any) {
        this.responseMessage = error.message
      }
    },
    async esquemasPorCombinacion(data: any) {
      try {
        const response = await axios.post(`/api/prenomina/esquemaPorCombinacion`, data)
        this.esquemas = response.data.data
      } catch (error: any) {
        this.responseMessage = error.message
      }
    },
    async combinacionPorTipoPeriodo(data: any) {
      try {
        const response = await axios.post(
          '/api/prenomina/combinacionPorTipoPeriodoDisponibles',
          data,
        )
        // 🔥 NORMALIZACIÓN CLAVE
        this.combinacion = response.data.data.map((c: any) => ({
          ...c,
          contpaq: c.contpaq === true || c.contpaq === 1 || c.contpaq === '1',
        }))
      } catch (error: any) {
        this.responseMessage = error.message
      }
    },
    async esquemasPorEmpresa(data: any) {
      try {
        const response = await axios.post(`/api/prenomina/esquemaPorEmpresaDisponibles`, data)
        this.esquemas = response.data.data
      } catch (error: any) {
        this.responseMessage = error.message
      }
    },
  },
})
