import type { RegistroPatronalModel } from '@/interfaces/nomina/default/nom10035'

export function getDefaultRegistroPatronal(): RegistroPatronalModel {
  return {
    cidregistropatronal: 0,
    crfc: undefined,
    cfechaconstitucion: undefined,
    chomoclave: undefined,
    ctimestamp: undefined,
    crfccompleto: undefined,
    cregistroimss: undefined,
    GUIDFirmaDSL: undefined,
    ClaseRiesgoTrabajo: undefined,
    FraccionRiesgoTrabajo: undefined,
    LocalidadRegPatronal: undefined,
    CodigoPostal: '',
    EntidadFederativa: '',
  }
}
