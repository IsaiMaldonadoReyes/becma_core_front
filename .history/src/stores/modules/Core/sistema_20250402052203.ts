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

    async authUserInformation() {
      try {
        // 1. Intentar la petición
        const response = await axios.get('/api/authUserInformation')

        this.object = response.data
      } catch (error: any) {
        // 4. Manejo de errores
        console.error('Error en obtener información:', error)
        //throw error
      }
    },

    async downloadExcel() {
      try {
        const response = await axios({
          url: '/api/exportExcel',
          method: 'GET',
          responseType: 'blob',
        })

        if (response.data.size === 0) {
          throw new Error('El archivo recibido está vacío.')
        }

        const url = window.URL.createObjectURL(response.data)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'reporte.xlsx')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } catch (error) {
        console.error('Error al descargar el archivo:', error)
      }
    },
  },
})
