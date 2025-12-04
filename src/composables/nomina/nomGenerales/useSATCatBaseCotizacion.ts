import { ref } from 'vue'
import type { SATCatBaseCotizacionModel } from '@/interfaces/nomina/nomGenerales/SATCatBaseCotizacion'
import { getDefaultSATCatBaseCotizacion } from '@/utils/nomina/nomGenerales/getDefaultSATCatBaseCotizacion'

export function useSATCatBaseCotizacion() {
  const dataModel = ref<SATCatBaseCotizacionModel[]>(getDefaultSATCatBaseCotizacion())

  const resetModel = () => {
    dataModel.value = getDefaultSATCatBaseCotizacion()
  }

  const setSATCatBaseCotizacion = (data: Partial<SATCatBaseCotizacionModel>) => {
    dataModel.value = { ...getDefaultSATCatBaseCotizacion(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setSATCatBaseCotizacion,
  }
}
