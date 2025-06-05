import type { SATCatBaseCotizacionModel } from '@/interfaces/nomina/nomGenerales/SATCatBaseCotizacion'

export function getDefaultSATCatBaseCotizacion(): SATCatBaseCotizacionModel[] {
  return [
    { Codigo: 'F', Descripcion: 'Fijo' },
    { Codigo: 'M', Descripcion: 'Mixto' },
    { Codigo: 'V', Descripcion: 'Variable' },
  ]
}
