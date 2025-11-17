import axios from 'axios'
import { handleApiError } from '@/utils/handleError'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

axios.interceptors.response.use(
  (response) => response, // pasa las respuestas exitosas
  (error) => {
    const err = handleApiError(error)

    return Promise.reject(err)
  },
)

export default axios
