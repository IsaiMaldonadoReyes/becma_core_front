import { ref } from 'vue'
import type { EmpresaModel } from '@/interfaces/nomina/gape/Empresa'
import { getDefaultEmpresa } from '@/utils/nomina/gape/getDefaultEmpresa'

export function useEmpresaModel() {
  const dataModel = ref<EmpresaModel>(getDefaultEmpresa())

  const resetModel = (preservarEmpresa = true) => {
    const clienteId = dataModel.value.id_nomina_gape_cliente

    dataModel.value = getDefaultEmpresa()

    if (preservarEmpresa) {
      dataModel.value.id_nomina_gape_cliente = clienteId
    }
  }

  const resetModelEmpresa = (preservarEmpresa = true) => {
    const clienteId = dataModel.value.id_nomina_gape_cliente
    const empresaId = dataModel.value.id_empresa_database

    dataModel.value = getDefaultEmpresa()

    if (preservarEmpresa) {
      dataModel.value.id_nomina_gape_cliente = clienteId
      dataModel.value.id_empresa_database = empresaId
    }
  }

  const setEmpresa = (data: Partial<EmpresaModel>) => {
    dataModel.value = { ...getDefaultEmpresa(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setEmpresa,
    resetModelEmpresa,
  }
}
