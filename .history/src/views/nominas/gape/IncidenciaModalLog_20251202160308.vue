<template>
  <v-dialog v-model="dialogPropiedades.dialog" :width="smAndDown ? '95vw' : '90vw'" persistent>
    <v-card>
      <v-form ref="formRef">
        <v-card-title
          class="position-fixed bg-surface-light dialog-header border-b-0 rounded-t"
          ref="dialogHeader"
        >
          <v-row>
            <v-col cols="12" md="6" class="d-flex align-center">
              <v-icon color="primary" icon="mdi-account-box" />
              <v-divider
                class="ml-3 mr-2 align-self-center border-opacity-25"
                length="20"
                thickness="2"
                vertical
              />
              {{ dialogPropiedades.titulo }}
            </v-col>
            <v-col cols="12" md="6" class="d-flex align-center justify-end">
              <v-btn-group variant="outlined" divided>
                <v-btn color="primary" icon="mdi-format-align-right">
                  <v-tooltip>
                    <template v-slot:activator="{ props: tooltip }">
                      <v-checkbox-btn
                        v-model="dialogPropiedades.elementos.estado"
                        v-bind="mergeProps(tooltip)"
                        color="primary"
                      />
                    </template>
                    <span>Marque la casilla para activar este registro.</span>
                  </v-tooltip>
                </v-btn>
                <v-tooltip>
                  <template v-slot:activator="{ props: tooltip }">
                    <v-btn
                      v-bind="mergeProps(tooltip)"
                      color="primary"
                      icon="mdi-floppy"
                      :loading="loading"
                      @click="onDecision"
                    />
                  </template>
                  <span>Clic aquí para guardar</span>
                </v-tooltip>

                <v-tooltip>
                  <template v-slot:activator="{ props: tooltip }">
                    <v-btn
                      v-bind="mergeProps(tooltip)"
                      color="primary"
                      icon="mdi-close"
                      @click="onClose"
                    />
                  </template>
                  <span>Clic aquí para salir</span>
                </v-tooltip>
              </v-btn-group>
            </v-col>
          </v-row>
        </v-card-title>

        <v-card-text class="dialog-content px-5" :style="getDialogContentPaddingTop">
          <v-row>
            <v-col>
              <v-data-iterator :items="itemsLog" items-per-page="-1">
                <template v-slot:default="{ items }">
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-card
                        class="rounded d-flex justify-center align-center my-2 mx-4 pa-2"
                        color="#f0f0f0"
                        elevation="5"
                        min-height="60px"
                      >
                        <v-row class="pa-2">
                          <v-col cols="9">
                            <v-row>
                              <v-divider></v-divider>

                              <v-col
                                class="d-flex align-center"
                                cols="1"
                                style="color: #722b81; font-size: 14px; font-weight: bold"
                              >
                                <v-icon color="#078929" icon="mdi-alert"></v-icon>
                              </v-col>
                              <v-col cols="3" class="d-flex align-center justify-end">
                                <span style="font-weight: bold; color: #078929"
                                  >Fila 16: Error</span
                                >
                              </v-col>
                            </v-row>
                            <v-row></v-row>
                          </v-col>
                          <v-col cols="3" class="d-flex align-center justify-end">
                            <!-- vbtnEliminar -->
                            <v-divider vertical class="mr-3 my-2 border-opacity-25" />
                            <v-tooltip bottom color="primary" interactive>
                              <template v-slot:activator="{ props: tooltipProps }">
                                <v-btn
                                  v-bind="mergeProps(tooltipProps)"
                                  color="#722B81"
                                  flat
                                  height="40px"
                                  min-width="40px"
                                  width="40px"
                                >
                                  <v-icon color="white" icon="mdi-delete" size="24px" />
                                </v-btn>
                              </template>
                              <span>Quitar recibo</span>
                            </v-tooltip>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>
              </v-data-iterator>
            </v-col>
          </v-row>
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { ref, computed, defineComponent, mergeProps, onMounted, onUnmounted, watch } from 'vue'
import { useDisplay } from 'vuetify'

// import components
import { BecSelect, BecAutocomplete, BecTextField } from '@/components/core/becmaComponents'

//import composable
import { useClienteModel } from '@/composables/nomina/gape'

// import interface
import type { ClienteModel } from '@/interfaces/nomina/gape'

// import stores
import { useClienteStore } from '@/stores/modules/Nomina/gape'

import { useDialogManagerStore } from '@/stores/modules/Core/dialog'

// utils
import { validationRules } from '@/utils/validationRules'
import { inputFilters } from '@/utils/inputFilters'

export default defineComponent({
  name: 'IncidenciaModalLog',
  components: { BecSelect, BecAutocomplete, BecTextField },
  props: {
    dialogEvent: String,
    dialogItems: {
      type: Object as () => Partial<ClienteModel>,
      required: true,
    },
    dialogTitle: String,
    dialogView: Boolean,
  },
  setup(props, { emit }) {
    const itemsLog = [
      {
        estatus: 'Error',
        fila: 16,
        descipcion: 'RFC inválido no contiene los 8 caracteres.',
      },
    ]

    // Estado reactivo

    // 3. Composables | Vuetify
    const { name, mobile, smAndDown } = useDisplay()

    const { dataModel, setCliente, resetModel } = useClienteModel()

    const clienteStore = useClienteStore()
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
        mensaje = `¿Está seguro de que desea registrar el nuevo cliente "${dialogPropiedades.value.elementos.nombre}" (Código: ${dialogPropiedades.value.elementos.codigo})? Esta acción no se puede deshacer.`
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

          setCliente({
            ...dialogPropiedades.value.elementos,
            estado: dialogPropiedades.value.elementos.estado ? true : false,
          })

          if (dialogPropiedades.value.elementos.id) {
            await clienteStore.updateCliente(dataModel.value, dialogPropiedades.value.elementos.id)
          } else {
            await clienteStore.storeCliente(dataModel.value)
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
            const errores = Object.values(error.errors).flat().join('<br>')
            dialogConfirmation.onOpenDialogInformation(
              errores,
              'Verifique los siguientes errores',
              'incorrect',
              '#B00000',
              2,
            )
          } else {
            dialogConfirmation.onOpenDialogInformation(
              'Ocurrió un error inesperado al guardar.',
              'Error',
              'incorrect',
              '#B00000',
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
        headerHeight.value = dialogHeader.value.$el.clientHeight + 30
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
      inputFilters,
      loading,
      mergeProps,
      onClose,
      onDecision,
      validationRules,
      smAndDown,
      itemsLog,
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
