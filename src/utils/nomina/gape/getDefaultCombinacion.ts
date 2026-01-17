import type { CombinacionModel } from '@/interfaces/nomina/gape/CombinacionModel'

export function getDefaultCombinacion(): CombinacionModel {
  return {
    id: '',
    combinacion: '',
    contpaq: '',
  }
}
