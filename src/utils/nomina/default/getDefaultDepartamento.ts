// utils/nomina/gape/getDefaultDepartamento.ts
import type { DepartamentoModel } from '@/interfaces/nomina/default/nom10003'

export function getDefaultDepartamento(): DepartamentoModel {
  return {
    iddepartamento: 0,
    numerodepartamento: undefined,
    descripcion: '',
    beneficiario: '',
    cuentacw: '',
    timestamp: new Date(),
    csegmentonegocio: '',
  }
}
