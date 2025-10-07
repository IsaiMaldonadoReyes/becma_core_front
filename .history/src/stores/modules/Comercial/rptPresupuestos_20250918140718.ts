import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface ReporteState {
  dataset: any
  label: any
  responseMessage: string
  resultAgentes: any
  resultEjercicios: any
  resultEmpresas: any
  resultMarcas: any
  type: string
}

export const rptPresupuestos = defineStore({
  id: 'rptPresupuestos',
  state: (): ReporteState => ({
    dataset: {},
    label: {},
    responseMessage: '',
    resultAgentes: {},
    resultEjercicios: {},
    resultEmpresas: {},
    resultMarcas: {},
    type: '',
  }),
  actions: {
    async storeEmpresas() {
      try {
        const response = await axios.post('/api/rptEmpresas')

        this.resultEmpresas = response.data
      } catch (error: any) {
        console.log(error)
        this.responseMessage = error.message
        //throw error
      }
    },

    async storeEjercicios(data: any) {
      try {
        const response = await axios.post('/api/ejerciciosRpt5', data)

        this.resultEjercicios = response.data
      } catch (error: any) {
        console.log(error)
        this.responseMessage = error.message
        //throw error
      }
    },

    async storeMarcas(data: any) {
      try {
        const response = await axios.post('/api/marcasRpt5', data)

        this.resultMarcas = response.data
      } catch (error: any) {
        console.log(error)
        this.responseMessage = error.message
        //throw error
      }
    },

    async storeAgentes(data: any) {
      try {
        const response = await axios.post('/api/agentesRpt5', data)

        this.resultAgentes = response.data
      } catch (error: any) {
        console.log(error)
        this.responseMessage = error.message
        //throw error
      }
    },

    async storeData(data: any) {
      try {
        const response = await axios.post('/api/dataRpt5', data)

        this.dataset = response.data
      } catch (error: any) {
        console.log(error)
        this.responseMessage = error.message
        //throw error
      }
    },

    

    async downloadExcel() {
      try {
        const now = new Date()
        const day = String(now.getDate()).padStart(2, '0')
        const month = String(now.getMonth() + 1).padStart(2, '0') // Los meses van de 0 a 11
        const year = now.getFullYear()
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const seconds = String(now.getSeconds()).padStart(2, '0')

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
