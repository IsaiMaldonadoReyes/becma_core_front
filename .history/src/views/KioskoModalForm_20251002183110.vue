<template>
  <v-dialog v-model="dialogPropiedades.dialog" width="auto" height="auto" persistent>
    <v-card class="rounded-lg">
      <v-form ref="formRef">
        <v-card-title
          ref="dialogHeader"
          class="position-fixed bg-surface-light dialog-header border-b-0 rounded-lg"
        >
          <v-row>
            <v-col cols="10" md="6" class="d-flex align-center">
              <v-icon color="#722B81" icon="mdi-invoice-text" />
              <v-divider
                class="ml-3 mr-2 align-self-center border-opacity-25"
                length="20"
                thickness="2"
                vertical
              />
              {{ dialogPropiedades.titulo }}
            </v-col>
            <v-col cols="2" md="6" class="d-flex align-center justify-end">
              <v-btn-group variant="outlined" divided>
                <v-tooltip>
                  <template v-slot:activator="{ props: tooltip }">
                    <v-btn
                      v-bind="mergeProps(tooltip)"
                      color="#722B81"
                      icon="mdi-close"
                      @click="onClose"
                    />
                  </template>
                  <span>Clic aquí para cerrar ventana emergente</span>
                </v-tooltip>
              </v-btn-group>
            </v-col>
          </v-row>
        </v-card-title>

        <v-card-text class="dialog-content px-5" :style="getDialogContentPaddingTop">
          <v-row>
            <v-col cols="12" md="12">
              <bec-text-field
                v-model="modelFolio"
                :label="'Folio *'"
                :placeholder="'Ingrese el folio del recibo'"
                :prepend-icon="'mdi-invoice-list'"
                :rules="[validationRules.required]"
                :tooltip="'Folio del recibo de compra'"
              />
            </v-col>
            <v-col cols="12" md="12">
              <bec-text-field
                v-model="modelImporte"
                :label="'Importe *'"
                :placeholder="'Ingrese el monto total del recibo compra *'"
                :prepend-icon="'mdi-cash'"
                :rules="[validationRules.required]"
                :tooltip="'Importe total del recibo'"
              />
            </v-col>
            <v-col cols="12" md="12">
              <v-locale-provider locale="es-MX">
                <v-date-input
                  v-model="modelFecha"
                  :mobile="smAndDown"
                  :rules="[validationRules.required]"
                  clear-icon="mdi-close"
                  color="primary"
                  density="compact"
                  hide-details="auto"
                  label="Fecha *"
                  prepend-icon=""
                  prepend-inner-icon="mdi-invoice-text-clock"
                  title="Rango de fechas"
                  type="chip"
                  variant="outlined"
                >
                  <template v-slot:prepend>
                    <v-tooltip interactive>
                      <template v-slot:activator="{ props: tooltipProps }">
                        <v-icon
                          v-bind="mergeProps(tooltipProps)"
                          icon="mdi-information-slab-circle-outline"
                          size="20"
                        />
                      </template>
                      <span>Fecha en la que fue emitida el recibo de compra</span>
                    </v-tooltip>
                  </template>
                </v-date-input>
              </v-locale-provider>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider class="border-opacity-50 my-3" />
        <v-card-actions>
          <v-row>
            <v-col class="d-flex justify-end align-end position-absolute bottom-0 right-0">
              <v-btn
                border
                class="text-none mr-3"
                color="#722B81"
                height="40px"
                variant="text"
                width="120px"
              >
                Cancelar
              </v-btn>
              <v-btn
                class="text-none mr-2"
                color="#722B81"
                height="40px"
                variant="flat"
                width="120px"
                @click="onSave"
              >
                <!--@click="onDecision"-->
                Guardar
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-form>
    </v-card>
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

import type { Recibo } from './LoginView.vue'

export default defineComponent({
  name: 'KioskoModalForm',
  components: { BecSelect, BecAutocomplete, BecTextField, BecTextArea },
  props: {
    dialogEvent: String,
    dialogTitle: String,
    dialogView: Boolean,
  },
  setup(props, { emit }) {
    // Estado reactivo

    const modelFecha = ref()
    const modelFolio = ref()
    const modelImporte = ref()

    const modelRecibo = ref<Recibo>()

    const { dataModel, setSistema, resetModel } = useSistemaModel()

    const sistemaStore = useSistemaStore()
    const dialogConfirmation = useDialogManagerStore()

    const formRef = ref()
    const loading = ref(false)
    const nombreEvento = ref<string>('')

    const dialogPropiedades = ref({
      dialog: ref(props.dialogView),
      evento: ref(props.dialogEvent),
      titulo: ref(props.dialogTitle),
    })

    const { name, mobile, smAndDown } = useDisplay()

    // Metodos

    const onClose = () => {
      emit('close')
    }

    const onSave = () => {
      const fechaInicio = modelFecha.value?.[0] ? new Date(modelFecha.value[0]) : null

      const fechaFormateada = fechaInicio
        ? `${fechaInicio.getFullYear()}-${String(fechaInicio.getMonth() + 1).padStart(
            2,
            '0',
          )}-${String(fechaInicio.getDate()).padStart(2, '0')}`
        : ''

      const reciboObj: Recibo = {
        id: 4,
        folio: modelFolio.value,
        importe: modelImporte.value ?? 0,
        fecha: fechaFormateada,
      }
      emit('save', reciboObj)
    }

    /*
    const onDecision = () => {
      let mensaje = "";
      let titulo = "";

      if (dialogPropiedades.value.elementos.id) {
        titulo = "Actualización de datos";
        mensaje = `¿Está seguro de que desea actualizar el registro "${dialogPropiedades.value.elementos.nombre}" (Código: ${dialogPropiedades.value.elementos.codigo})? Los cambios realizados serán guardados de forma permanente.`;
      } else {
        titulo = "Registro de datos";
        mensaje = `¿Está seguro de que desea registrar el nuevo sistema "${dialogPropiedades.value.elementos.nombre}" (Código: ${dialogPropiedades.value.elementos.codigo})? Esta acción no se puede deshacer.`;
      }

      dialogConfirmation.onOpenDialogConfirmation(
        mensaje,
        validateForm, // << callback directo
        [],
        titulo,
        "alert"
      );
    };*/

    const validateForm = async () => {
      dialogConfirmation.onCloseDialogConfirmation()

      const form = await formRef.value?.validate()

      if (!form) return

      if (form.valid) {
        try {
          loading.value = true

          // No guardar, solo buscar y regresar el item
          // Si ya lo facturo antes no dejar agregarlo
          // si es el primer ticket que va a meter lo manda directo a pdf y xml
          //
          await sistemaStore.storeSistema(dataModel.value)

          await form.value?.reset()

          dialogConfirmation.onOpenDialogInformation(
            'Recibo encontrado.',
            'Registro encontrado',
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
      validationRules,
      loading,
      onClose,
      onSave,
      smAndDown,
      modelFecha,
      modelFolio,
      modelImporte,
      modelRecibo,
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
