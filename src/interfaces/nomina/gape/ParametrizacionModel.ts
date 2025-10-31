export interface ParametrizacionModel {
  id: number | null // PK (IDENTITY)
  created_at?: string | Date | null
  updated_at?: string | Date | null

  estado?: boolean | null // bit NULL

  usuario_creador?: number | null
  usuario_modificador?: number | null

  id_nomina_gape_cliente?: number | null
  id_nomina_gape_empresa?: number | null

  id_tipo_periodo?: number | null
  tipo_periodo_nombre?: string | null

  clase_prima_riesgo?: string | null // nvarchar(255) NULL
  clase_prima_riesgo_valor?: number | null // float NULL

  fee?: number | null // float NULL
  base_fee?: string | null // nvarchar(255) NULL

  provisiones?: string | null // nvarchar(255) NULL
  isn?: number | null // float NULL

  cuota_sindical?: string | null // nvarchar(255) NULL
}
