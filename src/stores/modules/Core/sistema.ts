import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface SistemaState {
  object: any
  responseMessage: string
  type: string
}

interface SistemaData {
  nombre?: string
  codigo?: string
  descripcion?: string
}

export const sistemaStore = defineStore({
  id: 'sistema',
  state: (): SistemaState => ({
    object: {},
    responseMessage: '',
    type: '',
  }),
  actions: {
    async storeSistema(data: SistemaData) {
      try {
        const response = await axios.post('/api/storeSistema', data)

        this.object = response.data
      } catch (error: any) {
        console.log(error)

        this.responseMessage = error.message
        //throw error
      }
    },
    async updateSistema(data: SistemaData, id: any) {
      try {
        const response = await axios.put(`/api/updateSistema/${id}`, data)

        this.object = response.data
      } catch (error: any) {
        console.log(error)

        this.responseMessage = error.message
        //throw error
      }
    },
    async indexSistema() {
      try {
        const response = await axios.get('/api/indexSistema')

        this.object = response.data
      } catch (error: any) {
        console.log(error)

        this.responseMessage = error.message
        //throw error
      }
    },

    async destroySistema(id: any) {
      try {
        const response = await axios.delete(`/api/destroySistema/${id}`)

        this.object = response.data
      } catch (error: any) {
        console.log(error)

        this.responseMessage = error.message
        //throw error
      }
    },
    async destroySistemasByIds(ids: number[]) {
      try {
        const response = await axios.delete(`/api/destroySistemaByIds`, { data: { ids } })

        this.object = response.data
      } catch (error: any) {
        console.log(error)

        this.responseMessage = error.message
        //throw error
      }
    },
  },
})
