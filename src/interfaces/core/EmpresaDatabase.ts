export interface EmpresaDatabaseModel {
  id: number
  created_at: string | null
  updated_at: string | null
  estado: boolean | null
  usuario_creador: number | null
  usuario_modificador: number | null
  id_conexion: number | null
  nombre_base: string | null
  nombre_empresa: string | null
}
