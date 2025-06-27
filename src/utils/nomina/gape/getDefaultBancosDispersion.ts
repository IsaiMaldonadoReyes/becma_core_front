import type { BancosDispersionModel } from '@/interfaces/nomina/gape/BancosDispersionModel'

export function getDefaultBancosDispersion(): BancosDispersionModel[] {
  return [
    { Codigo: 'Fondeadora', Descripcion: 'Fondeadora' },
    { Codigo: 'AztecaInterbancario', Descripcion: 'Azteca Interbancario' },
    { Codigo: 'AztecaBancario', Descripcion: 'Azteca Bancario' },
    { Codigo: 'BanorteTerceros', Descripcion: 'Banorte Terceros' },
  ]
}
