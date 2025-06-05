import type { SATCatSexoModel } from '@/interfaces/nomina/nomGenerales/SATCatSexo'

export function getDefaultSATCatSexo(): SATCatSexoModel[] {
  return [
    { Codigo: 'M', Descripcion: 'Masculino' },
    { Codigo: 'F', Descripcion: 'Femenino' },
    { Codigo: 'X', Descripcion: 'No binario' },
  ]
}
