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
              <v-icon color="primary" icon="mdi-microsoft-excel" />
              <v-divider
                class="ml-3 mr-2 align-self-center border-opacity-25"
                length="20"
                thickness="2"
                vertical
              />

              Errores encontrados
            </v-col>
            <v-col cols="12" md="6" class="d-flex align-center justify-end">
              <v-btn-group variant="outlined" divided>
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
          <v-data-iterator :items="dialogPropiedades.elementos" items-per-page="-1">
            <template v-slot:default="{ items }">
              <v-row v-for="grupo in items" :key="grupo.raw.agrupador">
                <v-col cols="12">
                  <v-card class="rounded pa-5" color="#f0f0f0" elevation="5">
                    <v-row>
                      <v-col cols="1"></v-col>
                      <v-col cols="11">
                        <span style="font-weight: bold; color: #af1023; font-size: 20px">
                          Errores de: {{ grupo.raw.agrupador }}
                        </span>
                      </v-col>
                    </v-row>

                    <v-row v-for="err in grupo.raw.errores" :key="err.tipo">
                      <v-divider class="mx-5 border-opacity-25" />

                      <v-col cols="1" class="d-flex align-center justify-center">
                        <v-icon color="warning" size="24px">mdi-alert</v-icon>
                      </v-col>

                      <v-col cols="5">
                        <span style="font-weight: bold; color: #af1023; font-size: 16px">
                          Error: {{ err.tipo }}
                        </span>
                        <br />
                        <span>
                          {{ obtenerMensaje(err.tipo) }}
                        </span>
                      </v-col>

                      <v-col cols="5">
                        <span style="font-weight: bold; color: #af1023; font-size: 16px">
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

import { useDialogManagerStore } from '@/stores/modules/Core/dialog'

// utils
import { validationRules } from '@/utils/validationRules'
import { inputFilters } from '@/utils/inputFilters'

import type { ItemError } from '@/interfaces/nomina/gape/IncidenciaItemError'

export default defineComponent({
  name: 'IncidenciaModalLog',
  components: {},
  props: {
    dialogEvent: String,
    dialogItems: Array,
    dialogTitle: String,
    dialogView: Boolean,
  },
  setup(props, { emit }) {
    /*
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
            tipo: 'vacaciones',
            celdas: 'C1, C2, C3, C4, C5',
          },
          {
            tipo: 'diasPeriodo',
            celdas: 'D1, D2, D3, D4',
          },
          {
            tipo: 'diasDisponibles',
            celdas: 'D1, D2, D3, D4',
          },
        ],
      },
    ]
    */

    const itemsErrores = ref([])

    const mensajeErrores = [
      {
        tipo: 'numerico',
        mensaje:
          'Los datos en las celdas indicadas deben ser numéricos. Corrija la información para continuar.',
      },
      {
        tipo: 'decimal',
        mensaje:
          'Los datos en las celdas indicadas deben ser decimal. Corrija la información para continuar.',
      },
      {
        tipo: 'vacaciones',
        mensaje:
          'La suma de las vacaciones registradas en el Excel es mayor que las vacaciones disponibles.',
      },
      {
        tipo: 'diasPeriodo',
        mensaje:
          'La suma de los días de incidencia en el Excel supera los días del periodo asignado.',
      },
      {
        tipo: 'diasDisponibles',
        mensaje:
          'La suma de incidencias en el archivo excede los días disponibles después de restar los días ya utilizados.',
      },
    ]

    // Estado reactivo

    // 3. Composables | Vuetify
    const { name, mobile, smAndDown } = useDisplay()

    const dialogConfirmation = useDialogManagerStore()

    const formRef = ref()
    const loading = ref(false)
    const nombreEvento = ref<string>('')

    const dialogPropiedades = ref({
      dialog: ref(props.dialogView),
      elementos: ref<ItemError[]>((props.dialogItems as ItemError[]) || []),
      evento: ref(props.dialogEvent),
      titulo: ref(props.dialogTitle),
    })

    // Metodos

    const onClose = () => {
      emit('close')
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
          elementos: (props.dialogItems as ItemError[]) || [],
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
      dialogConfirmation,
      dialogHeader,
      dialogPropiedades,
      formRef,
      getDialogContentPaddingTop,
      inputFilters,
      loading,
      mergeProps,
      onClose,
      validationRules,
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
