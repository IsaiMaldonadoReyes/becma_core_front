import { defineStore } from 'pinia'
import axios from 'axios'
import type { EmpresaModel } from '@/interfaces/nomina/default/nom10000'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface EmpresaState {
  empresa: EmpresaModel | null
  responseMessage: string
  siguienteCodigo: string | null
}

export const useEmpresaStore = defineStore({
  id: 'nominaEmpresa',
  state: (): EmpresaState => ({
    empresa: null,
    responseMessage: '',
    siguienteCodigo: null,
  }),
  actions: {
    async catalogoEmpresa(idEmpresa: number) {
      try {
        const response = await axios.post(`/api/nominaEmpresa/${idEmpresa}`)
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
