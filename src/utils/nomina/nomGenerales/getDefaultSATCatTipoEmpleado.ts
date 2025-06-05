import type { SATCatTipoEmpleadoModel } from '@/interfaces/nomina/nomGenerales/SATCatTipoEmpleado'

export function getDefaultSATCatTipoEmpleado(): SATCatTipoEmpleadoModel[] {
  return [
    { Codigo: 'C', Descripcion: 'No' },
    { Codigo: 'S', Descripcion: 'Si' },
  ]
}
