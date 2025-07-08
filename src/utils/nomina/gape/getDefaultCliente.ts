import type { ClienteModel } from '@/interfaces/nomina/gape/ClienteModel'

export function getDefaultCliente(): ClienteModel {
  return {
    id: 0,
    created_at: '',
    updated_at: '',
    estado: false,
    usuario_creador: undefined,
    usuario_modificador: undefined,
    nombre: '',
    codigo: '',
    telefono: '',
  }
}
