import { ref } from 'vue'
import type { SATCatEstadoCivilModel } from '@/interfaces/nomina/nomGenerales/SATCatEstadoCivil'
import { getDefaultSATCatEstadoCivil } from '@/utils/nomina/nomGenerales/getDefaultSATCatEstadoCivil'

export function useSATCatEstadoCivil() {
  const dataModel = ref<SATCatEstadoCivilModel>(getDefaultSATCatEstadoCivil())

  const resetModel = () => {
    dataModel.value = getDefaultSATCatEstadoCivil()
  }

  const setSATCatEstadoCivil = (data: Partial<SATCatEstadoCivilModel>) => {
    dataModel.value = { ...getDefaultSATCatEstadoCivil(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setSATCatEstadoCivil,
  }
}
