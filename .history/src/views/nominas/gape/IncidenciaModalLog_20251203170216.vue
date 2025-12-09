<template>
  <v-dialog v-model="dialogPropiedades.dialog" :width="smAndDown ? '95vw' : '60vw'" persistent>
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

              Errores encontrados: 3
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
          <v-data-iterator :items="itemsErrores" items-per-page="-1">
            <template v-slot:default="{ items }">
              <v-row v-for="grupo in items" :key="grupo.raw.agrupador">
                <v-col cols="12">
                  <v-card class="rounded pa-3" color="#f0f0f0" elevation="0">
                    <v-row>
                      <v-col cols="1"></v-col>
                      <v-col cols="11">
                        <span style="font-weight: bold; color: #af1023; font-size: 20px">
                          Errores de {{ grupo.raw.agrupador }}:
                        </span>
                      </v-col>
                    </v-row>

                    <!-- 🔥 Errores del agrupador -->
                    <v-row v-for="err in grupo.raw.errores" :key="err.tipo">
                      <v-divider class="mx-5 my-2 mr-5" />

                      <v-col cols="1" class="d-flex align-center justify-center">
                        <v-icon color="warning" size="28px">mdi-alert</v-icon>
                      </v-col>

                      <v-col cols="5">
                        <span style="font-weight: bold; color: #af1023; font-size: 16px">
                          Error:
                        </span>
                        {{ err.tipo }}
                        <br />

                        <!-- 🔥 Mensaje dinámico según tipo -->
                        <span>
                          {{ obtenerMensaje(err.tipo) }}
                        </span>
                      </v-col>

                      <v-col cols="5">
                        <span style="font-weight: bold; color: #af1023; font-size: 18px">
                          Celdas:
                        </span>
                        <br />
                        <span>{{ err.celdas }}</span>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
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

    const headers = [
      { title: 'Celda', key: 'celda' },
      { title: 'Valor', key: 'valor' },
    ]

    const itemsErrores = [
      {
        agrupador: 'formato',
        errores: [
          {
            tipo: 'numerico',
            celdas: 'A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15',
          },
          {
            tipo: 'decimal',
            celdas: 'B1,B2,B3',
          },
        ],
      },
      {
        agrupador: 'nomina',
        errores: [
          {
            tipo: 'incidencias',
            celdas: 'C1, C2, C3, C4, C5',
          },
          {
            tipo: 'vacaciones',
            celdas: 'D1, D2, D3, D4',
          },
          {
            tipo: '1',
            celdas: 'D1, D2, D3, D4',
          },
          {
            tipo: '3',
            celdas: 'D1, D2, D3, D4',
          },
        ],
      },
    ]

    const mensajeErrores = [
      {
        tipo: 'numerico',
        mensaje:
          'Las celdas listadas contienen información inválida: solo se permiten números. Corrija la información para continuar',
      },
      {
        tipo: 'decimal',
        mensaje: 'Decimal. Corrija la información para continuar',
      },
      {
        tipo: 'vacaciones',
        mensaje:
          'Las celdas listadas contienen información inválida: solo se permiten números. Corrija la información para continuar',
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

    const obtenerMensaje = (tipo: string) => {
      const msg = mensajeErrores.find((m) => m.tipo === tipo)
      return msg ? msg.mensaje : 'Error no especificado'
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
      obtenerMensaje,
      mensajeErrores,
      itemsErrores,
      headers,
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

/* 🔷 Fondo transparente en todo */
:deep(.excel-table),
:deep(.excel-table table),
:deep(.excel-table tbody tr),
:deep(.excel-table thead tr),
:deep(.excel-table td),
:deep(.excel-table th) {
  background-color: transparent !important;
}

/* 🔷 Bordes en TODA la tabla (incluye headers y body) */
:deep(.excel-table td),
:deep(.excel-table th) {
  border: 1px solid #cccccc !important;
  padding: 6px !important;
  white-space: nowrap;
}

/* 🔷 Estilo del texto en headers */
:deep(.excel-table th) {
  font-weight: bold !important;
  background-color: #f3f3f3 !important; /* si quieres fondo, quítalo si debe ser transparente */
  color: #333 !important;
}

/* 🔥 Celda inválida */
.error-cell {
  background-color: #ffe5e5 !important;
  border: 2px solid #ff4d4d !important;
  color: #b00000;
  font-weight: 600;
}

/* ⚠️ Icono de alerta tipo Excel */
.error-icon {
  cursor: pointer;
  filter: drop-shadow(0 0 2px white);
}

/* Wrapper para texto + icono */
.excel-cell-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
