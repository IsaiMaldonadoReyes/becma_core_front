import type { SATCatBasePagoModel } from '@/interfaces/nomina/nomGenerales/SATCatBasePago'

export function getDefaultSATCatBasePago(): SATCatBasePagoModel[] {
  return [
    { Codigo: 'S', Descripcion: 'Sueldo' },
    { Codigo: 'C', Descripcion: 'Comisión' },
    { Codigo: 'D', Descripcion: 'Destajo' },
    { Codigo: 'O', Descripcion: 'Sueldo/Comisión' },
    { Codigo: 'E', Descripcion: 'Sueldo/Destajo' },
  ]
}
