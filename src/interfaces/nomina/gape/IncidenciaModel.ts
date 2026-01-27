export interface IncidenciaModel {
  id: number
  fiscal: boolean
  id_nomina_gape_empresa?: number
  id_nomina_gape_cliente?: number
  id_ejercicio?: number
  id_tipo_periodo?: number
  periodo_inicial?: number
  archivo?: File | File[]
  id_esquema?: number[] | undefined
  titulo_incidencia?: string
  descripcion_incidencia?: string
}
