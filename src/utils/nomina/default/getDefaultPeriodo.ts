import type { PeriodoModel } from '@/interfaces/nomina/default/nom10002'

export function getDefaultPeriodo(): PeriodoModel {
  return {
    idperiodo: 0,
    idtipoperiodo: null,
    numeroperiodo: null,
    ejercicio: null,
    mes: null,
    diasdepago: null,
    septimos: null,
    interfazcheqpaqw: false,
    modificacionneto: false,
    calculado: false,
    afectado: false,
    fechainicio: null,
    fechafin: null,
    inicioejercicio: false,
    iniciomes: false,
    finmes: false,
    finejercicio: false,
    timestamp: null,
    cfinbimestreimss: false,
    ciniciobimestreimss: false,
    fechaPago: '', // este es obligatorio, puedes usar dayjs().format('YYYY-MM-DD') si quieres iniciarlo
  }
}
