import type { BancoConfiguracionEsquemaModel } from '@/interfaces/nomina/gape/BancoConfiguracionEsquemaModel'

export function getDefaultBancoConfiguracionEsquema(): BancoConfiguracionEsquemaModel {
  return {
    id: 0,
    id_nomina_gape_banco: undefined,
    id_nomina_gape_empresa: undefined,
    id_nomina_gape_cliente: undefined,
    id_nomina_gape_esquema: undefined,

    activo_dispersion: undefined,
    descripcion: undefined,
    azteca_cuenta_origen: undefined,
    banorte_cuenta_origen: undefined,
    banorte_clave_banco: undefined,
    esquema: undefined,
  }
}
