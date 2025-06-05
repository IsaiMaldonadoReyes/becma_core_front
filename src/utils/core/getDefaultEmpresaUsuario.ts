import type { EmpresaUsuarioModel } from '@/interfaces/core/EmpresaUsuario'

export const getDefaultEmpresaUsuario = (): EmpresaUsuarioModel => ({
  id: 0,
  created_at: null,
  updated_at: null,
  estado: null,
  usuario_creador: null,
  usuario_modificador: null,
  id_empresa: null,
  nombre: null,
  apellido_paterno: null,
  apellido_materno: null,
  correo: null,
  password: null,
  imagen: null,
})
