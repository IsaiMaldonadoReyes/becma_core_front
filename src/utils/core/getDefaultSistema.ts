import type { SistemaModel } from '@/interfaces/core/Sistema'

export const getDefaultSistema = (): SistemaModel => ({
  id: 0,
  created_at: null,
  updated_at: null,
  estado: false,
  nombre: '',
  codigo: '',
  descripcion: '',
  database_maestra: '',
})
