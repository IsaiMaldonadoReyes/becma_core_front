import { ref } from 'vue'
import type { SATCatFormaPagoModel } from '@/interfaces/nomina/nomGenerales/SATCatFormaPago'
import { getDefaultSATCatFormaPago } from '@/utils/nomina/nomGenerales/getDefaultSATCatFormaPago'

export function useSATCatFormaPago() {
  const dataModel = ref<SATCatFormaPagoModel[]>(getDefaultSATCatFormaPago())

  const resetModel = () => {
    dataModel.value = getDefaultSATCatFormaPago()
  }

  const setSATCatFormaPago = (data: Partial<SATCatFormaPagoModel>) => {
    dataModel.value = { ...getDefaultSATCatFormaPago(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setSATCatFormaPago,
  }
}
