import { ref } from 'vue'
import type { PeriodoModel } from '@/interfaces/nomina/default/nom10002'
import { getDefaultPeriodo } from '@/utils/nomina/default/getDefaultPeriodo'

export function usePeriodoModel() {
  const dataModel = ref<PeriodoModel>(getDefaultPeriodo())

  const resetModel = () => {
    dataModel.value = getDefaultPeriodo()
  }

  const setTipoPeriodo = (data: Partial<PeriodoModel>) => {
    dataModel.value = { ...getDefaultPeriodo(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setTipoPeriodo,
  }
}
