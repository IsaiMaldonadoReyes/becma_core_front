<template>
  <v-dialog v-model="dialogPropiedades.dialog" width="auto" persistent>
    <v-card>
      <v-form ref="form" v-model="isValid">
        <v-card-title class="position-fixed bg-surface-light dialog-header" ref="dialogHeader">
          <v-row>
            <v-col cols="12" md="6" class="d-flex align-center">
              <v-icon color="primary" icon="mdi-laptop" />
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
                        true-icon="mdi-checkbox-marked-outline"
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
                      :disabled="isSavingBtn"
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
            <v-col cols="12" md="6">
              <v-text-field
                v-model="dialogPropiedades.elementos.nombre"
                :rules="[rules.required]"
                clearable
                label="Nombre *"
                placeholder="Nombre del sistema"
                prepend-inner-icon="mdi-laptop"
                variant="outlined"
              >
                <template v-slot:prepend>
                  <v-tooltip>
                    <template v-slot:activator="{ props: tooltip }">
                      <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                    </template>
                    <span>Mensaje de ayuda o informativo del campo.</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="dialogPropiedades.elementos.codigo"
                :rules="[rules.required]"
                clearable
                label="Código *"
                placeholder="Código del sistema"
                prepend-inner-icon="mdi-barcode"
                variant="outlined"
              >
                <template v-slot:prepend>
                  <v-tooltip>
                    <template v-slot:activator="{ props: tooltip }">
                      <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                    </template>
                    <span>Mensaje de ayuda o informativo del campo.</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-textarea
                v-model="dialogPropiedades.elementos.descripcion"
                :rules="[rules.required]"
                auto-grow
                clearable
                label="Descripción *"
                placeholder="Descripción del sistema"
                prepend-inner-icon="mdi-text"
                rows="1"
                variant="outlined"
              >
                <template v-slot:prepend>
                  <v-tooltip>
                    <template v-slot:activator="{ props: tooltip }">
                      <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                    </template>
                    <span>Mensaje de ayuda o informativo del campo.</span>
                  </v-tooltip>
                </template>
              </v-textarea>
            </v-col>
            <v-col cols="12" md="6"> </v-col>
          </v-row>
        </v-card-text>
      </v-form>
    </v-card>
    <dialog-confirmation
      :dialog-content="dialogConfirmation.cuerpo"
      :dialog-event="dialogConfirmation.evento"
      :dialog-icon="dialogConfirmation.icono"
      :dialog-items="dialogConfirmation.items"
      :dialog-title="dialogConfirmation.titulo"
      :dialog-view="dialogConfirmation.dialog"
      @clickNo="onCloseDialogConfirmation"
      @clickYes="onClickYesDialogConfirmation"
    />
    <dialog-information
      :dialog-color="dialogInformation.color"
      :dialog-content="dialogInformation.cuerpo"
      :dialog-icon="dialogInformation.icono"
      :dialog-speed-icon="dialogInformation.velocidad"
      :dialog-title="dialogInformation.titulo"
      :dialog-view="dialogInformation.dialog"
      @close="onCloseDialogInformation"
    />
  </v-dialog>
</template>
<script lang="ts">
import { ref, computed, defineComponent, mergeProps, onMounted, onUnmounted, watch } from 'vue'
import { sistemaStore } from '../../../stores/modules/Core/sistema'
import DialogConfirmation from '../../../components/core/dialogMessage/DialogConfirmation.vue'
import DialogInformation from '../../../components/core/dialogMessage/DialogInformation.vue'

export interface Item {
  id: number
  codigo: string
  descripcion: string
  nombre: string
  estado: boolean
}

export default defineComponent({
  name: 'DialogSistema',
  components: { DialogConfirmation, DialogInformation },
  props: {
    dialogEvent: String,
    dialogItems: {
      type: Object as () => Partial<Item>,
      required: true,
    },
    dialogTitle: String,
    dialogView: Boolean,
  },
  setup(props, { emit }) {
    // Estado reactivo

    const sistema = sistemaStore()

    const rules = {
      required: (v: string) => !!v || 'Este dato es requerido para continuar.',
    }

    const form = ref()
    const isValid = ref(false)
    const isSavingBtn = ref(false)
    const nombreEvento = ref<string>('')

    type Eventos = 'onSaveEdit' | 'onEdit' | 'onSave'

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

    // DialogConfirmation
    const dialogConfirmation = ref({
      cuerpo: '',
      dialog: false,
      evento: '',
      icono: '',
      items: {},
      titulo: '',
    })

    const onOpenDialogConfirmation = (
      cuerpo: string,
      evento: string,
      items: object,
      titulo: string,
    ) => {
      dialogConfirmation.value = {
        cuerpo: cuerpo,
        dialog: true,
        evento: evento,
        icono: 'alert',
        items: items,
        titulo: titulo,
      }
    }

    const onClickYesDialogConfirmation = (evento: Eventos, items: object) => {
      methods[evento](items)
    }

    const onCloseDialogConfirmation = () => {
      dialogConfirmation.value.dialog = false
    }

    // DialogInformation
    const dialogInformation = ref({
      color: '',
      cuerpo: '',
      dialog: false,
      icono: '',
      titulo: '',
      velocidad: 0,
    })

    const onOpenDialogInformation = (
      color: string,
      cuerpo: string,
      icono: string,
      titulo: string,
      velocidad: number,
    ) => {
      dialogInformation.value = {
        color: color,
        cuerpo: cuerpo,
        dialog: true,
        icono: icono,
        titulo: titulo,
        velocidad: velocidad,
      }
    }

    const onCloseDialogInformation = () => {
      dialogInformation.value.dialog = false
      emit('save', nombreEvento.value)
    }

    const methods: Record<Eventos, (...args: any[]) => void> = {
      onSave: () => {},
      onEdit: () => {},
      onSaveEdit: async () => {
        dialogConfirmation.value.dialog = false

        const isValidForm = await form.value?.validate()

        if (isValidForm.valid) {
          isSavingBtn.value = true

          const data = {
            estado: dialogPropiedades.value.elementos.estado ? 1 : 0,
            nombre: dialogPropiedades.value.elementos.nombre,
            codigo: dialogPropiedades.value.elementos.codigo,
            descripcion: dialogPropiedades.value.elementos.descripcion,
          }

          try {
            if (dialogPropiedades.value.elementos.id) {
              await sistema.updateSistema(data, dialogPropiedades.value.elementos.id)
            } else {
              await sistema.storeSistema(data)
            }
            await form.value?.reset()

            onOpenDialogInformation(
              '#438701',
              sistema.object.message,
              'correct',
              'Registro guardado',
              1,
            )
          } catch (error) {
            onOpenDialogInformation(
              '#438701',
              sistema.responseMessage,
              'incorrect',
              'Ocurrió un error en el registro guardado',
              1,
            )
          } finally {
            isSavingBtn.value = false
          }
        }
      },
    }

    // Metodos
    const onCancel = () => {
      emit('cancel')
    }

    const onClose = () => {
      emit('close')
    }

    function onDecision() {
      let mensaje = ''
      let titulo = ''
      let evento = 'onSaveEdit'

      if (dialogPropiedades.value.elementos.id) {
        titulo = 'Actualización de datos'
        mensaje = `¿Está seguro de que desea actualizar el registro "${dialogPropiedades.value.elementos.nombre}" (Código: ${dialogPropiedades.value.elementos.codigo})? Los cambios realizados serán guardados de forma permanente.`
      } else {
        titulo = 'Registro de datos'
        mensaje = `¿Está seguro de que desea registrar el nuevo sistema "${dialogPropiedades.value.elementos.nombre}" (Código: ${dialogPropiedades.value.elementos.codigo})? Esta acción no se puede deshacer.`
      }

      onOpenDialogConfirmation(mensaje, evento, [], titulo)
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
      dialogInformation,
      dialogHeader,
      dialogPropiedades,
      form,
      getDialogContentPaddingTop,
      isValid,
      mergeProps,
      onCancel,
      onClose,
      onDecision,
      onCloseDialogConfirmation,
      onClickYesDialogConfirmation,
      onCloseDialogInformation,
      rules,
      isSavingBtn,
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
