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

    async downloadExcel(data: any) {
      try {
        const now = new Date()
        const day = String(now.getDate()).padStart(2, '0')
        const month = String(now.getMonth() + 1).padStart(2, '0') // Los meses van de 0 a 11
        const year = now.getFullYear()
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const seconds = String(now.getSeconds()).padStart(2, '0')

        const response = await axios({
          url: '/api/exportExcel', // URL de la API
          method: 'POST', // Método HTTP
          data: data, // Datos que envías en el cuerpo de la petición
          responseType: 'blob', // Si la respuesta es un archivo (por ejemplo, Excel o PDF)
        })

        this.object = response.data

        if (response.data.size === 0) {
          throw new Error('El archivo recibido está vacío.')
        }

        const url = window.URL.createObjectURL(response.data)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute(
          'download',
          `reporte${day}_${month}_${year}_${hours}_${minutes}_${seconds}.xlsx`,
        )
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
