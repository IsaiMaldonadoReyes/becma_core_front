import { ref } from 'vue'
import type { EmpleadoModel } from '@/interfaces/nomina/gape/EmpleadoModel'
import { getDefaultEmpleado } from '@/utils/nomina/gape/getDefaultEmpleado' // o desde donde lo guardes
import { id } from 'vuetify/locale'

export function useEmpleadoModel() {
  const dataModel = ref<EmpleadoModel>(getDefaultEmpleado())

  const resetModel = (preservarCliente = true) => {
    const clienteId = dataModel.value.id_nomina_gape_cliente
    const fiscal = dataModel.value.fiscal

    dataModel.value = getDefaultEmpleado()

    if (preservarCliente) {
      dataModel.value.id_nomina_gape_cliente = clienteId
      dataModel.value.fiscal = fiscal
    }
  }

  const setEmpleado = (data: Partial<EmpleadoModel>) => {
    // Campos que no deben perderse
    const preserveFields = {
      id_nomina_gape_cliente: dataModel.value.id_nomina_gape_cliente,
      id_nomina_gape_empresa: dataModel.value.id_nomina_gape_empresa,
      fiscal: dataModel.value.fiscal,
      idempleado: dataModel.value.idempleado,
    }

    // Fusiona los datos nuevos sin resetear los preservados
    dataModel.value = {
      ...getDefaultEmpleado(),
      ...preserveFields, // prioridad para mantener los valores actuales
      ...data, // sobreescribe solo con los datos del backend
    }
  }

  return {
    dataModel,
    resetModel,
    setEmpleado,
  }
}
