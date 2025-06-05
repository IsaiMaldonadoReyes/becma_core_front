import { ref } from 'vue'
import type { SATCatBasePagoModel } from '@/interfaces/nomina/nomGenerales/SATCatBasePago'
import { getDefaultSATCatBasePago } from '@/utils/nomina/nomGenerales/getDefaultSATCatBasePago'

export function useSATCatBasePago() {
  const dataModel = ref<SATCatBasePagoModel>(getDefaultSATCatBasePago())

  const resetModel = () => {
    dataModel.value = getDefaultSATCatBasePago()
  }

  const setSATCatBasePago = (data: Partial<SATCatBasePagoModel>) => {
    dataModel.value = { ...getDefaultSATCatBasePago(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setSATCatBasePago,
  }
}
