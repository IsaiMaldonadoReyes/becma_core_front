import { defineStore } from 'pinia'
import axios from 'axios'
import type { TipoPeriodoModel } from '@/interfaces/nomina/default/nom10023'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface TipoPeriodoState {
  tipoPeriodo: TipoPeriodoModel[]
  ejercicios: TipoPeriodoModel[]
  idEjercicio: 0
  responseMessage: string
}

export const useTipoPeriodoStore = defineStore({
  id: 'nominaTipoPeriodo',
  state: (): TipoPeriodoState => ({
    tipoPeriodo: [],
    ejercicios: [],
    idEjercicio: 0,
    responseMessage: '',
  }),
  actions: {
    reset() {
      this.tipoPeriodo = []
    },
    async tipoPeriodoPorEmpresa(data: any) {
      try {
        const response = await axios.post(`/api/nominaGapeEmpresa/tipoPeriodo`, data)
        this.tipoPeriodo = response.data.data
      } catch (error: any) {
        console.error('Error al obtener tipo de periodo:', error)
        this.responseMessage = error.message
        throw error
      }
    },
    async catalogoTipoPeriodo(data: any) {
      try {
        const response = await axios.post(`/api/catalogoNomina/tipoPeriodo`, data)
        this.tipoPeriodo = response.data.data
      } catch (error: any) {
        console.error('Error al obtener tipo de periodo:', error)
        this.responseMessage = error.message
        throw error
      }
    },
    async tipoPeriodoNGE(data: any) {
      try {
        const response = await axios.post(`/api/catalogoNomina/tipoPeriodoNGE`, data)
        this.tipoPeriodo = response.data.data
      } catch (error: any) {
        console.error('Error al obtener tipo de periodo:', error)
        this.responseMessage = error.message
        throw error
      }
    },
    async tipoPeriodoConfiguradosNGE(data: any) {
      try {
        const response = await axios.post(`/api/prenomina/tipoPeriodo`, data)
        this.tipoPeriodo = response.data.data
      } catch (error: any) {
        console.error('Error al obtener tipo de periodo:', error)
        this.responseMessage = error.message
        throw error
      }
    },
    async ejerciciosPorTipoPeriodo(data: any) {
      try {
        const response = await axios.post(`/api/prenomina/ejerciciosPorTipoPeriodo`, data)
        this.ejercicios = response.data.data
      } catch (error: any) {
        console.error('Error al obtener tipo de periodo:', error)
        this.responseMessage = error.message
        throw error
      }
    },
    async ejerciciosPorTipoPeriodoActivo(data: any) {
      try {
        const response = await axios.post(`/api/incidencia/ejerciciosPorTipoPeriodoActivo`, data)
        this.ejercicios = response.data.data
        this.idEjercicio = response.data.idPeriodo
      } catch (error: any) {
        console.error('Error al obtener tipo de periodo:', error)
        this.responseMessage = error.message
        throw error
      }
    },
  },
})
