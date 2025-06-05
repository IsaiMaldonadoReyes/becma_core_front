import type { ConexionModel } from '@/interfaces/core/Conexion'

export const getDefaultConexion = (): ConexionModel => ({
  id: 0,
  created_at: null,
  updated_at: null,
  estado: null,
  id_empresa: null,
  id_sistema: null,
  usuario_creador: null,
  usuario_modificador: null,
  fecha_inicio_licencia: null,
  fecha_fin_licencia: null,
  usuario: null,
  password: null,
  ip: null,
  puerto: null,
  host: null,
})
