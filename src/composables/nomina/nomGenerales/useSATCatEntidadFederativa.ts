import { ref } from 'vue'
import type { SATCatEntidadFederativaModel } from '@/interfaces/nomina/nomGenerales/SATCatEntidadFederativa'
import { getDefaultSATCatEntidadFederativa } from '@/utils/nomina/nomGenerales/getDefaultSATCatEntidadFederativa'

export function useSATCatEntidadFederativa() {
  const dataModel = ref<SATCatEntidadFederativaModel>(getDefaultSATCatEntidadFederativa())

  const resetModel = () => {
    dataModel.value = getDefaultSATCatEntidadFederativa()
  }

  const setSATCatEntidadFederativa = (data: Partial<SATCatEntidadFederativaModel>) => {
    dataModel.value = { ...getDefaultSATCatEntidadFederativa(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setSATCatEntidadFederativa,
  }
}
