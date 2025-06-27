export interface PeriodoModel {
  idperiodo: number
  idtipoperiodo?: number | null
  numeroperiodo?: number | null
  ejercicio?: number | null
  mes?: number | null
  diasdepago?: number | null
  septimos?: number | null
  interfazcheqpaqw: boolean
  modificacionneto: boolean
  calculado: boolean
  afectado: boolean
  fechainicio?: string | null // ISO string, e.g. '2025-06-23T00:00:00'
  fechafin?: string | null
  inicioejercicio: boolean
  iniciomes: boolean
  finmes: boolean
  finejercicio: boolean
  timestamp?: string | null
  cfinbimestreimss: boolean
  ciniciobimestreimss: boolean
  fechaPago: string // siempre requerido
}
