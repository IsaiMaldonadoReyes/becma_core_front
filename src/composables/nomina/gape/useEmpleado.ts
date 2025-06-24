import { ref } from 'vue'
import type { EmpleadoModel } from '@/interfaces/nomina/gape/EmpleadoModel'
import { getDefaultEmpleado } from '@/utils/nomina/gape/getDefaultEmpleado' // o desde donde lo guardes

export function useEmpleadoModel() {
  const dataModel = ref<EmpleadoModel>(getDefaultEmpleado())

  const resetModel = (preservarEmpresa = true) => {
    const empresaId = dataModel.value.id_nomina_gape_empresa

    dataModel.value = getDefaultEmpleado()

    if (preservarEmpresa) {
      dataModel.value.id_nomina_gape_empresa = empresaId
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
