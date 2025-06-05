import { ref } from 'vue'
import type { SATCatClaveEntidadFederativaModel } from '@/interfaces/nomina/nomGenerales/SATCatClaveEntidadFederativa'
import { getDefaultSATCatClaveEntidadFederativa } from '@/utils/nomina/nomGenerales/getDefaultSATCatClaveEntidadFederativa'

export function useSATCatClaveEntidadFederativa() {
  const dataModel = ref<SATCatClaveEntidadFederativaModel>(getDefaultSATCatClaveEntidadFederativa())

  const resetModel = () => {
    dataModel.value = getDefaultSATCatClaveEntidadFederativa()
  }

  const setSATCatClaveEntidadFederativa = (data: Partial<SATCatClaveEntidadFederativaModel>) => {
    dataModel.value = { ...getDefaultSATCatClaveEntidadFederativa(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setSATCatClaveEntidadFederativa,
  }
}
