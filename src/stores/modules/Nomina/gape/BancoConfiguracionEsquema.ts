import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import type { BancoConfiguracionEsquemaModel } from '@/interfaces/nomina/gape/BancoConfiguracionEsquemaModel'

interface BancoConfiguracionEsquemaState {
  bancos: BancoConfiguracionEsquemaModel[]
  data: BancoConfiguracionEsquemaModel[] | BancoConfiguracionEsquemaModel | null
  responseMessage: string
}

export const useBancoConfiguracionEsquemaStore = defineStore({
  id: 'BancoConfiguracionEsquema',
  state: (): BancoConfiguracionEsquemaState => ({
    bancos: [],
    data: null,
    responseMessage: '',
  }),
  actions: {
    async bancosPorCombinacion(data: any) {
      try {
        const response = await axios.post('/api/dispersion/bancosPorCombinacion', data)

        this.bancos = response.data.data.map((c: any) => ({
          ...c,
          id: Number(c.id),
        }))
      } catch (error: any) {
        this.responseMessage = error.message
      }
    },
    async exportarFormatos(data: any) {
      try {
        const now = new Date()
        const day = String(now.getDate()).padStart(2, '0')
        const month = String(now.getMonth() + 1).padStart(2, '0') // Los meses van de 0 a 11
        const year = now.getFullYear()
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const seconds = String(now.getSeconds()).padStart(2, '0')

        const response = await axios({
          url: '/api/dispersion/exportarFormatos', // URL de la API
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
          `dispersion_pagos_${year}${month}${day}_${hours}${minutes}${seconds}.zip`,
        )
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } catch (error) {
        console.error('Error al descargar el archivo:', error)
      }
    },
    async exportarFormatos3(data: any) {
      try {
        const response = await axios.post('/api/dispersion/exportarFormatos', data, {
          responseType: 'blob', // 🔑 MUY IMPORTANTE
        })

        // Crear el blob
        const blob = new Blob([response.data], {
          type: 'application/zip',
        })

        // Crear URL temporal
        const url = window.URL.createObjectURL(blob)

        // Crear link invisible y disparar descarga
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'documentos.zip') // nombre del archivo
        document.body.appendChild(link)
        link.click()

        // Limpieza
        link.remove()
        window.URL.revokeObjectURL(url)
      } catch (error: any) {
        console.error(error)
        this.responseMessage = error.message
      }
    },
    async exportarFormatos2(data: any) {
      try {
        const response = await axios.post('/api/dispersion/exportarFormatos', data)
      } catch (error: any) {
        this.responseMessage = error.message
      }
    },
    async formatoIncidencias(data: any) {
      try {
        const now = new Date()
        const day = String(now.getDate()).padStart(2, '0')
        const month = String(now.getMonth() + 1).padStart(2, '0') // Los meses van de 0 a 11
        const year = now.getFullYear()
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const seconds = String(now.getSeconds()).padStart(2, '0')

        const response = await axios({
          url: '/api/incidencia/descargaFormatoFiscal', // URL de la API
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
          `formato_incidencias_${year}${month}${day}_${hours}${minutes}${seconds}.xlsx`,
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
