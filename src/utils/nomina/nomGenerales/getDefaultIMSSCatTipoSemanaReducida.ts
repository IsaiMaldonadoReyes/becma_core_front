import type { IMSSCatTipoSemanaReducidaModel } from '@/interfaces/nomina/nomGenerales/IMSSCatTipoSemanaReducida'

export function getDefaultIMSSCatTipoSemanaReducida(): IMSSCatTipoSemanaReducidaModel {
  return {
    TipoSemanaReducida: undefined,
    descripcion: '',
  }
}
