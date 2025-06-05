import { ref } from 'vue'
import type { TipoPeriodoModel } from '@/interfaces/nomina/default/nom10023'
import { getDefaultTipoPeriodo } from '@/utils/nomina/default/getDefaultTipoPeriodo'

export function useTipoPeriodoModel() {
  const dataModel = ref<TipoPeriodoModel>(getDefaultTipoPeriodo())

  const resetModel = () => {
    dataModel.value = getDefaultTipoPeriodo()
  }

  const setTipoPeriodo = (data: Partial<TipoPeriodoModel>) => {
    dataModel.value = { ...getDefaultTipoPeriodo(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setTipoPeriodo,
  }
}
