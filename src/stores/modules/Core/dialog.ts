import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { DialogConfirmationData, DialogInformationData } from '@/interfaces/core/Dialog'

export const useDialogManagerStore = defineStore('dialogManager', () => {
  const dialogConfirmation = ref<DialogConfirmationData>({
    dialog: false,
    cuerpo: '',
    titulo: '',
    icono: 'mdi-help-circle',
    items: [],
    callback: undefined,
  })

  const dialogInformation = ref<DialogInformationData>({
    dialog: false,
    cuerpo: '',
    titulo: '',
    icono: 'mdi-check-circle',
    velocidad: 0,
    color: 'info',
  })

  const dialogCallback = ref<(() => void) | null>(null)

  const onOpenDialogConfirmation = (
    cuerpo: string,
    onConfirm: () => void,
    items: any[] = [],
    titulo = 'Confirmación',
    icono = 'mdi-help-circle',
  ) => {
    dialogCallback.value = onConfirm
    dialogConfirmation.value = {
      dialog: true,
      cuerpo,
      titulo,
      icono,
      items,
      callback: onConfirm,
    }
  }

  const onCloseDialogConfirmation = () => {
    dialogCallback.value = null
    dialogConfirmation.value.dialog = false
  }

  const onConfirmDialog = () => {
    dialogCallback.value?.()
    onCloseDialogConfirmation()
  }

  const onOpenDialogInformation = (
    cuerpo: string,
    titulo = 'Información',
    icono = 'mdi-check-circle',
    color = 'info',
    velocidad = 0,
  ) => {
    dialogInformation.value = {
      dialog: true,
      cuerpo,
      titulo,
      icono,
      velocidad,
      color,
    }
  }

  const onCloseDialogInformation = () => {
    dialogInformation.value.dialog = false
  }

  return {
    dialogConfirmation,
    dialogInformation,
    onOpenDialogConfirmation,
    onCloseDialogConfirmation,
    onConfirmDialog,
    onOpenDialogInformation,
    onCloseDialogInformation,
  }
})
