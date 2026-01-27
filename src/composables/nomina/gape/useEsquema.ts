import { ref } from 'vue'
import type { EsquemaModel } from '@/interfaces/nomina/gape/EsquemaModel'
import { getDefaultEsquema } from '@/utils/nomina/gape/getDefaultEsquema'

export function useEsquemaModel() {
  const dataModel = ref<EsquemaModel>(getDefaultEsquema())

  const resetModel = () => {
    dataModel.value = getDefaultEsquema()
  }

  const setEsquema = (data: Partial<EsquemaModel>) => {
    dataModel.value = { ...getDefaultEsquema(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setEsquema,
  }
}
