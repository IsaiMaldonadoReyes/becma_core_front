export interface SistemaModel {
  id: number
  created_at: string | null
  updated_at: string | null
  estado: boolean
  nombre: string
  codigo: string
  descripcion: string
  database_maestra: string
}
