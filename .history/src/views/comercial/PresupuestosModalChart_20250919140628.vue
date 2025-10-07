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
              {{ dialogPropiedades.titulo }}
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
      nextTick(() => {
        if (canvasChartLine.value) {
          instanceChartLine = new Chart(canvasChartLine.value, {
            type: 'line',
            data: chartData.value,
            options: optionsChartLine,
          })
        }

        fetchChartData()
      })

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

    const canvasChartLine = ref<HTMLCanvasElement | null>(null)

    let instanceChartLine: Chart

    let delayed = false

    const optionsChartLine: ChartOptions = {
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
      console.log(dialogPropiedades.value.elementos)

      try {
        await reporte.storeData(dialogPropiedades.value.elementos)
        const dataset = reporte.dataset

        let index = 0

        let datasets = dataset.map((concepto: any) => {
          const data = months.map((mes: any) => parseFloat(concepto[mes.label.toLowerCase()]) || 0)

          const color = getNextColor(index++)
          return {
            label: concepto.tipo + ' - ' + concepto.marca,
            data: data,
            backgroundColor: color,
            borderColor: color,
            stack: 'stack_' + concepto.marca, // Agrupar por stack si es necesario
          }
        })

        instanceChartLine.data = {
          labels: months.map((m) => m.label),
          datasets: datasets,
        }

        instanceChartLine.update()
      } catch (error) {
      } finally {
      }
    }

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
