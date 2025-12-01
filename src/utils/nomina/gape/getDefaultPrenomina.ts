import type { PrenominaModel } from '@/interfaces/nomina/gape/PrenominaModel'

export function getDefaultPrenomina(): PrenominaModel {
  return {
    id: 0,
    fiscal: false,
    id_nomina_gape_empresa: undefined,
    id_nomina_gape_cliente: undefined,
    id_ejercicio: undefined,
    id_tipo_periodo: undefined,

    periodo_inicial: undefined,
    periodo_final: undefined,
    departamento_inicial: undefined,
    departamento_final: undefined,

    empleado_inicial: undefined,
    empleado_final: undefined,
  }
}
