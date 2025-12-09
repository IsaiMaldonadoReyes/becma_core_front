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
    const { status, data } = error.response

    switch (status) {
      case 422:
        return {
          type: 'validation',
          message: data.message || 'Error de validación',
          errors: data.errors || {},
        }
      case 401:
        return { message: 'Tu sesión ha expirado. Inicia sesión nuevamente.' }
      case 403:
        return { message: 'No tienes permisos para realizar esta acción.' }
      case 404:
        return { message: 'Recurso no encontrado.' }
      case 500:
        return { message: 'Error interno del servidor.' }
      default:
        return { message: data.message || 'Error desconocido.' }
    }
  }

  return { message: error.message || 'Error inesperado.' }
}
