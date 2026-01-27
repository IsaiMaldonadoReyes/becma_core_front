import type { IncidenciaModel } from '@/interfaces/nomina/gape/IncidenciaModel'

export function getDefaultIncidencia(): IncidenciaModel {
  return {
    id: 0,
    fiscal: false,
    id_nomina_gape_empresa: undefined,
    id_nomina_gape_cliente: undefined,
    id_ejercicio: undefined,
    id_tipo_periodo: undefined,

    periodo_inicial: undefined,
    archivo: undefined,
    titulo_incidencia: undefined,
    descripcion_incidencia: undefined,
  }
}
