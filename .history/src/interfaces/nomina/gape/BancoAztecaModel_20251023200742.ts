export interface BancoAztecaModel {
  id: number
  created_at?: string | null
  updated_at?: string | null
  estado?: boolean | null
  usuario_creador?: number | null
  usuario_modificador?: number | null
  id_nomina_gape_empresa: number | null
  activo_dispersion: boolean | null
  cuenta_origen: string | null
  tipo_banco: 'bancario' | 'interbancario' | null
}
