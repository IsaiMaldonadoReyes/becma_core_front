import { ref } from 'vue'
import type { ParametrizacionModel } from '@/interfaces/nomina/gape/ParametrizacionModel'
import { getDefaultParametrizacion } from '@/utils/nomina/gape/getDefaultParametrizacion'

export function useParametrizacionModel() {
  const dataModel = ref<ParametrizacionModel>(getDefaultParametrizacion())

  const resetModel = () => {
    dataModel.value = getDefaultParametrizacion()
  }

  const setParametrizacion = (data: Partial<ParametrizacionModel>) => {
    dataModel.value = { ...getDefaultParametrizacion(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setParametrizacion,
  }
}
