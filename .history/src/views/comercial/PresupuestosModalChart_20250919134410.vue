<template>
  <v-dialog v-model="dialogPropiedades.dialog" width="40%" height="auto" persistent>
    <v-card class="rounded-lg">
      <v-form ref="formRef">
        <v-card-title
          class="position-fixed bg-surface-light dialog-header border-b-0 rounded-lg"
          ref="dialogHeader"
        >
          <v-row>
            <v-col cols="12" md="6" class="d-flex align-center">
              <v-icon color="#722B81" icon="mdi-invoice-text" />
              <v-divider
                class="ml-3 mr-2 align-self-center border-opacity-25"
                length="20"
                thickness="2"
                vertical
              />
              Hola
            </v-col>
            <v-col cols="12" md="6" class="d-flex align-center justify-end">
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
                  <span>Clic aquí para cerrar</span>
                </v-tooltip>
              </v-btn-group>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text class="dialog-content px-5" :style="getDialogContentPaddingTop">
          <v-row>
            <v-col cols="12" md="12">
              <div class="position-relative">
                <canvas ref="canvasChartLine" style="height: 300px" />

                <div
                  v-if="modelMarca === null"
                  class="d-flex align-center justify-center position-absolute bg-surface"
                  :style="{
                    ...getChartHeight,
                    left: 0,
                    textAlign: 'center',
                    top: 0,
                    width: '100%',
                    zIndex: 10,
                  }"
                >
                  <vue3-lottie
                    width="100%"
                    :animation-link="'/src/assets/images/no_data_animation.json'"
                  />
                </div>
              </div>
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

import { Chart, type ChartData, type ChartOptions } from 'chart.js/auto'

import { Vue3Lottie } from 'vue3-lottie'

//import interface

//import composable

// import stores
import { useDialogManagerStore } from '@/stores/modules/Core/dialog'
import { validationRules } from '@/utils/validationRules'

export interface Parametros {
  empresa: number | null
  ejercicio: string | number | null
  agente: string | null
  marca: string | null
  periodo: string | null
}

export default defineComponent({
  name: 'PresupuestosModalChart',
  components: { Vue3Lottie },
  props: {
    dialogView: Boolean,
    dialogTitle: String,
    dialogParametros: {
      type: Object as () => Partial<Parametros>,
    },
  },
  setup(props, { emit }) {
    // Estado reactivo

    const dialogConfirmation = useDialogManagerStore()

    const formRef = ref()
    const loading = ref(false)

    const dialogPropiedades = ref({
      dialog: ref(props.dialogView),
      elementos: {
        ...props.dialogParametros,
      },
      titulo: ref(props.dialogTitle),
    })

    const { name, mobile, smAndDown } = useDisplay()

    // Metodos

    const onClose = () => {
      emit('close')
    }

    watch(
      () => props.dialogView,
      (newDialogView) => {
        dialogPropiedades.value = {
          dialog: newDialogView,
          elementos: {
            ...props.dialogParametros,
          },
          titulo: props.dialogTitle,
        }
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
