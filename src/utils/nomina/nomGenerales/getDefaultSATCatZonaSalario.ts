import type { SATCatZonaSalarioModel } from '@/interfaces/nomina/nomGenerales/SATCatZonaSalario'

export function getDefaultSATCatZonaSalario(): SATCatZonaSalarioModel[] {
  return [
    { Codigo: 'A', Descripcion: 'Zona A' },
    { Codigo: 'B', Descripcion: 'Zona B' },
    { Codigo: 'C', Descripcion: 'Zona C' },
  ]
}
