import { ref } from 'vue'
import type { IncidenciaModel } from '@/interfaces/nomina/gape/IncidenciaModel'
import { getDefaultIncidencia } from '@/utils/nomina/gape/getDefaultIncidencia'

export function useIncidenciaModel() {
  const dataModel = ref<IncidenciaModel>(getDefaultIncidencia())

  const resetModel = (preservarCliente = true) => {
    const clienteId = dataModel.value.id_nomina_gape_cliente
    const fiscal = dataModel.value.fiscal

    dataModel.value = getDefaultIncidencia()
    if (preservarCliente) {
      dataModel.value.id_nomina_gape_cliente = clienteId
      dataModel.value.fiscal = fiscal
    }
  }

  const setIncidencia = (data: Partial<IncidenciaModel>) => {
    dataModel.value = { ...getDefaultIncidencia(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setIncidencia,
  }
}
