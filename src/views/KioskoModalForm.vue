<template>
  <v-dialog v-model="dialogPropiedades.dialog" :width="smAndDown ? '95vw' : '40vw'" persistent>
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
                v-model="dataModel.folio"
                :color="'#722B81'"
                :label="'Folio *'"
                :placeholder="'Ingrese el folio del recibo'"
                :prepend-icon="'mdi-invoice-list'"
                :rules="[validationRules.required]"
                @keypress="inputFilters.onlyAlphanumeric"
              >
                <template #tooltip>
                  <v-card color="transparent" elevation="0" class="pa-3">
                    <v-row>
                      <v-col cols="1" class="d-flex align-center justify-center">
                        <v-icon class="mr-1" color="white" icon="mdi-invoice-list" />
                      </v-col>
                      <v-col cols="11">
                        Ingrese el folio de su recibo tal como aparece en el comprobante de pago.
                        Este dato permite identificar y validar correctamente la operación antes de
                        generar la factura.
                      </v-col>
                    </v-row>
                    <v-divider class="border-opacity-50 my-2 mx-4" />
                    <v-row>
                      <v-col cols="1" class="d-flex align-center justify-center">
                        <v-icon class="mr-1" color="white" icon="mdi-alert" />
                      </v-col>
                      <v-col cols="11">
                        <span style="font-weight: bold">Nota:</span>
                        los campos marcados con (*) son obligatorios para continuar con el proceso
                        de facturación.
                      </v-col>
                    </v-row>
                  </v-card>
                </template>
              </bec-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <bec-text-field
                v-model="dataModel.importe"
                :color="'#722B81'"
                :label="'Importe *'"
                :placeholder="'Ingrese el monto total del recibo compra *'"
                :prepend-icon="'mdi-cash'"
                :rules="[validationRules.required]"
                @keypress="(e: any) => inputFilters.onlyDecimal(e, dataModel.importe)"
              >
                <template #tooltip>
                  <v-card color="transparent" elevation="0" class="pa-3">
                    <v-row>
                      <v-col cols="1" class="d-flex align-center justify-center">
                        <v-icon class="mr-1" color="white" icon="mdi-cash" />
                      </v-col>
                      <v-col cols="11">
                        Ingrese el importe total de su recibo de compra tal como aparece en el
                        comprobante. Este dato se utiliza para validar la operación y garantizar que
                        la factura coincida con el monto pagado.
                      </v-col>
                    </v-row>
                    <v-divider class="border-opacity-50 my-2 mx-4" />
                    <v-row>
                      <v-col cols="1" class="d-flex align-center justify-center">
                        <v-icon class="mr-1" color="white" icon="mdi-alert" />
                      </v-col>
                      <v-col cols="11">
                        <span style="font-weight: bold">Nota:</span>
                        los campos marcados con (*) son obligatorios para continuar con el proceso
                        de facturación.
                      </v-col>
                    </v-row>
                  </v-card>
                </template>
              </bec-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-locale-provider locale="es-MX">
                <v-date-input
                  v-model="dataModel.fecha"
                  :color="'#722B81'"
                  :mobile="smAndDown"
                  :rules="[validationRules.required]"
                  clear-icon="mdi-close"
                  density="compact"
                  hide-details="auto"
                  label="Fecha *"
                  prepend-icon=""
                  prepend-inner-icon="mdi-invoice-text-clock"
                  title="Fecha del ticket"
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
                      <v-card color="transparent" elevation="0" class="pa-3">
                        <v-row>
                          <v-col cols="1" class="d-flex align-center justify-center">
                            <v-icon class="mr-1" color="white" icon="mdi-invoice-text-clock" />
                          </v-col>
                          <v-col cols="11">
                            Ingrese la fecha de su recibo de compra tal como aparece en el
                            comprobante. Este dato permite validar que el recibo sea reciente y
                            coincida con el registro de su pago.
                          </v-col>
                        </v-row>
                        <v-divider class="border-opacity-50 my-2 mx-4" />
                        <v-row>
                          <v-col cols="1" class="d-flex align-center justify-center">
                            <v-icon class="mr-1" color="white" icon="mdi-alert" />
                          </v-col>
                          <v-col cols="11">
                            <span style="font-weight: bold">Nota:</span>
                            los campos marcados con (*) son obligatorios para continuar con el
                            proceso de facturación.
                          </v-col>
                        </v-row>
                      </v-card>
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
                @click="onClose"
              >
                Cancelar
              </v-btn>
              <v-btn
                class="text-none mr-2"
                color="#722B81"
                height="40px"
                variant="flat"
                width="120px"
                :loading="loading"
                @click="onSave"
              >
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
import type { PropType } from 'vue'

import { useDisplay } from 'vuetify'

//import interface

//import composable

// import stores
import { kiosko } from '@/stores/modules/Core/kiosko'
import { useDialogManagerStore } from '@/stores/modules/Core/dialog'
import { validationRules } from '@/utils/validationRules'
import { inputFilters } from '@/utils/inputFilters'

// import components
import BecSelect from '@/components/core/becmaComponents/BecSelect.vue'
import BecAutocomplete from '@/components/core/becmaComponents/BecAutocomplete.vue'
import BecTextField from '@/components/core/becmaComponents/BecTextField.vue'
import BecTextArea from '@/components/core/becmaComponents/BecTextArea.vue'
import { id } from 'vuetify/locale'

export default defineComponent({
  name: 'KioskoModalForm',
  components: { BecSelect, BecAutocomplete, BecTextField, BecTextArea },
  props: {
    dialogTitle: String,
    dialogView: Boolean,
    idSucursal: {
      type: Number as PropType<number | null>,
      default: null,
    },
  },
  setup(props, { emit }) {
    // 1. Imports
    // 2. Props y Emits
    // 3. Composables (funciones reusables)
    // 4. Reactive
    // 5. Computed properties
    // 6. Watchers
    // 7. Lifecycle hooks (onMounted, mounted)
    // 8. Functions (fetch, metodos, async)

    // 2. Props
    const dialogPropiedades = ref({
      dialog: ref(props.dialogView),
      titulo: ref(props.dialogTitle),
      idSucursal: ref(props.idSucursal),
    })

    // 2. Emits
    const onClose = () => {
      emit('close')
    }

    // 3. Composables | Vuetify
    const { name, mobile, smAndDown } = useDisplay()

    // 3. Composables | Store
    const dialogStore = useDialogManagerStore()
    const storeKiosko = kiosko()
    const dialogConfirmation = useDialogManagerStore()

    // 4. Reactive | recibo

    const dataModel = ref({
      id: dialogPropiedades.value.idSucursal,
      folio: '',
      importe: 0,
      fecha: '',
      fechaFormato: '',
      codigo: 0,
      idReciboEncabezado: 0,
    })

    const formRef = ref()
    const loading = ref(false)

    // 4. Reactive | Header
    const dialogHeader = ref()
    const headerHeight = ref(0)

    // 5. Computed | getPaddingTop
    const calcularDimensiones = () => {
      if (dialogHeader.value) {
        headerHeight.value = dialogHeader.value.$el.clientHeight + 20
      }
    }

    const getDialogContentPaddingTop = computed(() => {
      if (dialogHeader.value) {
        calcularDimensiones()
      }

      return { paddingTop: `${headerHeight.value}px !important` }
    })

    // 6. Watchers
    watch(
      () => props.dialogView,
      (newDialogView) => {
        dialogPropiedades.value = {
          dialog: newDialogView,
          titulo: props.dialogTitle,
          idSucursal: props.idSucursal,
        }
      },
    )
    // 7. Lifecycle hooks (onMounted, mounted)
    onMounted(() => {
      window.addEventListener('resize', calcularDimensiones)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', calcularDimensiones)
    })

    // 8. Functions (fetch, metodos, async)

    const onSave = async () => {
      const fechaInicio = new Date(dataModel.value.fecha)

      const fechaFormateada = fechaInicio
        ? `${String(fechaInicio.getDate()).padStart(2, '0')}/${String(
            fechaInicio.getMonth() + 1,
          ).padStart(2, '0')}/${fechaInicio.getFullYear()}`
        : ''
      dataModel.value.fechaFormato = fechaFormateada

      dataModel.value.id = dialogPropiedades.value.idSucursal

      const form = await formRef.value?.validate()

      if (!form) return

      if (form.valid) {
        try {
          loading.value = true

          await storeKiosko.storeValidarTicket(dataModel.value)

          await form.value?.reset()

          let codigoPeticion = storeKiosko.resultTicket.data.codigo
          let idReciboEncabezado = storeKiosko.resultTicket.data.idReciboEncabezado

          dataModel.value.codigo = codigoPeticion
          dataModel.value.idReciboEncabezado = idReciboEncabezado

          switch (codigoPeticion) {
            case 1:
              // el ticket se encuentra facturado y se procede a mostrar el pdf

              emit('save', dataModel.value)
              limpiarFormulario()
              break
            case 2:
              dialogConfirmation.onOpenDialogInformation(
                'El número de ticket ingresado no se encuentra registrado. Verifique los datos e intente nuevamente.',
                'Ticket no encontrado',
                'incorrect',
                '#B00000',
                2,
              )
              break
            case 3:
              // ticket valido
              emit('save', dataModel.value)
              limpiarFormulario()
              break
            case 4:
              dialogConfirmation.onOpenDialogInformation(
                'El ticket ingresado ya fue utilizado para una factura o se encuentra en proceso de timbrado. No es posible continuar con la operación.',
                'Ticket en uso',
                'incorrect',
                '#B00000',
                2,
              )
              break
            case 6:
              dialogConfirmation.onOpenDialogInformation(
                'El ticket pertenece a un mes anterior al actual. Solo se pueden facturar tickets emitidos dentro del mes vigente.',
                'Ticket fuera del periodo permitido',
                'incorrect',
                '#B00000',
                2,
              )
              break
            default:
              dialogConfirmation.onOpenDialogInformation(
                'Ocurrió un error inesperado al guardar.',
                'Error',
                'incorrect',
                '#B00000',
                2,
              )
              break
          }
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
              '#B00000',
              2,
            )
          }
        } finally {
          loading.value = false
        }
      }
    }

    const limpiarFormulario = () => {
      dataModel.value = {
        id: 0,
        folio: '',
        importe: 0,
        fecha: '',
        fechaFormato: '',
        codigo: 0,
        idReciboEncabezado: 0,
      }
    }

    return {
      dialogConfirmation,
      dialogHeader,
      dialogPropiedades,
      formRef,
      getDialogContentPaddingTop,
      loading,
      mergeProps,
      onClose,
      onSave,
      smAndDown,
      validationRules,
      inputFilters,
      dataModel,
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
