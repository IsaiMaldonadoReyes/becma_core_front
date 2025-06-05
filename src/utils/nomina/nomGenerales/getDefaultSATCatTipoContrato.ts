import type { SATCatTipoContratoModel } from '@/interfaces/nomina/nomGenerales/SATCatTipoContrato'

export function getDefaultSATCatTipoContrato(): SATCatTipoContratoModel {
  return {
    ClaveTipoContrato: '',
    Descripcion: '',
  }
}
