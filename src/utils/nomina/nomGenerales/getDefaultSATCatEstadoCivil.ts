import type { SATCatEstadoCivilModel } from '@/interfaces/nomina/nomGenerales/SATCatEstadoCivil'

export function getDefaultSATCatEstadoCivil(): SATCatEstadoCivilModel[] {
  return [
    { Codigo: 'C', Descripcion: 'Casado' },
    { Codigo: 'S', Descripcion: 'Soltero' },
    { Codigo: 'V', Descripcion: 'Viudo' },
    { Codigo: 'D', Descripcion: 'Divorciado' },
  ]
}
