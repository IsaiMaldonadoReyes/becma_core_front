import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import type { EmpresaModel } from '@/interfaces/nomina/gape/Empresa'

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
    reset() {
      this.empresasList = []
    },
    async indexEmpresas() {
      try {
        const response = await axios.get('/api/nominaGapeEmpresa/index')
        this.empresasList = response.data.data
      } catch (error: any) {
        this.responseMessage = error.message
      }
    },
    async storeNominaGapeEmpresa(data: EmpresaModel) {
      try {
        const response = await axios.post('/api/nominaGapeEmpresa/store', data)
        this.empresa = response.data
        return response.data
      } catch (error: any) {
        this.responseMessage = error.message
        if (error.type === 'validation') throw error
      }
    },
    async updateNominaGapeEmpresa(data: EmpresaModel, id: number) {
      try {
        const response = await axios.put(`/api/nominaGapeEmpresa/update/${id}`, data)
        this.empresa = response.data
      } catch (error: any) {
        this.responseMessage = error.message
        if (error.type === 'validation') throw error
      }
    },
    async empresasDatosNominasPorClienteId(id: number) {
      try {
        const payload = {
          id: id,
        }
        const response = await axios.post(
          `/api/nominaGapeEmpresa/datosNominasPorClienteId`,
          payload,
        )
        this.empresa = response.data.data
      } catch (error: any) {
        this.responseMessage = error.message
      }
    },
    async empresasDatosNominasPorCliente(clienteId: number, empresaId: any, rutaBD: string) {
      try {
        const payload = {
          idCliente: clienteId,
          idEmpresa: empresaId,
          nombreBase: rutaBD,
        }
        const response = await axios.post(`/api/nominaGapeEmpresa/datosNominasPorCliente`, payload)
        this.empresa = response.data.data
      } catch (error: any) {
        this.responseMessage = error.message
      }
    },

    async empresasNominasPorClienteTipo(data: any) {
      try {
        const response = await axios.post(`/api/nominaGapeEmpresa/asignadasAClienteTipo`, data)
        this.empresasList = response.data.data
      } catch (error: any) {
        this.responseMessage = error.message
      }
    },
  },
})
