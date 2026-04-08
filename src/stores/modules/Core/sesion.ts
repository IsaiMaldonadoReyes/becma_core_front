import { defineStore } from 'pinia'

import axios from '@/plugins/axios'

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

interface sessionState {
  auth: boolean | null
  object: any
  userInformation: UserInformation | null
  userRoutes: UserRoute[]
  authRoutes: boolean
  responseMessage: string
  type: string
}

export const sessionStore = defineStore({
  id: 'session',
  state: (): sessionState => ({
    auth: null,
    object: {},
    userInformation: null,
    userRoutes: [],
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

        await this.authUserInformation()
      } catch (error: any) {
        // 4. Manejo de errores
        this.auth = false
        console.error('Error en login:', error)
        this.object = error.response?.data?.message || 'Error desconocido'
      }
    },

    async logout() {
      this.auth = false
      this.object = {}
      this.userInformation = null
      this.userRoutes = []
      this.authRoutes = false

      try {
        await axios.post('/api/logout')
      } catch {
        // aunque falle backend, frontend ya está deslogueado
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
        const response = await axios.get('/api/authUserInformation')

        this.auth = true
        this.userInformation = response.data
      } catch {
        this.auth = false
        this.userInformation = null
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
