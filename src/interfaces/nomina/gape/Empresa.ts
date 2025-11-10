export interface EmpresaModel {
  id: number
  created_at?: Date
  updated_at?: Date
  estado: boolean
  usuario_creador?: number | null
  usuario_modificador?: number | null
  id_nomina_gape_cliente?: number | null
  cliente?: string
  id_empresa_database?: number | null
  empresa?: string
  fiscal: boolean
  tipo: string
  razon_social: string | null
  rfc: string | null
  codigo_interno: string | null
  correo_notificacion: string | null
  mascara_codigo: string
  codigo_inicial: string
  codigo_actual: string
}
