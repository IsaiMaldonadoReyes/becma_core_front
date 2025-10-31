import type { ConceptosPagoModel } from '@/interfaces/nomina/gape/ConceptosPagoModel'

export function getDefaultConceptosPago(): ConceptosPagoModel[] {
  return [
    { Codigo: 'sueldo_imss', concepto: 'Sueldo IMSS', tope: 0, Activo: false, Orden: 1 },
    { Codigo: 'prev_social', concepto: 'Prev. Soc.', tope: 0, Activo: false, Orden: 2 },
    { Codigo: 'fondos_sind', concepto: 'Fondos Sind.', tope: 0, Activo: false, Orden: 3 },
    { Codigo: 'tarjeta_facil', concepto: 'Tarjeta Fácil', tope: 0, Activo: false, Orden: 4 },
    { Codigo: 'hon_asimilados', concepto: 'Hon. Asimilados', tope: 0, Activo: false, Orden: 5 },
    {
      Codigo: 'gastos_compro',
      concepto: 'Gastos por comprobar',
      tope: 0,
      Activo: false,
      Orden: 6,
    },
  ]
}
