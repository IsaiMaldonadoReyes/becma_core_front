export interface ConceptoPagoParametrizacionModel {
  id: number | null // bigint IDENTITY
  created_at?: string | Date | null
  updated_at?: string | Date | null

  fiscal: boolean

  estado?: boolean | null

  usuario_creador?: number | null
  usuario_modificador?: number | null

  id_nomina_gape_cliente?: number | null
  id_nomina_gape_empresa?: number | null

  id_tipo_periodo?: number | null
  tipo_periodo_nombre?: string | null

  sueldo_imss?: boolean | null
  sueldo_imss_tope?: number | null
  sueldo_imss_orden?: number | null

  prev_social?: boolean | null
  prev_social_tope?: number | null
  prev_social_orden?: number | null

  fondos_sind?: boolean | null
  fondos_sind_tope?: number | null
  fondos_sind_orden?: number | null

  tarjeta_facil?: boolean | null
  tarjeta_facil_tope?: number | null
  tarjeta_facil_orden?: number | null

  hon_asimilados?: boolean | null
  hon_asimilados_tope?: number | null
  hon_asimilados_orden?: number | null

  gastos_compro?: boolean | null
  gastos_compro_tope?: number | null
  gastos_compro_orden?: number | null

  cliente?: string | null
  empresa?: string | null
  tipo?: string | null
}
