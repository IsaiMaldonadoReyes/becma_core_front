import { ref } from 'vue'
import type { DepartamentoModel } from '@/interfaces/nomina/default/nom10003'
import { getDefaultDepartamento } from '@/utils/nomina/default/getDefaultDepartamento'

export function useDepartamentoModel() {
  const dataModel = ref<DepartamentoModel>(getDefaultDepartamento())

  const resetModel = () => {
    dataModel.value = getDefaultDepartamento()
  }

  const setDepartamento = (data: Partial<DepartamentoModel>) => {
    dataModel.value = { ...getDefaultDepartamento(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setDepartamento,
  }
}
