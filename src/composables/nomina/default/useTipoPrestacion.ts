import { ref } from 'vue'
import type { TipoPrestacionModel } from '@/interfaces/nomina/default/nom10050'
import { getDefaultTipoPrestacion } from '@/utils/nomina/default/getDefaultTipoPrestacion'

export function useTipoPrestacionModel() {
  const dataModel = ref<TipoPrestacionModel>(getDefaultTipoPrestacion())

  const resetModel = () => {
    dataModel.value = getDefaultTipoPrestacion()
  }

  const setTipoPrestacion = (data: Partial<TipoPrestacionModel>) => {
    dataModel.value = { ...getDefaultTipoPrestacion(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setTipoPrestacion,
  }
}
