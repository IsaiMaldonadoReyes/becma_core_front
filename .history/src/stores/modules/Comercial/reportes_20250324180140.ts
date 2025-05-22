import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface ReporteState {
  object: any
  responseMessage: string
  type: string
}

export const reporteStore = defineStore({
  id: 'reporte',
  state: (): ReporteState => ({
    object: {},
    responseMessage: '',
    type: '',
  }),
  actions: {
    async storeSistema(data: any) {
      try {
        const response = await axios.get('/api/storeSistema', data)

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
