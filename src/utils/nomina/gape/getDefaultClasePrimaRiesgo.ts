import type { ClasePrimaRiesgoModel } from '@/interfaces/nomina/gape/ClasePrimaRiesgoModel'

export function getDefaultClasePrimaRiesgo(): ClasePrimaRiesgoModel[] {
  return [
    { codigo: 'baja', concepto: 'Baja' },
    { codigo: 'media', concepto: 'Media' },
    { codigo: 'alta', concepto: 'Alta' },
  ]
}
