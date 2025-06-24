export interface DialogConfirmationData {
  dialog: boolean
  cuerpo: string
  titulo: string
  icono: string
  items: any[]
  callback?: () => void
}

export interface DialogInformationData {
  dialog: boolean
  cuerpo: string
  titulo: string
  icono: string
  velocidad: number
  color: string
}
