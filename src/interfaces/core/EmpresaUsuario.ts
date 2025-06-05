export interface EmpresaUsuarioModel {
  id: number
  created_at: string | null
  updated_at: string | null
  estado: boolean | null
  usuario_creador: number | null
  usuario_modificador: number | null
  id_empresa: number | null
  nombre: string | null
  apellido_paterno: string | null
  apellido_materno: string | null
  correo: string | null
  password: string | null
  imagen: string | null
}
