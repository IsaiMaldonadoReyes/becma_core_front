import { ref } from 'vue'
import type { SATCatTipoRegimenModel } from '@/interfaces/nomina/nomGenerales/SATCatTipoRegimen'
import { getDefaultSATCatTipoRegimen } from '@/utils/nomina/nomGenerales/getDefaultSATCatTipoRegimen'

export function useTipoRegimen() {
  const dataModel = ref<SATCatTipoRegimenModel>(getDefaultSATCatTipoRegimen())

  const resetModel = () => {
    dataModel.value = getDefaultSATCatTipoRegimen()
  }

  const setTipoRegimen = (data: Partial<SATCatTipoRegimenModel>) => {
    dataModel.value = { ...getDefaultSATCatTipoRegimen(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setTipoRegimen,
  }
}
