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
  id: 'sistema',
  state: (): SistemaState => ({
    sistema: [],
    responseMessage: '',
  }),
  actions: {
    async storeSistema(data: SistemaModel) {
      try {
        const response = await axios.post('/api/storeSistema', data)

        this.sistema = response.data
      } catch (error: any) {
        if (error.response) {
          const status = error.response.status

          if (status === 422) {
            // Error de validación
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

        throw error
      }
    },
    async updateSistema(data: SistemaModel, id: number) {
      try {
        const response = await axios.put(`/api/updateSistema/${id}`, data)

        this.sistema = response.data
      } catch (error: any) {
        if (error.response) {
          const status = error.response.status

          if (status === 422) {
            // Error de validación
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

        throw error
      }
    },
    async indexSistema() {
      try {
        const response = await axios.get('/api/indexSistema')

        this.sistema = response.data.data
      } catch (error: any) {
        console.log(error)

        this.responseMessage = error.message
        //throw error
      }
    },

    async destroySistema(id: number) {
      try {
        const response = await axios.delete(`/api/destroySistema/${id}`)

        this.sistema = response.data
      } catch (error: any) {
        console.log(error)

        this.responseMessage = error.message
        //throw error
      }
    },
    async destroySistemasByIds(ids: number[]) {
      try {
        const response = await axios.delete(`/api/destroySistemaByIds`, { data: { ids } })

        this.sistema = response.data
      } catch (error: any) {
        console.log(error)

        this.responseMessage = error.message
        //throw error
      }
    },

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
