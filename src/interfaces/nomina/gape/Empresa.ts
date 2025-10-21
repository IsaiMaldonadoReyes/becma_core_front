export interface EmpresaModel {
  id: number
  created_at?: Date
  updated_at?: Date
  estado: boolean
  usuario_creador?: number | null
  usuario_modificador?: number | null
  id_nomina_gape_cliente?: number | null
  id_empresa_database?: number | null
  fiscal: boolean | null
  razon_social: string | null
  rfc: string | null
  codigo_interno: string | null
  correo_notificacion: string | null
}
