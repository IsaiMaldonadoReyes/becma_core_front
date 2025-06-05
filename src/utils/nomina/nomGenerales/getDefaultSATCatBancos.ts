// utils/nomGenerales/getDefaultSATCatBancos.ts
import type { SATCatBancosModel } from '@/interfaces/nomina/nomGenerales/SATCatBancos'

export function getDefaultSATCatBancos(): SATCatBancosModel {
  return {
    ClaveBanco: '',
    Descripcion: '',
    RazonSocial: '',
  }
}
