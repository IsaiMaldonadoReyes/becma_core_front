import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

export const useDispersionStore = defineStore({
  id: 'nominaDispersion',
  actions: {
    async descargarArchivo(tipo: string, params = {}) {
      try {
        const response = await axios({
          url: '/api/dispersion',
          method: 'POST',
          responseType: 'blob',
          data: {
            tipo,
            ...params,
          },
        })

        // Determinar nombre de archivo según tipo
        const filename = (() => {
          switch (tipo) {
            case 'Fondeadora':
              return 'dispersion_fondeadora.csv'
            case 'AztecaBancario':
              return 'dispersion_azteca_bancaria.xlsx'
            case 'AztecaInterbancario':
              return 'dispersion_azteca_interbancaria.xlsx'
            case 'BanorteTerceros':
              return 'dispersion_banorte_tab.csv'
            default:
              return 'dispersion_generica.txt'
          }
        })()

        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        link.remove()
      } catch (error: any) {
        console.error('Error al descargar archivo de dispersión:', error)
        throw error
      }
    },
  },
})
