import { ref } from 'vue'
import type { SATCatZonaSalarioModel } from '@/interfaces/nomina/nomGenerales/SATCatZonaSalario'
import { getDefaultSATCatZonaSalario } from '@/utils/nomina/nomGenerales/getDefaultSATCatZonaSalario'

export function useSATCatZonaSalario() {
  const dataModel = ref<SATCatZonaSalarioModel[]>(getDefaultSATCatZonaSalario())

  const resetModel = () => {
    dataModel.value = getDefaultSATCatZonaSalario()
  }

  const setSATCatZonaSalario = (data: Partial<SATCatZonaSalarioModel>) => {
    dataModel.value = { ...getDefaultSATCatZonaSalario(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setSATCatZonaSalario,
  }
}
