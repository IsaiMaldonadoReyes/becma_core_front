import type { EsquemaModel } from '@/interfaces/nomina/gape/EsquemaModel'

export function getDefaultEsquema(): EsquemaModel {
  return {
    id: 0,
    esquema: '',
    contpaq: false,
  }
}
