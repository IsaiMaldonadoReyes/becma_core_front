import { ref } from 'vue'
import type { ConceptoModel } from '@/interfaces/nomina/default/nom10004'
import { getDefaultConcepto } from '@/utils/nomina/default/getDefaultConcepto'

export function useConceptoModel() {
  const dataModel = ref<ConceptoModel>(getDefaultConcepto())

  const resetModel = () => {
    dataModel.value = getDefaultConcepto()
  }

  const setConcepto = (data: Partial<ConceptoModel>) => {
    dataModel.value = { ...getDefaultConcepto(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setConcepto,
  }
}
