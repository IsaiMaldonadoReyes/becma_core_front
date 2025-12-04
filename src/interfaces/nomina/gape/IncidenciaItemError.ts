export interface ErrorDetalle {
  tipo: string
  celdas: string
}

export interface ItemError {
  agrupador: string
  errores: ErrorDetalle[]
}
