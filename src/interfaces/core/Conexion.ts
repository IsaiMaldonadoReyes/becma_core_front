export interface ConexionModel {
  id: number
  created_at: string | null
  updated_at: string | null
  estado: boolean | null
  id_empresa: number | null
  id_sistema: number | null
  usuario_creador: number | null
  usuario_modificador: number | null
  fecha_inicio_licencia: string | null
  fecha_fin_licencia: string | null
  usuario: string | null
  password: string | null
  ip: string | null
  puerto: string | null
  host: string | null
}
