import { defineStore } from 'pinia'
import axios from 'axios'
import type { EmpresaModel } from '@/interfaces/nomina/default/nom10000'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface EmpresaState {
  empresa: EmpresaModel[]
  responseMessage: string
  siguienteCodigo: string | null
}

export const useEmpresaNomStore = defineStore({
  id: 'empresaNom',
  state: (): EmpresaState => ({
    empresa: [],
    responseMessage: '',
    siguienteCodigo: null,
  }),
  actions: {
    async catalogoEmpresa(data: any) {
      try {
        const response = await axios.post(`/api/catalogoNomina/empresa`, data)
        this.empresa = response.data.data.empresa
        this.siguienteCodigo = response.data.data.siguienteCodigo
      } catch (error: any) {
        console.error('Error al obtener empresa:', error)
        this.responseMessage = error.message
        throw error
      }
    },
    async catalogoEmpresaNoFiscal(data: any) {
      try {
        const response = await axios.post(`/api/catalogoNomina/sigCodigoPorEmpresa`, data)
        this.empresa = response.data.data.empresa
        this.siguienteCodigo = response.data.data.siguienteCodigo
      } catch (error: any) {
        console.error('Error al obtener empresa:', error)
        this.responseMessage = error.message
        throw error
      }
    },
  },
})
