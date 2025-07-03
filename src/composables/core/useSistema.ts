import { ref } from 'vue'
import type { SistemaModel } from '@/interfaces/core/Sistema'
import { getDefaultSistema } from '@/utils/core/getDefaultSistema'

export function useSistemaModel() {
  const dataModel = ref<SistemaModel>(getDefaultSistema())

  const resetModel = () => {
    dataModel.value = getDefaultSistema()
  }

  const setSistema = (data: Partial<SistemaModel>) => {
    dataModel.value = { ...getDefaultSistema(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setSistema,
  }
}
