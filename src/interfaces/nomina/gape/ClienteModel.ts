export interface ClienteModel {
  id: number
  created_at?: string
  updated_at?: string
  estado?: boolean
  usuario_creador?: number
  usuario_modificador?: number
  nombre?: string
  codigo: string
  telefono?: string
}
