<template>
  <v-dialog
    @after-enter="fetchChartData"
    v-model="dialogPropiedades.dialog"
    width="40%"
    height="auto"
    persistent
    eager
  >
    <v-card class="rounded-lg">
      <v-form ref="formRef">
        <v-card-title
          class="position-fixed bg-surface-light dialog-header border-b-0 rounded-t"
          ref="dialogHeader"
        >
          <v-row>
            <v-col cols="12" md="6" class="d-flex align-center">
              <v-icon color="primary" size="24px" icon="mdi-chart-line" />
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
            <v-col cols="4" class="d-flex align-center justify-center">
              <v-card color="#EEEEEE" width="100%" elevation="0">
                <v-card-title class="pb-0 d-flex align-center justify-center">
                  <v-icon size="48px" color="primary">mdi-cash-minus</v-icon>
                </v-card-title>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-subtitle-1 font-weight-black d-flex align-center justify-center"
                    >
                      $ 100
                    </v-list-item-title>
                    <v-list-item-subtitle class="d-flex align-center justify-center">
                      Desviación
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col cols="4" class="d-flex align-center justify-center">
              <v-card color="#EEEEEE" width="100%" elevation="0">
                <v-card-title class="pb-0 d-flex align-center justify-center">
                  <v-icon size="48px" color="primary"> mdi-bullseye-arrow </v-icon>
                </v-card-title>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-subtitle-1 font-weight-black d-flex align-center justify-center"
                    >
                      100%
                    </v-list-item-title>
                    <v-list-item-subtitle class="d-flex align-center justify-center">
                      Alcance
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col cols="4" class="d-flex align-center justify-center">
              <v-card color="#EEEEEE" width="100%" elevation="0">
                <v-card-title class="pb-0 d-flex align-center justify-center">
                  <v-icon size="48px" color="primary"> mdi-cash-remove </v-icon>
                </v-card-title>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-subtitle-1 font-weight-black d-flex align-center justify-center"
                    >
                      $ 100
                    </v-list-item-title>
                    <v-list-item-subtitle class="d-flex align-center justify-center">
                      Déficit
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <div>
                <canvas ref="canvasChartLine2" style="height: 300px; width: 300px" />
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import {
  ref,
  computed,
  defineComponent,
  mergeProps,
  nextTick,
  onMounted,
  onUnmounted,
  watch,
} from 'vue'

import { useDisplay } from 'vuetify'

import { Chart, type ChartData, type ChartOptions } from 'chart.js/auto'

//import interface

//import composable

// import stores

import { rptPresupuestos } from '@/stores/modules/Comercial/rptPresupuestos'
import { useDialogManagerStore } from '@/stores/modules/Core/dialog'
import { validationRules } from '@/utils/validationRules'

export interface Parametros {
  empresa: number | null
  ejercicio: string | number | null
  id_ejercicio: string | number | null
  agente: string | null
  marca: string | null
  periodo: string | null
}

export default defineComponent({
  name: 'PresupuestosModalChart',
  components: {},
  props: {
    dialogView: Boolean,
    dialogTitle: String,
    dialogParametros: {
      type: Object as () => Partial<Parametros>,
    },
  },
  setup(props, { emit }) {
    // Estado reactivo

    const reporte = rptPresupuestos()
    const dialogConfirmation = useDialogManagerStore()

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

    /*
    watch(
      () => props.dialogView,
      async (isOpen) => {
        if (isOpen) {
          await nextTick() // esperar a que se monte el canvas
        }
      },
    )
    */

    // Header
    const dialogHeader = ref()
    const headerHeight = ref(0)

    const calcularDimensiones = () => {
      if (dialogHeader.value) {
        headerHeight.value = dialogHeader.value.$el.clientHeight + 100
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

    // Chart
    const chartData = ref<ChartData>({
      labels: [],
      datasets: [],
    })

    const canvasChartLine2 = ref<HTMLCanvasElement | null>(null)

    let instanceChartLine2: Chart

    let delayed = false

    const optionsChartLine2: ChartOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: mobile.value ? 'top' : 'right',
          onHover: (evt, item, legend) => {
            legend.chart.data.datasets.forEach((dataset) => {
              dataset.backgroundColor =
                dataset.label === item.text
                  ? dataset.backgroundColor
                  : (dataset.backgroundColor as string) + '4D'
            })
            legend.chart.update()
          },
          onLeave: (evt, item, legend) => {
            legend.chart.data.datasets.forEach((dataset) => {
              dataset.backgroundColor =
                dataset.label === item.text
                  ? dataset.backgroundColor
                  : (dataset.backgroundColor as string).slice(0, -2)
            })
            legend.chart.update()
          },
        },
        title: {
          display: true,
          text: 'Ventas por marcas Lineal',
        },
      },
      responsive: true,
      onClick: (e, elements, chart) => {
        if (elements.length > 0) {
          const clickedElement = elements[0]
          const datasetIndex = clickedElement.datasetIndex
          const index = clickedElement.index
          const value = chart.data.datasets[datasetIndex].data[index]
          const label = chart.data.labels?.[index]
          const legend = chart.legend?.legendItems?.[0].text

          console.log(`Hiciste clic en: ${label} con valor ${value}`)
          alert(`Hiciste clic en: ${legend}: ${label} con valor ${value}`)
        }
      },
    }

    const fetchChartData = async () => {
      /*if (instanceChartLine2) {
        instanceChartLine2.destroy()
      }

      await nextTick()
      console.log('canvasChartLine2s')
      console.log(canvasChartLine2.value)

      if (canvasChartLine2.value) {
        instanceChartLine2 = new Chart(canvasChartLine2.value, {
          type: 'line',
          data: {
            labels: ['Periodo', 'Mes elegido'],
            datasets: [
              {
                label: 'Objetivos',
                data: [120, 150],
                borderColor: 'blue',
              },
              {
                label: 'Ventas',
                data: [80, 140],
                borderColor: 'green',
              },
            ],
          },
          options: optionsChartLine2,
        })
      }

      console.log('después canvasChartLine2s')
      console.log(canvasChartLine2.value)*/
      await nextTick()

      if (instanceChartLine2) {
        instanceChartLine2.destroy()
      }

      if (canvasChartLine2.value) {
        instanceChartLine2 = new Chart(canvasChartLine2.value, {
          type: 'line',
          data: chartData.value,
          options: optionsChartLine2,
        })
      }

      try {
        await reporte.storeDataPresupuesto(dialogPropiedades.value.elementos)
        const dataset = reporte.dataset

        let index = 0

        const labels = ['Periodo', 'Mes elegido']

        let datasets = dataset.map((concepto: any) => {
          //const color = getNextColor(index++)
          return {
            label: concepto.tipo,
            data: [concepto.periodo, concepto.TotalVentas],
            //stack: 'stack_' + concepto.marca, // Agrupar por stack si es necesario
          }
        })

        instanceChartLine2.data = {
          labels: labels,
          datasets: datasets,
        }

        instanceChartLine2.update()
      } catch (error) {
      } finally {
      }
    }

    return {
      dialogConfirmation,
      dialogHeader,
      dialogPropiedades,
      getDialogContentPaddingTop,
      mergeProps,
      validationRules,
      onClose,
      smAndDown,
      fetchChartData,
      canvasChartLine2,
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
