import type { PuestoModel } from '@/interfaces/nomina/default/nom10006'

export function getDefaultPuesto(): PuestoModel {
  return {
    idpuesto: 0,
    numeropuesto: undefined,
    descripcion: undefined,
    timestamp: undefined,
    detalle: undefined,
  }
}
