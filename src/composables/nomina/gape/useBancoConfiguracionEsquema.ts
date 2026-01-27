import { ref } from 'vue'
import type { BancoConfiguracionEsquemaModel } from '@/interfaces/nomina/gape/BancoConfiguracionEsquemaModel'
import { getDefaultBancoConfiguracionEsquema } from '@/utils/nomina/gape/getDefaultBancoConfiguracionEsquema'

export function useBancoConfiguracionEsquemaModel() {
  const dataModel = ref<BancoConfiguracionEsquemaModel>(getDefaultBancoConfiguracionEsquema())

  const resetModel = () => {
    dataModel.value = getDefaultBancoConfiguracionEsquema()
  }

  const setBanco = (data: Partial<BancoConfiguracionEsquemaModel>) => {
    dataModel.value = { ...getDefaultBancoConfiguracionEsquema(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setBanco,
  }
}
