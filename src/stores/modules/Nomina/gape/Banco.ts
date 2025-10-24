import { defineStore } from 'pinia'
import axios from 'axios'

import type { BancoAztecaModel } from '@/interfaces/nomina/gape/BancoAztecaModel'
import type { BancoBanorteModel } from '@/interfaces/nomina/gape/BancoBanorteModel'
import type { BancoFondeadoraModel } from '@/interfaces/nomina/gape/BancoFondeadoraModel'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

export const useBancoStore = defineStore('bancoStore', {
  state: () => ({
    // 🏦 Bancos
    aztecaInter: [] as BancoAztecaModel[],
    aztecaBancario: [] as BancoAztecaModel[],
    banorte: [] as BancoBanorteModel[],
    fondeadora: null as BancoFondeadoraModel | null,

    // 🔁 Estados auxiliares
    response: null,
    loading: false,
    responseMessage: '',
  }),
  actions: {
    async datosBancosPorCliente(id: any) {
      try {
        const response = await axios.get(`/api/bancos/getBancosByEmpresa/${id}`)
        const data = response.data.data || {}

        this.fondeadora = data.fondeadora ?? null
        this.aztecaInter = data.azteca_interbancario ?? null
        this.aztecaBancario = data.azteca_bancario ?? null
        this.banorte = data.banorte ?? []
      } catch (error: any) {
        console.error(error)
        this.responseMessage = error.message
      }
    },
    async storeBancoFondeadora(data: any) {
      try {
        const response = await axios.post('/api/bancos/upsertBancoFondeadora', data)
        this.fondeadora = response.data
      } catch (error: any) {
        this._handleError(error)
        throw error
      }
    },

    async storeBancoAzteca(data: any) {
      try {
        const response = await axios.post('/api/bancos/storeBancoAzteca', data)
        this.aztecaBancario = response.data
      } catch (error: any) {
        this._handleError(error)
        throw error
      }
    },
    async updateBancoAzteca(data: any, id: number) {
      try {
        const response = await axios.post(`/api/bancos/updateBancoAzteca/${id}`, data)
        this.aztecaBancario = response.data
      } catch (error: any) {
        this._handleError(error)
        throw error
      }
    },

    async storeBancoBanorte(data: any) {
      try {
        const response = await axios.post('/api/bancos/storeBancoBanorte', data)
        this.banorte = response.data
      } catch (error: any) {
        this._handleError(error)
        throw error
      }
    },
    async updateBancoBanorte(data: any, id: number) {
      try {
        const response = await axios.post(`/api/bancos/updateBancoBanorte/${id}`, data)
        this.banorte = response.data
      } catch (error: any) {
        this._handleError(error)
        throw error
      }
    },

    _handleError(error: any) {
      if (error.response) {
        const status = error.response.status
        if (status === 422) {
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
    },
  },
})
