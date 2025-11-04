import { ref } from 'vue'
import type { EmpleadoModel } from '@/interfaces/nomina/gape/EmpleadoModel'
import { getDefaultEmpleado } from '@/utils/nomina/gape/getDefaultEmpleado' // o desde donde lo guardes

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
    dataModel.value = { ...getDefaultEmpleado(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setEmpleado,
  }
}
