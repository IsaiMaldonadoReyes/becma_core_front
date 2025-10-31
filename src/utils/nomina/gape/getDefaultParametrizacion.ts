import type { ParametrizacionModel } from '@/interfaces/nomina/gape/ParametrizacionModel'

export function getDefaultParametrizacion(): ParametrizacionModel {
  return {
    id: 0,
    created_at: undefined,
    updated_at: undefined,

    estado: false,

    usuario_creador: undefined,
    usuario_modificador: undefined,

    id_nomina_gape_cliente: undefined,
    id_nomina_gape_empresa: undefined,
    id_tipo_periodo: undefined,
    tipo_periodo_nombre: undefined,

    clase_prima_riesgo: undefined,
    clase_prima_riesgo_valor: undefined,
    fee: undefined,
    base_fee: undefined,

    provisiones: undefined,
    isn: undefined,
    cuota_sindical: undefined,
  }
}
