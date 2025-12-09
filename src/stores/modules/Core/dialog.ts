import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { DialogConfirmationData, DialogInformationData } from '@/interfaces/core/Dialog'

export const useDialogManagerStore = defineStore('dialogManager', () => {
  // ----------------------
  // STATE
  // ----------------------
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

  // Callback real almacenado
  const dialogCallback = ref<null | (() => any)>(null)

  // ----------------------
  // OPEN CONFIRMATION DIALOG
  // ----------------------
  const onOpenDialogConfirmation = (
    cuerpo: string,
    onConfirm: () => any, // soporta async también
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

  // ----------------------
  // CLOSE CONFIRMATION DIALOG
  // ----------------------
  const onCloseDialogConfirmation = () => {
    dialogConfirmation.value.dialog = false

    // Limpiar callback solo después de cerrar
    setTimeout(() => {
      dialogCallback.value = null
    }, 150)
  }

  // ----------------------
  // CONFIRM HANDLER (EJECUTA CALLBACK)
  // ----------------------
  const onConfirmDialog = async () => {
    try {
      if (dialogCallback.value) {
        await dialogCallback.value() // soporte async/await ✔
      }
    } finally {
      onCloseDialogConfirmation() // cierre seguro del modal
    }
  }

  // ----------------------
  // INFORMATION DIALOG
  // ----------------------
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

  // ----------------------
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
