import type { ConceptoPagoParametrizacionModel } from '@/interfaces/nomina/gape/ConceptoPagoParametrizacionModel'

export function getDefaultConceptoPagoParametrizacion(): ConceptoPagoParametrizacionModel {
  return {
    id: 0,
    created_at: undefined,
    updated_at: undefined,

    estado: false,
    fiscal: false,

    usuario_creador: undefined,
    usuario_modificador: undefined,

    id_nomina_gape_cliente: undefined,
    id_nomina_gape_empresa: undefined,
    id_tipo_periodo: undefined,
    tipo_periodo_nombre: undefined,

    sueldo_imss: false,
    sueldo_imss_tope: undefined,
    sueldo_imss_orden: undefined,

    prev_social: false,
    prev_social_tope: undefined,
    prev_social_orden: undefined,

    fondos_sind: false,
    fondos_sind_tope: undefined,
    fondos_sind_orden: undefined,

    tarjeta_facil: false,
    tarjeta_facil_tope: undefined,
    tarjeta_facil_orden: undefined,

    hon_asimilados: false,
    hon_asimilados_tope: undefined,
    hon_asimilados_orden: undefined,

    gastos_compro: false,
    gastos_compro_tope: undefined,
    gastos_compro_orden: undefined,

    cliente: undefined,
    empresa: undefined,
    tipo: undefined,
  }
}
