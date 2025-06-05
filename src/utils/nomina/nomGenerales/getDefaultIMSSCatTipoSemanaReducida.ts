import type { IMSSCatTipoSemanaReducidaModel } from '@/interfaces/nomina/nomGenerales/IMSSCatTipoSemanaReducida'

export function getDefaultIMSSCatTipoSemanaReducida(): IMSSCatTipoSemanaReducidaModel {
  return {
    tipoSemanaReducida: undefined,
    descripcion: '',
  }
}
