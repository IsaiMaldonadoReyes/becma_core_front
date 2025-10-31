import { ref } from 'vue'
import type { ConceptoPagoParametrizacionModel } from '@/interfaces/nomina/gape/ConceptoPagoParametrizacionModel'
import { getDefaultConceptoPagoParametrizacion } from '@/utils/nomina/gape/getDefaultConceptoPagoPaarametrizacion'

export function useConceptoPagoParametrizacionModel() {
  const dataModel = ref<ConceptoPagoParametrizacionModel>(getDefaultConceptoPagoParametrizacion())

  const resetModel = (preservarEmpresa = true) => {
    const clienteId = dataModel.value.id_nomina_gape_cliente
    const fiscal = dataModel.value.fiscal
    const estado = dataModel.value.estado

    dataModel.value = getDefaultConceptoPagoParametrizacion()

    if (preservarEmpresa) {
      dataModel.value.id_nomina_gape_cliente = clienteId
      dataModel.value.fiscal = fiscal
      dataModel.value.estado = estado
    }
  }

  const setConceptoPagoParametrizacion = (data: Partial<ConceptoPagoParametrizacionModel>) => {
    dataModel.value = { ...getDefaultConceptoPagoParametrizacion(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setConceptoPagoParametrizacion,
  }
}
