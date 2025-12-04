import { ref } from 'vue'
import type { SATCatSexoModel } from '@/interfaces/nomina/nomGenerales/SATCatSexo'
import { getDefaultSATCatSexo } from '@/utils/nomina/nomGenerales/getDefaultSATCatSexo'

export function useSATCatSexo() {
  const dataModel = ref<SATCatSexoModel[]>(getDefaultSATCatSexo())

  const resetModel = () => {
    dataModel.value = getDefaultSATCatSexo()
  }

  const setSATCatSexo = (data: Partial<SATCatSexoModel>) => {
    dataModel.value = { ...getDefaultSATCatSexo(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setSATCatSexo,
  }
}
