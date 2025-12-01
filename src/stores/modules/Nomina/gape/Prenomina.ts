// stores/modules/Nomina/gape/useConceptoPagoParametrizacionStore.ts
import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import type { PrenominaModel } from '@/interfaces/nomina/gape/PrenominaModel'

interface PrenominaState {
  prenomina: PrenominaModel[]
  data: PrenominaModel[] | PrenominaModel | null
  responseMessage: string
}

export const usePrenominaStore = defineStore({
  id: 'prenomina',
  state: (): PrenominaState => ({
    prenomina: [],
    data: null,
    responseMessage: '',
  }),
  actions: {
    async prenominaPorId(data: any) {
      try {
        const response = await axios.post('/api/parametrizacion/datosParametrizacionPorId', data)
        this.data = response.data.data
      } catch (error: any) {
        this.responseMessage = error.message
      }
    },
    async empleadosNoFiscales(data: any) {
      try {
        const response = await axios.post('/api/nominaGapePrenomina/catalogoEmpresaNoFiscal', data)
        this.prenomina = response.data.data
      } catch (error: any) {
        this.responseMessage = error.message
      }
    },
    async generarPrenomina(data: any) {
      try {
        const response = await axios.post('/api/nominaGapePrenomina/catalogoEmpresaNoFiscal', data)
        this.prenomina = response.data.data
      } catch (error: any) {
        this.responseMessage = error.message
      }
    },
    async prenominaFiscal(data: any) {
      try {
        const now = new Date()
        const day = String(now.getDate()).padStart(2, '0')
        const month = String(now.getMonth() + 1).padStart(2, '0') // Los meses van de 0 a 11
        const year = now.getFullYear()
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const seconds = String(now.getSeconds()).padStart(2, '0')

        const response = await axios({
          url: '/api/prenomina/fiscal', // URL de la API
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
          `prenomina_${year}${month}${day}_${hours}${minutes}${seconds}.xlsx`,
        )
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } catch (error) {
        console.error('Error al descargar el archivo:', error)
      }
    },
    async prenominaNoFiscal(data: any) {
      try {
        const now = new Date()
        const day = String(now.getDate()).padStart(2, '0')
        const month = String(now.getMonth() + 1).padStart(2, '0') // Los meses van de 0 a 11
        const year = now.getFullYear()
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const seconds = String(now.getSeconds()).padStart(2, '0')

        const response = await axios({
          url: '/api/prenomina/noFiscal', // URL de la API
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
          `prenomina_no_fiscal_${year}${month}${day}_${hours}${minutes}${seconds}.xlsx`,
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
