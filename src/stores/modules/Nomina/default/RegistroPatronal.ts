import { defineStore } from 'pinia'
import axios from 'axios'
import type { RegistroPatronalModel } from '@/interfaces/nomina/default/nom10035'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface RegistroPatronalState {
  registroPatronal: RegistroPatronalModel[]
  responseMessage: string
}

export const useRegistroPatronalStore = defineStore({
  id: 'nominaRegistroPatronal',
  state: (): RegistroPatronalState => ({
    registroPatronal: [],
    responseMessage: '',
  }),
  actions: {
    async catalogoRegistroPatronal(data: any) {
      try {
        const response = await axios.post(`/api/catalogoNomina/registroPatronal`, data)
        this.registroPatronal = response.data.data
      } catch (error: any) {
        console.error('Error al obtener registro patronal:', error)
        this.responseMessage = error.message
        throw error
      }
    },
  },
})
