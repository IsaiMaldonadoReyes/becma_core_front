import type { EmpresaDatabaseModel } from '@/interfaces/core/EmpresaDatabase'

export const getDefaultEmpresaDatabase = (): EmpresaDatabaseModel => ({
  id: 0,
  created_at: null,
  updated_at: null,
  estado: null,
  usuario_creador: null,
  usuario_modificador: null,
  id_conexion: null,
  nombre_base: null,
  nombre_empresa: null,
})
