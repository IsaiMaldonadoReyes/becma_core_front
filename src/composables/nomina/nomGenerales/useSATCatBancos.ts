// composables/nomGenerales/useSATCatBancosModel.ts
import { ref } from 'vue'
import type { SATCatBancosModel } from '@/interfaces/nomina/nomGenerales/SATCatBancos'
import { getDefaultSATCatBancos } from '@/utils/nomina/nomGenerales/getDefaultSATCatBancos'

export function useSATCatBancosModel() {
  const dataModel = ref<SATCatBancosModel>(getDefaultSATCatBancos())

  const resetModel = () => {
    dataModel.value = getDefaultSATCatBancos()
  }

  const setSATCatBanco = (data: Partial<SATCatBancosModel>) => {
    dataModel.value = { ...getDefaultSATCatBancos(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setSATCatBanco,
  }
}
