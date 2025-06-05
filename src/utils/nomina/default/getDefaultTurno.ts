import type { TurnoModel } from '@/interfaces/nomina/default/nom10032'

export function getDefaultTurno(): TurnoModel {
  return {
    idturno: 0,
    numeroturno: undefined,
    descripcion: undefined,
    numerohoras: undefined,
    timestamp: undefined,
    tipoJornada: '',
  }
}
