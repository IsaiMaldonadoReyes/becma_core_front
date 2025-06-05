import { ref } from 'vue'
import type { SATCatTipoContratoModel } from '@/interfaces/nomina/nomGenerales/SATCatTipoContrato'
import { getDefaultSATCatTipoContrato } from '@/utils/nomina/nomGenerales/getDefaultSATCatTipoContrato'

export function useSATCatTipoContrato() {
  const dataModel = ref<SATCatTipoContratoModel>(getDefaultSATCatTipoContrato())

  const resetModel = () => {
    dataModel.value = getDefaultSATCatTipoContrato()
  }

  const setSATCatTipoContrato = (data: Partial<SATCatTipoContratoModel>) => {
    dataModel.value = { ...getDefaultSATCatTipoContrato(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setSATCatTipoContrato,
  }
}
