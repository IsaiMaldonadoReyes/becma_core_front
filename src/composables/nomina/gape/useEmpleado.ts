import { ref } from 'vue'
import type { EmpleadoModel } from '@/interfaces/nomina/gape/EmpleadoModel'
import { getDefaultEmpleado } from '@/utils/nomina/gape/getDefaultEmpleado' // o desde donde lo guardes

export function useEmpleadoModel() {
  const dataModel = ref<EmpleadoModel>(getDefaultEmpleado())

  const resetModel = () => {
    dataModel.value = getDefaultEmpleado()
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
