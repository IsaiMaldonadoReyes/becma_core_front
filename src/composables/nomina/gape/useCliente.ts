import { ref } from 'vue'
import type { ClienteModel } from '@/interfaces/nomina/gape/ClienteModel'
import { getDefaultCliente } from '@/utils/nomina/gape/getDefaultCliente'

export function useClienteModel() {
  const dataModel = ref<ClienteModel>(getDefaultCliente())

  const resetModel = () => {
    dataModel.value = getDefaultCliente()
  }

  const setCliente = (data: Partial<ClienteModel>) => {
    dataModel.value = { ...getDefaultCliente(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setCliente,
  }
}
