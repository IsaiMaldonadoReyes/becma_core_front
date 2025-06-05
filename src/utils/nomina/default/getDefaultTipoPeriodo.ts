import type { TipoPeriodoModel } from '@/interfaces/nomina/default/nom10023'

export function getDefaultTipoPeriodo(): TipoPeriodoModel {
  return {
    idtipoperiodo: 0,
    nombretipoperiodo: undefined,
    diasdelperiodo: undefined,
    diasdepago: undefined,
    periodotrabajo: undefined,
    modificarhistoria: false,
    ajustarperiodoscalendario: false,
    numeroseptimos: undefined,
    posicionseptimos: undefined,
    posicionpagonomina: undefined,
    fechainicioejercicio: undefined,
    ejercicio: undefined,
    timestamp: undefined,
    ccalculomescalendario: undefined,
    PeriodicidadPago: '',
  }
}
