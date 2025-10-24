import { defineStore } from 'pinia'
import axios from 'axios'
import type { EmpresaModel } from '@/interfaces/nomina/gape/Empresa'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface EmpresaState {
  empresa: EmpresaModel | EmpresaModel[] | null
  empresasList: EmpresaModel[]
  responseMessage: string
  object: any
}

export const useEmpresaStore = defineStore({
  id: 'nominaEmpresa',
  state: (): EmpresaState => ({
    empresa: null,
    empresasList: [],
    responseMessage: '',
    object: {},
  }),
  actions: {
    async indexEmpresas() {
      try {
        const response = await axios.get('/api/indexNominaEmpresa')
        this.empresasList = response.data.data
      } catch (error: any) {
        console.error(error)
        this.responseMessage = error.message
      }
    },
    async empresasDatosNominasPorClienteId(id: number) {
      try {
        const payload = {
          id: id,
        }
        const response = await axios.post(`/api/empresasDatosNominasPorClienteId`, payload)
        this.empresa = response.data.data
      } catch (error: any) {
        console.error('Error al obtener datos del registro:', error)
        this.responseMessage = error.message
        throw error
      }
    },
    async empresasDatosNominasPorCliente(clienteId: number, empresaId: any, rutaBD: string) {
      try {
        const payload = {
          idCliente: clienteId,
          idEmpresa: empresaId,
          nombreBase: rutaBD,
        }
        const response = await axios.post(`/api/empresasDatosNominasPorCliente`, payload)
        this.empresa = response.data.data
      } catch (error: any) {
        console.error('Error al obtener datos de cliente y empresa:', error)
        this.responseMessage = error.message
        throw error
      }
    },
    async storeNominaGapeEmpresa(data: EmpresaModel) {
      try {
        const response = await axios.post('/api/storeNominaEmpresa', data)
        this.empresa = response.data

        return response.data
      } catch (error: any) {
        this._handleError(error)
        throw error
      }
    },
    async updateNominaGapeEmpresa(data: EmpresaModel, id: number) {
      try {
        const response = await axios.put(`/api/updateNominaEmpresa/${id}`, data)
        this.empresa = response.data
      } catch (error: any) {
        this._handleError(error)
        throw error
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
