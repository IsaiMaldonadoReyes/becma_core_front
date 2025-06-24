/**
 * Genera una CURP parcial a partir de los apellidos y nombre.
 * @param paterno - Apellido paterno.
 * @param materno - Apellido materno.
 * @param nombre - Nombre(s).
 * @returns CURP parcial.
 */
export function generarCurpParcial(paterno: string, materno: string, nombre: string): string {
  const clean = (s: string) =>
    s
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^A-Z]/g, '')

  const pa = clean(paterno)
  const ma = clean(materno)
  const no = clean(nombre)

  const primeraLetraP = pa.charAt(0)
  const primeraVocalInternaP = pa.slice(1).match(/[AEIOU]/)?.[0] || 'X'
  const primeraLetraM = ma.charAt(0) || 'X'
  const primeraLetraN =
    no
      .split(' ')
      .filter((n) => n !== 'JOSE' && n !== 'MARIA')[0]
      ?.charAt(0) ||
    no.charAt(0) ||
    'X'

  return (primeraLetraP + primeraVocalInternaP + primeraLetraM + primeraLetraN).toUpperCase()
}

export function generarCurpExtendida({
  nombre,
  apellidopaterno,
  apellidomaterno,
  fechanacimiento,
  sexo,
  entidadnacimiento,
}: {
  nombre?: string
  apellidopaterno?: string
  apellidomaterno?: string
  fechanacimiento?: string // formato: yyyy-mm-dd
  sexo?: string // 'H' o 'M'
  entidadnacimiento?: string
}): string {
  const clean = (s: string) =>
    s
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^A-Z]/g, '')

  const pa = clean(apellidopaterno || '')
  const ma = clean(apellidomaterno || '')
  const no = clean(nombre || '')

  const primeraLetraP = pa.charAt(0) || 'X'
  const primeraVocalInternaP = pa.slice(1).match(/[AEIOU]/)?.[0] || 'X'
  const primeraLetraM = ma.charAt(0) || 'X'
  const primeraLetraN =
    no
      .split(' ')
      .filter((n) => n !== 'JOSE' && n !== 'MARIA')[0]
      ?.charAt(0) ||
    no.charAt(0) ||
    'X'

  let curp = primeraLetraP + primeraVocalInternaP + primeraLetraM + primeraLetraN

  if (fechanacimiento) {
    const [y, m, d] = fechanacimiento.split('-')
    curp += y.slice(2) + m + d
  }

  if (sexo) {
    curp += sexo.toUpperCase()
  }

  if (entidadnacimiento) {
    curp += entidadnacimiento || 'NE'
  }

  return curp
}
