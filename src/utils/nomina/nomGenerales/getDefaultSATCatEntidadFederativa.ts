import type { SATCatEntidadFederativaModel } from '@/interfaces/nomina/nomGenerales/SATCatEntidadFederativa'

export function getDefaultSATCatEntidadFederativa(): SATCatEntidadFederativaModel {
  return {
    ClaveEstado: '',
    ClavePais: '',
    Descripcion: '',
  }
}
