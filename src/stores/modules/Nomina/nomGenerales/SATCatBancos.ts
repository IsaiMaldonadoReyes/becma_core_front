import { defineStore } from 'pinia'
import axios from 'axios'
import type { SATCatBancosModel } from '@/interfaces/nomina/nomGenerales/SATCatBancos'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface BancoState {
  banco: SATCatBancosModel[]
  responseMessage: string
}

export const useBancoStore = defineStore({
  id: 'nominaBancos',
  state: (): BancoState => ({
    banco: [],
    responseMessage: '',
  }),
  actions: {
    async catalogoBanco(data: any) {
      try {
        const response = await axios.post(`/api/catalogoNomina/bancos`, data)
        this.banco = response.data.data
      } catch (error: any) {
        console.error('Error al obtener banco:', error)
        this.responseMessage = error.message
        throw error
      }
    },
  },
})
