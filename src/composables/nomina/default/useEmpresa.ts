import { ref } from 'vue'
import type { EmpresaModel } from '@/interfaces/nomina/default/nom10000'
import { getDefaultEmpresa } from '@/utils/nomina/default/getDefaultEmpresa'

export function useEmpresa() {
  const dataModel = ref<EmpresaModel>(getDefaultEmpresa())

  const resetModel = () => {
    dataModel.value = getDefaultEmpresa()
  }

  const setNom10000 = (data: Partial<EmpresaModel>) => {
    dataModel.value = { ...getDefaultEmpresa(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setNom10000,
  }
}
