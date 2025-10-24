export interface BancoAztecaModel {
  id: number
  estado?: boolean | null
  id_nomina_gape_empresa: number | null
  activo_dispersion: boolean | null
  cuenta_origen: string | null
  tipo_banco: 'bancario' | 'interbancario' | null
}
