import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface ReporteState {
  object: any
  label: any
  dataset: any
  responseMessage: string
  type: string
}

export const rpt2VentasPorMarcas = defineStore({
  id: 'rpt2VentasPorMarcas',
  state: (): ReporteState => ({
    object: {},
    label: {},
    dataset: {},
    responseMessage: '',
    type: '',
  }),
  actions: {
    async labelRpt2(data: any) {
      try {
        const response = await axios.post('/api/labelRpt2', data)

        this.label = response.data
      } catch (error: any) {
        console.log(error)
        this.responseMessage = error.message
        //throw error
      }
    },
    async dataRpt2(data: any) {
      try {
        const response = await axios.post('/api/dataRpt2', data)

        this.dataset = response.data
      } catch (error: any) {
        console.log(error)
        this.responseMessage = error.message
        //throw error
      }
    },

    async marcasRpt2(data: any) {
      try {
        const response = await axios.post('/api/marcasRpt2', data)

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
