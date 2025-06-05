import { ref } from 'vue'
import type { RegistroPatronalModel } from '@/interfaces/nomina/default/nom10035'
import { getDefaultRegistroPatronal } from '@/utils/nomina/default/getDefaultRegistroPatronal'

export function useRegistroPatronalModel() {
  const dataModel = ref<RegistroPatronalModel>(getDefaultRegistroPatronal())

  const resetModel = () => {
    dataModel.value = getDefaultRegistroPatronal()
  }

  const setRegistroPatronal = (data: Partial<RegistroPatronalModel>) => {
    dataModel.value = { ...getDefaultRegistroPatronal(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setRegistroPatronal,
  }
}
