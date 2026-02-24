// utils/nomina/gape/getDefaultDepartamento.ts
import type { ConceptoModel } from '@/interfaces/nomina/default/nom10004'

export function getDefaultConcepto(): ConceptoModel {
  return {
    idconcepto: 0,
    numeroconcepto: 0,
    tipoconcepto: '',
    descripcion: '',
  }
}
