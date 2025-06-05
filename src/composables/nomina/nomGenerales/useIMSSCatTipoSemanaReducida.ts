import { ref } from 'vue'
import type { IMSSCatTipoSemanaReducidaModel } from '@/interfaces/nomina/nomGenerales/IMSSCatTipoSemanaReducida'
import { getDefaultIMSSCatTipoSemanaReducida } from '@/utils/nomina/nomGenerales/getDefaultIMSSCatTipoSemanaReducida'

export function useIMSSCatTipoSemanaReducida() {
  const dataModel = ref<IMSSCatTipoSemanaReducidaModel>(getDefaultIMSSCatTipoSemanaReducida())

  const resetModel = () => {
    dataModel.value = getDefaultIMSSCatTipoSemanaReducida()
  }

  const setModel = (data: Partial<IMSSCatTipoSemanaReducidaModel>) => {
    dataModel.value = { ...getDefaultIMSSCatTipoSemanaReducida(), ...data }
  }

  return {
    dataModel,
    resetModel,
    setModel,
  }
}
