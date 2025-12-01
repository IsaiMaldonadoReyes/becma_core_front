import { ref } from 'vue'
import type { PrenominaModel } from '@/interfaces/nomina/gape/PrenominaModel'
import { getDefaultPrenomina } from '@/utils/nomina/gape/getDefaultPrenomina'

export function usePrenominaModel() {
  const dataModel = ref<PrenominaModel>(getDefaultPrenomina())

  const resetModel = (preservarCliente = true) => {
    const clienteId = dataModel.value.id_nomina_gape_cliente
    const fiscal = dataModel.value.fiscal

    dataModel.value = getDefaultPrenomina()
    if (preservarCliente) {
      dataModel.value.id_nomina_gape_cliente = clienteId
      dataModel.value.fiscal = fiscal
    }
  }

  const setPrenomina = (data: Partial<PrenominaModel>) => {
    dataModel.value = { ...getDefaultPrenomina(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setPrenomina,
  }
}
