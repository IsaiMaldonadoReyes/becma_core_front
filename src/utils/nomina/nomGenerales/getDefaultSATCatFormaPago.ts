import type { SATCatFormaPagoModel } from '@/interfaces/nomina/nomGenerales/SATCatFormaPago'

export function getDefaultSATCatFormaPago(): SATCatFormaPagoModel[] {
  return [
    { Codigo: '01', Descripcion: 'Efectivo' },
    { Codigo: '02', Descripcion: 'Cheques Nominativos' },
    { Codigo: '03', Descripcion: 'Transferencias' },
    { Codigo: '04', Descripcion: 'Tarjetas de crédito' },
    { Codigo: '05', Descripcion: 'Monederos electrónicos' },
    { Codigo: '06', Descripcion: 'Dinero electrónico' },
    { Codigo: '08', Descripcion: 'Vales de despensa' },
    { Codigo: '28', Descripcion: 'Tarjeta de débito' },
    { Codigo: '29', Descripcion: 'Tarjeta de servicios' },
    { Codigo: '99', Descripcion: 'Otros' },
    { Codigo: 'NA', Descripcion: 'No aplica' },
  ]
}
