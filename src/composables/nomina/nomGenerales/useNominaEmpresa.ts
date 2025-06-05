import { ref } from 'vue'
import type { NominaEmpresaModel } from '@/interfaces/nomina/nomGenerales/nom10000'
import { getDefaultNominaEmpresa } from '@/utils/nomina/nomGenerales/getDefaultNominaEmpresa'

export function useNominaEmpresaModel() {
  const dataModel = ref<NominaEmpresaModel>(getDefaultNominaEmpresa())

  const resetModel = () => {
    dataModel.value = getDefaultNominaEmpresa()
  }

  const setNominaEmpresa = (data: Partial<NominaEmpresaModel>) => {
    dataModel.value = { ...getDefaultNominaEmpresa(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setNominaEmpresa,
  }
}
