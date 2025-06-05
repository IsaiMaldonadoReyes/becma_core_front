import { ref } from 'vue'
import type { ConexionModel } from '@/interfaces/core/Conexion'
import { getDefaultConexion } from '@/utils/core/getDefaultConexion'

export function useConexion() {
  const conexion = ref<ConexionModel>(getDefaultConexion())
  const conexiones = ref<ConexionModel[]>([])

  const setConexion = (data: Partial<ConexionModel>) => {
    conexion.value = { ...conexion.value, ...data }
  }

  const resetConexion = () => {
    conexion.value = getDefaultConexion()
  }

  return {
    conexion,
    conexiones,
    setConexion,
    resetConexion,
  }
}
