<template>
  <v-dialog v-model="dialogPropiedades.dialog" :width="smAndDown ? '95vw' : '30vw'" persistent>
    <v-card>
      <v-form ref="formRef">
        <v-card-title
          class="position-fixed bg-surface-light dialog-header border-b-0 rounded-t"
          ref="dialogHeader"
        >
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
            <v-col cols="12" md="12">
              <bec-text-field
                v-model="dialogPropiedades.elementos.nombre"
                :label="'Clave de banco ID'"
                :placeholder="'Clave de banco ID'"
                :prepend-icon="'mdi-bank'"
                @keypress="inputFilters.onlyAlphanumeric"
              >
                <template #tooltip>
                  <v-card color="transparent" elevation="0" class="pa-3">
                    <v-row>
                      <v-col cols="1" class="d-flex align-center justify-center">
                        <v-icon class="mr-1" color="white" icon="mdi-bank" />
                      </v-col>
                      <v-col cols="11">
                        Capture la clave de banco ID correspondiente para generar el layout de
                        dispersión del Banco Azteca Interbancario.
                      </v-col>
                    </v-row>
                  </v-card>
                </template>
              </bec-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { ref, computed, defineComponent, mergeProps, onMounted, onUnmounted, watch } from 'vue'
import type { PropType } from 'vue'

//import interface
import type { ClienteModel } from '@/interfaces/nomina/gape/ClienteModel'

//import composable
import { useClienteModel } from '@/composables/nomina/gape/useCliente'
import { useDisplay } from 'vuetify'

// import stores
import { useClienteStore } from '@/stores/modules/Nomina/gape/Cliente'
import { useDialogManagerStore } from '@/stores/modules/Core/dialog'
import { validationRules } from '@/utils/validationRules'
import { inputFilters } from '@/utils/inputFilters'

// import components
import BecSelect from '@/components/core/becmaComponents/BecSelect.vue'
import BecAutocomplete from '@/components/core/becmaComponents/BecAutocomplete.vue'
import BecTextField from '@/components/core/becmaComponents/BecTextField.vue'

export default defineComponent({
  name: 'BancoAztecaInterbancarioModalForm',
  components: { BecSelect, BecAutocomplete, BecTextField },
  props: {
    dialogEvent: String,
    dialogItems: { type: Object as () => Partial<ClienteModel>, required: true },
    dialogTitle: String,
    dialogView: Boolean,
  },
  setup(props, { emit }) {
    // 3. Composables | Vuetify
    const { name, mobile, smAndDown } = useDisplay()

    // Estado reactivo
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
      //clienteStore.sincronizarEmpresas()

      //console.log(clienteStore.responseMessage)

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
      smAndDown,
      validationRules,
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
