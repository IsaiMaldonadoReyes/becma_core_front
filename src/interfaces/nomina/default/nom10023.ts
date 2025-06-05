export interface TipoPeriodoModel {
  idtipoperiodo: number
  nombretipoperiodo?: string
  diasdelperiodo?: number
  diasdepago?: number
  periodotrabajo?: number
  modificarhistoria: boolean
  ajustarperiodoscalendario: boolean
  numeroseptimos?: number
  posicionseptimos?: string
  posicionpagonomina?: number
  fechainicioejercicio?: Date
  ejercicio?: number
  timestamp?: Date
  ccalculomescalendario?: number
  PeriodicidadPago: string
}
