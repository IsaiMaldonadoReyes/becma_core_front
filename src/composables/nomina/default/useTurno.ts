import { ref } from 'vue'
import type { TurnoModel } from '@/interfaces/nomina/default/nom10032'
import { getDefaultTurno } from '@/utils/nomina/default/getDefaultTurno'

export function useTurnoModel() {
  const dataModel = ref<TurnoModel>(getDefaultTurno())

  const resetModel = () => {
    dataModel.value = getDefaultTurno()
  }

  const setTurno = (data: Partial<TurnoModel>) => {
    dataModel.value = { ...getDefaultTurno(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setTurno,
  }
}
