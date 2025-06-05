import { ref } from 'vue'
import type { PuestoModel } from '@/interfaces/nomina/default/nom10006'
import { getDefaultPuesto } from '@/utils/nomina/default/getDefaultPuesto'

export function usePuestoModel() {
  const dataModel = ref<PuestoModel>(getDefaultPuesto())

  const resetModel = () => {
    dataModel.value = getDefaultPuesto()
  }

  const setPuesto = (data: Partial<PuestoModel>) => {
    dataModel.value = { ...getDefaultPuesto(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setPuesto,
  }
}
