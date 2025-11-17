export interface ApiError {
  type?: string
  message: string
  errors?: Record<string, string[]>
}

export function handleApiError(error: any): ApiError {
  if (error.code === 'ECONNABORTED') {
    return { message: 'Tiempo de espera agotado. Intenta nuevamente.' }
  }

  if (error.message === 'Network Error') {
    return { message: 'No hay conexión con el servidor.' }
  }

  if (error.response) {
    const { status } = error.response

    switch (status) {
      case 401:
        return { message: 'Tu sesión ha expirado. Inicia sesión nuevamente.' }
      case 403:
        return { message: 'No tienes permisos para realizar esta acción.' }
      case 404:
        return { message: 'El recurso solicitado no existe.' }
      case 422:
        return {
          type: 'validation',
          message: error.response.data.message || 'Error de validación',
          errors: error.response.data.errors || {},
        }
      case 500:
        return { message: 'Ocurrió un error interno en el servidor.' }
      default:
        return { message: error.response.data.message || 'Error desconocido.' }
    }
  }

  return { message: error.message || 'Error inesperado.' }
}
