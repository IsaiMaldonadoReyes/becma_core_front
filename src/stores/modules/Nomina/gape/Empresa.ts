import { defineStore } from 'pinia'
import axios from 'axios'
import type { EmpresaModel } from '@/interfaces/nomina/gape/Empresa'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface EmpresaState {
  empresa: EmpresaModel | EmpresaModel[] | null
  responseMessage: string
  object: any
}

export const useEmpresaStore = defineStore({
  id: 'nominaEmpresa',
  state: (): EmpresaState => ({
    empresa: null,
    responseMessage: '',
    object: {},
  }),
  actions: {
    async empresasDatosNominasPorCliente(clienteId: number, empresaId: any, rutaBD: string) {
      try {
        const response = await axios.post(
          `/api/empresasDatosNominasPorCliente/${clienteId}/${empresaId}/${rutaBD}`,
        )
        this.empresa = response.data.data
      } catch (error: any) {
        console.error('Error al obtener datos de cliente y empresa:', error)
        this.responseMessage = error.message
        throw error
      }
    },
  },
})
