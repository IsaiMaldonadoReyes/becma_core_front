import type { EmpresaModel } from '@/interfaces/nomina/gape/Empresa'

export function getDefaultEmpresa(): EmpresaModel {
  return {
    id: 0,
    created_at: undefined,
    updated_at: undefined,
    estado: false,
    usuario_creador: undefined,
    usuario_modificador: undefined,
    id_nomina_gape_cliente: undefined,
    cliente: '',
    id_empresa_database: undefined,
    empresa: '',
    fiscal: true,
    tipo: '',
    razon_social: '',
    rfc: '',
    codigo_interno: '',
    correo_notificacion: '',
  }
}
