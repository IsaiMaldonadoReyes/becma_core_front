import { defineStore } from 'pinia'
import axios from 'axios'
import type { SistemaModel } from '@/interfaces/core/Sistema'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface SistemaState {
  sistema: SistemaModel[]
  responseMessage: string
}

export const useSistemaStore = defineStore({
  id: 'pruebaExcel',
  state: (): SistemaState => ({
    sistema: [],
    responseMessage: '',
  }),
  actions: {

    async fetchExcel(data: any) {
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

        //this.object = response.data

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
