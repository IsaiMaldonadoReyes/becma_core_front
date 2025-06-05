import { ref } from 'vue'
import type { SATCatTipoEmpleadoModel } from '@/interfaces/nomina/nomGenerales/SATCatTipoEmpleado'
import { getDefaultSATCatTipoEmpleado } from '@/utils/nomina/nomGenerales/getDefaultSATCatTipoEmpleado'

export function useSATCatTipoEmpleado() {
  const dataModel = ref<SATCatTipoEmpleadoModel>(getDefaultSATCatTipoEmpleado())

  const resetModel = () => {
    dataModel.value = getDefaultSATCatTipoEmpleado()
  }

  const setSATCatTipoEmpleado = (data: Partial<SATCatTipoEmpleadoModel>) => {
    dataModel.value = { ...getDefaultSATCatTipoEmpleado(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setSATCatTipoEmpleado,
  }
}
