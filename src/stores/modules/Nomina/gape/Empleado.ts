import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import type { EmpleadoModel } from '@/interfaces/nomina/gape/EmpleadoModel'

interface EmpleadoState {
  empleado: EmpleadoModel[]
  responseMessage: string
  object: any
}

export const useEmpleadoStore = defineStore({
  id: 'nominaEmpleado',
  state: (): EmpleadoState => ({
    empleado: [],
    responseMessage: '',
    object: {},
  }),
  actions: {
    async guardarEmpleado(empleado: EmpleadoModel) {
      try {
        const response = await axios.post(`/api/nominaGapeEmpleado/store`, empleado)
        this.object = response.data
      } catch (error: any) {
        this.responseMessage = error.message
        throw error
      }
    },
    async actualizarEmpleado(empleado: EmpleadoModel) {
      try {
        const response = await axios.put(`/api/nominaGapeEmpleado/update`, empleado)
        this.object = response.data
      } catch (error: any) {
        this.responseMessage = error.message
        throw error
      }
    },
    async guardarEmpleadoNoFiscal(empleado: EmpleadoModel) {
      try {
        const response = await axios.post(`/api/nominaGapeEmpleado/storeNoFiscal`, empleado)
        this.object = response.data

        return response.data
      } catch (error: any) {
        this.responseMessage = error.message
        throw error
      }
    },
    async actualizarEmpleadoNoFiscal(empleado: EmpleadoModel) {
      try {
        const response = await axios.put(`/api/nominaGapeEmpleado/updateNoFiscal`, empleado)
        this.object = response.data
      } catch (error: any) {
        this.responseMessage = error.message
        throw error
      }
    },
    async indexEmpleados(data: any) {
      try {
        const response = await axios.post('/api/nominaGapeEmpleado/index', data)
        this.empleado = response.data.data
      } catch (error: any) {
        this.responseMessage = error.message
      }
    },
    async editEmpleado(data: any) {
      try {
        const response = await axios.post('/api/nominaGapeEmpleado/edit', data)
        this.empleado = response.data.data
        return response.data.data
      } catch (error: any) {
        this.responseMessage = error.message
      }
    },
    async listEmpleadosNoFiscales(data: any) {
      try {
        const response = await axios.post('/api/nominaGapeEmpleado/noFiscalesEmpresaCliente', data)
        this.empleado = response.data.data
      } catch (error: any) {
        this.responseMessage = error.message
      }
    },
    async listEmpleadosFiscales(data: any) {
      try {
        const response = await axios.post('/api/nominaGapeEmpleado/fiscalesEmpresaCliente', data)
        this.empleado = response.data.data
      } catch (error: any) {
        this.responseMessage = error.message
      }
    },
    async descargarFormato(data: any) {
      try {
        const now = new Date()
        const day = String(now.getDate()).padStart(2, '0')
        const month = String(now.getMonth() + 1).padStart(2, '0') // Los meses van de 0 a 11
        const year = now.getFullYear()
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const seconds = String(now.getSeconds()).padStart(2, '0')

        const response = await axios({
          url: '/api/nominaGapeEmpleado/descargaFormato', // URL de la API
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
          `formato_empleados_${year}${month}${day}_${hours}${minutes}${seconds}.xlsx`,
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
