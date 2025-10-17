import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface KioskoState {
  dataset: any[]
  label: any
  responseMessage: string
  resultTicket: any
  resultUpdateTicket: any
  resultEstatusTicket: any
  resultEmpresas: any
  resultCodigosPostales: any
  resultDireccion: any
  resultAsentamientos: any
  resultUsoCfdi: any
  resultRegimenFiscal: any
  resultCliente: any
  type: string
}

export const kiosko = defineStore({
  id: 'kiosko',
  state: (): KioskoState => ({
    dataset: [],
    label: {},
    responseMessage: '',
    resultTicket: {},
    resultUpdateTicket: {},
    resultEstatusTicket: {},
    resultEmpresas: {},
    resultCodigosPostales: {},
    resultDireccion: {},
    resultAsentamientos: {},
    resultUsoCfdi: {},
    resultRegimenFiscal: {},
    resultCliente: {},
    type: '',
  }),
  actions: {
    async storeGuardarFactura(data: any) {
      try {
        const response = await axios.post('/api/upsetTicket', data)

        this.resultUpdateTicket = response.data
      } catch (error: any) {
        console.log(error)
        this.responseMessage = error.message
        //throw error
      }
    },

    async storeValidarTicket(data: any) {
      try {
        const response = await axios.post('/api/validarTicket', data)

        this.resultTicket = response.data
      } catch (error: any) {
        console.log(error)
        this.responseMessage = error.message
        //throw error
      }
    },

    async storeEstatusTicket(data: any) {
      try {
        const response = await axios.post('/api/estatusTicket', { idReciboEncabezado: data })

        this.resultEstatusTicket = response.data
      } catch (error: any) {
        console.log(error)
        this.responseMessage = error.message
        //throw error
      }
    },

    async storeEliminarTicket(data: any) {
      try {
        const response = await axios.post('/api/estatusTicket', data)

        this.resultEstatusTicket = response.data
      } catch (error: any) {
        console.log(error)
        this.responseMessage = error.message
        //throw error
      }
    },

    /**Catalogos*/

    async storeDireccion(codigo: string) {
      try {
        const response = await axios.post('/api/direccion', { codigopostal: codigo })

        this.resultDireccion = response.data.direccion
        this.resultAsentamientos = response.data.asentamientos || []
      } catch (error: any) {
        console.log(error)
        this.responseMessage = error.message
        //throw error
      }
    },

    async storeBuscarCliente(data: any) {
      try {
        const response = await axios.post('/api/cliente', data)

        this.resultCliente = response.data
      } catch (error: any) {
        console.log(error)
        this.responseMessage = error.message
        //throw error
      }
    },

    async storeEmpresas() {
      try {
        const response = await axios.post('/api/empresas')

        this.resultEmpresas = response.data
      } catch (error: any) {
        console.log(error)
        this.responseMessage = error.message
        //throw error
      }
    },

    async storeCatalogos() {
      try {
        const response = await axios.post('/api/catalogos')

        this.resultUsoCfdi = response.data.uso_cfdi || []
        this.resultRegimenFiscal = response.data.regimen || []
      } catch (error: any) {
        console.log(error)
        this.responseMessage = error.message
        //throw error
      }
    },

    async storeCodigosPostales(codigo: string) {
      try {
        const response = await axios.post('/api/listaCodigoPostal', { codigopostal: codigo })

        this.resultCodigosPostales = response.data
      } catch (error: any) {
        console.log(error)
        this.responseMessage = error.message
        //throw error
      }
    },

    //** Descarga de archivos  / */

    async storeDescargarPdf(data: any) {
      try {
        const response = await axios.post('/api/descargarPdf', data)

        this.resultEstatusTicket = response.data
      } catch (error: any) {
        console.log(error)
        this.responseMessage = error.message
        //throw error
      }
    },

    async storeDescargarXml(data: any) {
      try {
        const response = await axios.post('/api/descargarXml', data)

        this.resultEstatusTicket = response.data
      } catch (error: any) {
        console.log(error)
        this.responseMessage = error.message
        //throw error
      }
    },
  },
})
