import type { SATCatTipoRegimenModel } from '@/interfaces/nomina/nomGenerales/SATCatTipoRegimen'

export function getDefaultSATCatTipoRegimen(): SATCatTipoRegimenModel {
  return {
    claveTipoRegimen: '',
    descripcion: '',
  }
}
