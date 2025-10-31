import type { BaseFeeModel } from '@/interfaces/nomina/gape/BaseFeeModel'

export function getDefaultBaseFee(): BaseFeeModel[] {
  return [
    { codigo: '01', concepto: 'Percepciones Brutas' },
    { codigo: '02', concepto: 'Percepciones Brutas Mas Carga' },
    { codigo: '03', concepto: 'Neto' },
    { codigo: '04', concepto: 'Neto Mas Carga Social' },
    { codigo: '05', concepto: 'FEE Neto + Bruto + CS' },
  ]
}
