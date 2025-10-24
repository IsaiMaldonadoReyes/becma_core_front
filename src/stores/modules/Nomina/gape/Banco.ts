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
    bancosDispersion: null as BancoFondeadoraModel | null,

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

        // Helper para convertir campos a boolean
        const parseBoolean = (val: any) => val === true || val === 1 || val === '1'

        // 🔹 Fondeadora (puede ser null)
        this.bancosDispersion = data.dispersion
          ? {
              ...data.dispersion,
              fondeadora: parseBoolean(data.dispersion.fondeadora),
              azteca_interbancario: parseBoolean(data.dispersion.azteca_interbancario),
              azteca_bancario: parseBoolean(data.dispersion.azteca_bancario),
              banorte: parseBoolean(data.dispersion.banorte),
            }
          : null

        // 🔹 Azteca Interbancario
        this.aztecaInter = (data.azteca_interbancario ?? []).map((item: any) => ({
          ...item,
          activo_dispersion: parseBoolean(item.activo_dispersion),
        }))

        // 🔹 Azteca Bancario
        this.aztecaBancario = (data.azteca_bancario ?? []).map((item: any) => ({
          ...item,
          activo_dispersion: parseBoolean(item.activo_dispersion),
        }))

        // 🔹 Banorte
        this.banorte = (data.banorte ?? []).map((item: any) => ({
          ...item,
          activo_dispersion: parseBoolean(item.activo_dispersion),
        }))
      } catch (error: any) {
        console.error(error)
        this.responseMessage = error.message
      }
    },

    async upsertBancoDispersion(data: any) {
      try {
        const response = await axios.post('/api/bancos/upsertBancoDispersion', data)
        this.responseMessage = response.data.message
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
        const response = await axios.put(`/api/bancos/updateBancoAzteca/${id}`, data)
        this.aztecaBancario = response.data
      } catch (error: any) {
        this._handleError(error)
        throw error
      }
    },
    async deleteBancoAzteca(id: any) {
      try {
        const response = await axios.delete(`/api/bancos/deleteBancoAzteca/${id}`)
        this.responseMessage = response.data.message
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
        const response = await axios.put(`/api/bancos/updateBancoBanorte/${id}`, data)
        this.banorte = response.data
      } catch (error: any) {
        this._handleError(error)
        throw error
      }
    },
    async deleteBancoBanorte(id: any) {
      try {
        const response = await axios.delete(`/api/bancos/deleteBancoBanorte/${id}`)
        this.responseMessage = response.data.message
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
