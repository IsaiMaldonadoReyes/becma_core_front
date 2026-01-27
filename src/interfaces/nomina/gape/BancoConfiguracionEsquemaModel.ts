export interface BancoConfiguracionEsquemaModel {
  id: number
  id_nomina_gape_banco?: number
  id_nomina_gape_empresa?: number
  id_nomina_gape_cliente?: number
  id_nomina_gape_esquema?: number
  activo_dispersion?: boolean
  descripcion?: string
  azteca_cuenta_origen?: string
  banorte_cuenta_origen?: string
  banorte_clave_banco?: string
  esquema?: string
}
