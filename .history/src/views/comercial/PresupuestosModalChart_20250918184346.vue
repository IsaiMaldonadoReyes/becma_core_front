<template>
  <v-dialog v-model="dialogPropiedades.dialog" width="40%" height="auto" persistent>
    hola
  </v-dialog>
</template>
<script lang="ts">
import { ref, computed, defineComponent, mergeProps, onMounted, onUnmounted, watch } from 'vue'

import { useDisplay } from 'vuetify'

//import interface
import type { SistemaModel } from '@/interfaces/core/Sistema'

//import composable
import { useSistemaModel } from '@/composables/core/useSistema'

// import stores
import { useSistemaStore } from '@/stores/modules/Core/sistema'
import { useDialogManagerStore } from '@/stores/modules/Core/dialog'
import { validationRules } from '@/utils/validationRules'

// import components
import BecSelect from '@/components/core/becmaComponents/BecSelect.vue'
import BecAutocomplete from '@/components/core/becmaComponents/BecAutocomplete.vue'
import BecTextField from '@/components/core/becmaComponents/BecTextField.vue'
import BecTextArea from '@/components/core/becmaComponents/BecTextArea.vue'

export default defineComponent({
  name: 'PresupuestosModalChart',
  components: { BecSelect, BecAutocomplete, BecTextField, BecTextArea },
  props: {
    dialogEvent: String,
    dialogItems: {
      type: Object as () => Partial<SistemaModel>,
      required: true,
    },
    dialogTitle: String,
    dialogView: Boolean,
  },
  setup(props, { emit }) {
    // Estado reactivo

    const { dataModel, setSistema, resetModel } = useSistemaModel()

    const sistemaStore = useSistemaStore()
    const dialogConfirmation = useDialogManagerStore()

    const formRef = ref()
    const loading = ref(false)
    const nombreEvento = ref<string>('')

    const dialogPropiedades = ref({
      dialog: ref(props.dialogView),
      elementos: {
        ...props.dialogItems,
        estado:
          props.dialogItems.estado !== undefined ? Number(props.dialogItems.estado) === 1 : false,
      },
      evento: ref(props.dialogEvent),
      titulo: ref(props.dialogTitle),
    })

    const { name, mobile, smAndDown } = useDisplay()

    // Metodos

    const onClose = () => {
      emit('close')
    }

    const onDecision = () => {
      let mensaje = ''
      let titulo = ''

      if (dialogPropiedades.value.elementos.id) {
        titulo = 'Actualización de datos'
        mensaje = `¿Está seguro de que desea actualizar el registro "${dialogPropiedades.value.elementos.nombre}" (Código: ${dialogPropiedades.value.elementos.codigo})? Los cambios realizados serán guardados de forma permanente.`
      } else {
        titulo = 'Registro de datos'
        mensaje = `¿Está seguro de que desea registrar el nuevo sistema "${dialogPropiedades.value.elementos.nombre}" (Código: ${dialogPropiedades.value.elementos.codigo})? Esta acción no se puede deshacer.`
      }

      dialogConfirmation.onOpenDialogConfirmation(
        mensaje,
        validateForm, // << callback directo
        [],
        titulo,
        'alert',
      )
    }

    const validateForm = async () => {
      dialogConfirmation.onCloseDialogConfirmation()

      const form = await formRef.value?.validate()

      if (!form) return

      if (form.valid) {
        try {
          loading.value = true

          setSistema({
            ...dialogPropiedades.value.elementos,
            estado: dialogPropiedades.value.elementos.estado ? true : false,
          })

          if (dialogPropiedades.value.elementos.id) {
            await sistemaStore.updateSistema(dataModel.value, dialogPropiedades.value.elementos.id)
          } else {
            await sistemaStore.storeSistema(dataModel.value)
          }

          await form.value?.reset()

          dialogConfirmation.onOpenDialogInformation(
            'Los datos se guardaron de forma exitosa.',
            'Registro guardado',
            'correct',
            '#438701',
            2,
          )

          onClose()

          // Snackbar o confirmación aquí
        } catch (error: any) {
          if (error.type === 'validation') {
            const errores = Object.values(error.errors).flat().join('\n')
            dialogConfirmation.onOpenDialogInformation(
              errores,
              'Error de validación',
              'warning',
              '#FFA500',
              2,
            )
          } else {
            dialogConfirmation.onOpenDialogInformation(
              'Ocurrió un error inesperado al guardar.',
              'Error',
              'incorrect',
              '#FF0000',
              2,
            )
          }
        } finally {
          loading.value = false
        }
      }
    }

    watch(
      () => props.dialogView,
      (newDialogView) => {
        dialogPropiedades.value = {
          dialog: newDialogView,
          elementos: {
            ...props.dialogItems,
            estado:
              props.dialogItems.estado !== undefined
                ? Number(props.dialogItems.estado) === 1
                : false,
          },
          evento: props.dialogEvent,
          titulo: props.dialogTitle,
        }
        nombreEvento.value = props.dialogEvent ?? ''
      },
    )

    // Header
    const dialogHeader = ref()
    const headerHeight = ref(0)

    const calcularDimensiones = () => {
      if (dialogHeader.value) {
        headerHeight.value = dialogHeader.value.$el.clientHeight + 20
      }
    }

    onMounted(() => {
      window.addEventListener('resize', calcularDimensiones)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', calcularDimensiones)
    })

    const getDialogContentPaddingTop = computed(() => {
      if (dialogHeader.value) {
        calcularDimensiones()
      }

      return { paddingTop: `${headerHeight.value}px !important` }
    })

    return {
      dialogConfirmation,
      dialogHeader,
      dialogPropiedades,
      formRef,
      getDialogContentPaddingTop,
      mergeProps,
      onDecision,
      validationRules,
      loading,
      onClose,
      smAndDown,
    }
  },
})
</script>

<style scoped>
.dialog-header {
  border-bottom: 1px solid #ddd;
  left: 0;
  padding: 16px;
  right: 0;
  top: 0;
  z-index: 1;
}

.dialog-content {
  overflow-y: auto;
}
</style>
