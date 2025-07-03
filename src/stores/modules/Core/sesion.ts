import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

interface sessionState {
  object: any
  responseMessage: string
  type: string
  auth: boolean
  userInformation: UserInformation
  userRoutes: UserRoute[]
  authRoutes: boolean
}

interface UserRoute {
  sistema: string
  ruta: string
}

interface UserInformation {
  id: string
  correo: string
  nombre: string
  apellidoPaterno: string
  apellidoMaterno: string
  imagen: string
  rol: string
}

export const sessionStore = defineStore({
  id: 'session',
  state: (): sessionState => ({
    auth: false,
    object: {},
    userInformation: {} as UserInformation,
    userRoutes: [] as UserRoute[],
    authRoutes: false,
    responseMessage: '',
    type: '',
  }),
  actions: {
    async login(credentials: any) {
      try {
        // 1. Obtener el token CSRF antes de hacer login
        await axios.get('/sanctum/csrf-cookie')

        // 2. Intentar el inicio de sesión
        const response = await axios.post('/api/login', credentials)

        // 3. Almacenar los datos de la sesión
        this.auth = true
        this.object = response.data
      } catch (error: any) {
        // 4. Manejo de errores
        console.error('Error en login:', error)

        // 5. Guardar solo el mensaje de error (si existe)
        this.object = error.response?.data?.message || 'Error desconocido'

        // Opcional: Lanzar el error si necesitas manejarlo en otro lugar
        //throw error
      }
    },

    async logout() {
      try {
        const response = await axios.post('/api/logout')

        this.auth = false
        this.object = {}
      } catch (error) {
        //throw new Error("Error al cerrar la sesión");
      }
    },

    async authDirectories() {
      try {
        // 1. Intentar la petición
        const response = await axios.get('/api/authDirectories')

        // 2. Almacenar los datos de la sesión
        this.authRoutes = true
        this.userRoutes = response.data as UserRoute[]
      } catch (error: any) {
        // 4. Manejo de errores
        //console.error('Error en obtener información:', error)
        this.authRoutes = false
        //throw error
      }
    },

    async authUserInformation() {
      try {
        // 1. Intentar la petición
        const response = await axios.get('/api/authUserInformation')
        this.auth = true
        this.userInformation = response.data
      } catch (error: any) {
        // 4. Manejo de errores
        //console.error('Error en obtener información:', error)
        //throw error
      }
    },

    async resetPassword(data: any) {
      try {
        // 1. Intentar la petición
        const response = await axios.post('/api/resetPassword', data)

        this.object = response.data
      } catch (error: any) {
        // 4. Manejo de errores
        console.log(error)

        this.responseMessage = error.message
        //throw error
      }
    },

    async userInformation() {
      try {
        const params = {
          datos: {
            cuenta_rfc: '',
          },
        }

        const response = await axios.get('/users/informacion', {
          params,
        })

        //console.log(response.data);
        if (response.data.type === 'success') {
        }
      } catch (error) {
        //throw new Error("Error al cargar los ejercicios Dashboard");
      }
    },

    async resetPassword2(data: any) {
      try {
        const response = await axios.post('/users/recovery_password', data)
        //this.responseMessage = response.data.sys.mensaje_operacion;
        this.responseMessage = 'Se enviará un correo con instrucciones para recuperar su contraseña'
      } catch (error) {
        throw new Error('Error al enviar la petición de cambio de contraseña')
      }
    },

    async createAccount(data: any) {
      try {
        const response = await axios.post('/users/dummy_contactos', data)
        this.responseMessage = response.data.sys
        this.type = response.data.type
        //this.responseMessage = "Se enviará un correo con instrucciones para recuperar su contraseña";
      } catch (error: any) {
        // Verifica si el error tiene una respuesta de Axios
        let errorResult = error.response?.data?.result

        // Si es un array, une los mensajes en un string
        let errorReq = Array.isArray(errorResult)
          ? errorResult.join(' ')
          : errorResult || 'Ocurrió un problema en la petición'

        this.responseMessage = errorReq
        this.type = 'error'
      }
    },
  },
})
