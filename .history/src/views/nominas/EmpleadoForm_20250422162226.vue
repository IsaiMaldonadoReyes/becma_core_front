<template>
  <v-container ref="vconPrincipalRef" class="h-100">
    <v-row ref="vbrePrincipalRef" dense>
      <v-col cols="12" md="6" class="d-flex align-end">
        <v-breadcrumbs :items="vbrePrincipalItems" divider="|" class="text-medium-emphasis">
          <template v-slot:prepend>
            <v-icon icon="mdi-chart-bar" color="primary" />
          </template>
        </v-breadcrumbs>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-end justify-end">
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ props }">
            <v-divider vertical class="mr-5 mt-2 border-opacity-25"></v-divider>
            <v-btn
              v-bind="props"
              class="mr-1"
              color="primary"
              height="48px"
              min-width="48px"
              width="48px"
              @click="fetchExcel"
            >
              <v-icon color="white" icon="mdi-microsoft-excel" size="24px" />
            </v-btn>
          </template>
          <span>Exportar información a .xlsx</span>
        </v-tooltip>
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              min-width="48px"
              width="48px"
              height="48px"
              class="mr-1"
              v-bind="props"
            >
              <v-icon size="24px" color="white">mdi-file-pdf-box</v-icon>
            </v-btn>
          </template>
          <span>Exportar gráfica a .pdf</span>
        </v-tooltip>
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              color="primary"
              height="48px"
              min-width="48px"
              width="48px"
              @click.stop="vnavFiltrosIsOpen = !vnavFiltrosIsOpen"
            >
              <v-icon size="24px" color="white">
                {{ vnavFiltrosIsOpen ? 'mdi-filter-menu' : 'mdi-filter' }}
              </v-icon>
            </v-btn>
          </template>
          <span>
            {{ vnavFiltrosIsOpen ? 'Cerrar panel de filtros' : 'Abrir panel de filtros' }}
          </span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="my-0 py-0">
        <v-divider class="border-opacity-25 ma-0 pa-0" />
      </v-col>
    </v-row>
    <v-row ref="vtabGraficaRef">
      <v-col class="my-0 py-0">
        <v-tabs
          v-model="vtabGraficaSelected"
          color="primary"
          class="text-none text-medium-emphasis"
        >
          <v-tab v-for="tab in vtabMenuItems" :key="tab.value" :value="tab.value">
            <v-icon left class="pr-2">{{ tab.icon }}</v-icon>
            {{ tab.title }}
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card elevation="5" class="pa-5 overflow-auto" :style="getCardHeight">
          <v-tabs-window v-model="vtabGraficaSelected">
            <v-tabs-window-item value="tab01" eager>Datos principales</v-tabs-window-item>
            <v-tabs-window-item value="tab02" eager>Datos generales</v-tabs-window-item>
            <v-tabs-window-item value="tab03" eager>Datos IMMS, Infonavit</v-tabs-window-item>
            <v-tabs-window-item value="tab04" eager>Datos Sueldos y salarios</v-tabs-window-item>
            <v-tabs-window-item value="tab05" eager>Datos Cálculos</v-tabs-window-item>
            <v-tabs-window-item value="tab06" eager>Datos Pagos extras</v-tabs-window-item>
            <v-tabs-window-item value="tab07" eager>Datos Pagos extras</v-tabs-window-item>
          </v-tabs-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  mergeProps,
  computed,
  onMounted,
  onUnmounted,
  watch,
  nextTick,
  onBeforeUnmount,
} from 'vue'

import { useDisplay } from 'vuetify'
import { Chart, type ChartData, type ChartOptions } from 'chart.js/auto'

import { sistemaStore } from '../../stores/modules/Core/sistema'
import { options } from 'node_modules/axios/index.cjs'

import { rpt2VentasPorMarcas } from '../../stores/modules/Comercial/rpt2VentasPorMarcas'

interface Empresa {
  id: number
  nombre_empresa: string
  nombre_base: string
}

interface Marca {
  cidvalorclasificacion: number
  cvalorclasificacion: string
}

interface Modo {
  subtitle: string
  title: string
  value: string
}

interface FiltroModel {
  empresa: object | null
  marcas: Array<{ cidvalorclasificacion: number; cvalorclasificacion: string }> | null
  modo: string | null
  fechas: string | null
}

interface FiltroItems {
  empresa: Array<{ id: number; nombre_empresa: string; nombre_base: string }>
  marca: Array<{ cidvalorclasificacion: number; cvalorclasificacion: string }> | null
  modo: Array<{ subtitle: string; title: string; value: string }>
}

export default defineComponent({
  name: 'EmpleadoForm',
  components: {},

  setup() {
    // 1.Imports
    // 2.Props y Emits
    // 3.Composables
    // 4.Reactive
    // 5.Computed
    // 6.Watchers
    // 7.Functions
    const vbrePrincipalItems = ref([
      {
        disabled: false,
        href: 'breadcrumbs_dashboard',
        title: 'Panel de resultados',
      },
      {
        disabled: false,
        href: 'breadcrumbs_link_1',
        title: 'Ventas por marcas',
      },
    ])
    const vbrePrincipalRef = ref()
    const vconPrincipalRef = ref()

    const vforFiltrosRef = ref()
    const vforFiltrosRule = {
      required: (v: string) => !!v || 'Este dato es requerido para continuar.',
      required2: (v: any) => (v != null && String(v).length > 0) || 'Selecciona',
    }
    const vnavFiltrosIsOpen = ref(true)

    const vtabGraficaRef = ref()
    const vtabMenuItems = ref([
      {
        icon: 'mdi-card-account-details-outline',
        title: 'Principales',
        value: 'tab01',
      },
      {
        icon: 'mdi-chart-gantt',
        title: 'Generales',
        value: 'tab02',
      },
      {
        icon: 'mdi-chart-line',
        title: 'IMMS, Infonavit',
        value: 'tab03',
      },
      {
        icon: 'mdi-chart-line',
        title: 'Sueldos y salarios',
        value: 'tab04',
      },
      {
        icon: 'mdi-chart-line',
        title: 'Cálculos',
        value: 'tab05',
      },
      {
        icon: 'mdi-chart-line',
        title: 'Pagos y extras',
        value: 'tab06',
      },
      {
        icon: 'mdi-chart-line',
        title: 'Hist. tipo periodo',
        value: 'tab07',
      },
    ])
    const vtabGraficaSelected = ref<any>('tabBarrasV')

    const cardHeight = ref(0)
    const chartHeight = ref(0)

    const filtroItems = ref<FiltroItems>({
      empresa: [],
      marca: null,
      modo: [
        {
          subtitle: 'Filtrar por cantidades totales de productos vendidos por marca.',
          title: 'Cantidad',
          value: 'cantidad',
        },
        {
          subtitle: 'Mostrar reporte por precio de los productos vendidos por marca.',
          title: 'Precio',
          value: 'precio',
        },
      ],
    })

    const modelMarca = ref<Marca[]>([])
    const itemsMarcas = ref<Marca[]>([])

    const modelEmpresa = ref<Empresa>()
    const itemsEmpresas = ref<Empresa[]>([])

    const modelModo = ref<string>()
    const itemsModos = ref<Modo[]>([
      {
        subtitle: 'Filtrar por cantidades totales de productos vendidos por marca.',
        title: 'Cantidad',
        value: 'cantidad',
      },
      {
        subtitle: 'Mostrar reporte por precio de los productos vendidos por marca.',
        title: 'Precio',
        value: 'precio',
      },
    ])

    const modelFechas = ref<string[]>([])

    const filtroModels = ref<FiltroModel>({
      empresa: null,
      marcas: null,
      modo: filtroItems.value.modo?.[0].value,
      fechas: null,
    })

    // Computed

    const getCardHeight = computed(() => {
      if (vconPrincipalRef.value) {
        calcularDimensiones()
      }
      return { height: `${cardHeight.value}px !important` }
    })

    const getChartHeight = computed(() => {
      if (vconPrincipalRef.value) {
        calcularDimensiones()
      }

      return { height: `${chartHeight.value}px !important` }
    })

    const getMarcas = computed(() => itemsMarcas.value)

    // Funcionalidad vuetify
    const { name, mobile, smAndDown } = useDisplay()

    // Chart Js
    const chartBarrasV = ref<HTMLCanvasElement | null>(null)
    const chartBarrasH = ref<HTMLCanvasElement | null>(null)
    const chartLineal = ref<HTMLCanvasElement | null>(null)
    let chartInstanceV: Chart
    let chartInstanceH: Chart
    let chartInstanceLineal: Chart

    const chartData = ref<ChartData>({
      labels: [],
      datasets: [],
    })

    const getNextColor = (index: number) => {
      const CHART_COLORS = ['#BB3337', '#FF6000', '#ED3237', '#00335F', '#00A859', '#025595']

      const colorIndex = index % CHART_COLORS.length
      const variationIndex = Math.floor(index / CHART_COLORS.length)

      const baseHex = CHART_COLORS[colorIndex]

      const r = parseInt(baseHex.slice(1, 3), 16)
      const g = parseInt(baseHex.slice(3, 5), 16)
      const b = parseInt(baseHex.slice(5, 7), 16)

      // Función para variar ligeramente el color (más claro/oscuro)
      const vary = (value: number, factor: number) =>
        Math.min(255, Math.max(0, value + factor))
          .toString(16)
          .padStart(2, '0')

      // Calcula un factor cíclico para generar variaciones (+/-20 cada ciclo)
      const variation = (variationIndex % 2 === 0 ? 1 : -1) * 20 * Math.ceil(variationIndex / 2)

      const newR = vary(r, variation)
      const newG = vary(g, variation)
      const newB = vary(b, variation)

      return `#${newR}${newG}${newB}`
    }

    // Metodos
    const validarFiltros = async () => {
      await vforFiltrosRef.value?.validate()
    }

    let delayed = false
    const chartOptions: ChartOptions = {
      animation: {
        onComplete: () => {
          delayed = true
        },
        delay: (context) => {
          let delay = 0
          if (context.type === 'data' && context.mode === 'default' && !delayed) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100
          }
          return delay
        },
      },
      aspectRatio: 1,
      interaction: { mode: 'point' },
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Ventas por marcas barra',
        },
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

          alert(`Hiciste clic en: ${legend}: ${label} con valor ${value}`)
        }
      },
    }
    const chartOptions2: ChartOptions = {
      animation: {
        onComplete: () => {
          delayed = true
        },
        delay: (context) => {
          let delay = 0
          if (context.type === 'data' && context.mode === 'default' && !delayed) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100
          }
          return delay
        },
      },

      aspectRatio: 1,
      maintainAspectRatio: false,
      indexAxis: 'y',
      interaction: {
        mode: 'point',
      },
      plugins: {
        title: {
          display: true,
          text: 'Ventas por marcas',
        },
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
    const chartOptions3: ChartOptions = {
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

    onMounted(() => {
      nextTick(() => {
        if (chartBarrasV.value) {
          chartInstanceV = new Chart(chartBarrasV.value, {
            type: 'bar',
            data: chartData.value,
            options: chartOptions,
          })
        }

        if (chartBarrasH.value) {
          chartInstanceH = new Chart(chartBarrasH.value, {
            type: 'bar',
            data: chartData.value,
            options: chartOptions2,
          })
        }

        if (chartLineal.value) {
          chartInstanceLineal = new Chart(chartLineal.value, {
            type: 'line',
            data: chartData.value,
            options: chartOptions3,
          })
        }

        window.addEventListener('resize', calcularDimensiones)

        fetchEmpresas()
      })
    })

    onBeforeUnmount(() => {
      if (chartInstanceV) chartInstanceV.destroy()
      if (chartInstanceH) chartInstanceH.destroy()
      if (chartInstanceLineal) chartInstanceLineal.destroy()
      window.removeEventListener('resize', calcularDimensiones)
    })

    const calcularDimensiones = () => {
      if (vconPrincipalRef.value) {
        cardHeight.value =
          vconPrincipalRef.value.$el.clientHeight -
          vbrePrincipalRef.value.$el.clientHeight -
          vtabGraficaRef.value.$el.clientHeight -
          80

        chartHeight.value = cardHeight.value - 45
      }
    }

    const exportStore = sistemaStore()
    const reporte = rpt2VentasPorMarcas()

    const fetchChartData = async () => {
      const isValidForm = await vforFiltrosRef.value?.validate()

      if (isValidForm.valid) {
        const fechaInicio = filtroModels.value.fechas?.[0]
          ? new Date(filtroModels.value.fechas[0])
          : null

        const fechaInicioFormateada = fechaInicio
          ? `${fechaInicio.getFullYear()}-${String(fechaInicio.getMonth() + 1).padStart(2, '0')}-${String(fechaInicio.getDate()).padStart(2, '0')}`
          : ''

        const fechaFin = filtroModels.value.fechas?.[filtroModels.value.fechas.length - 1]
          ? new Date(filtroModels.value.fechas[filtroModels.value.fechas.length - 1])
          : null

        const fechaFinFormateada = fechaFin
          ? `${fechaFin.getFullYear()}-${String(fechaFin.getMonth() + 1).padStart(2, '0')}-${String(fechaFin.getDate()).padStart(2, '0')}`
          : ''

        const data = {
          empresa: modelEmpresa.value,
          marcas: modelMarca.value.map((m) => m.cidvalorclasificacion).join(', '),
          modo: modelModo.value,
          fechaInicio: fechaInicioFormateada,
          fechaFin: fechaFinFormateada,
        }

        try {
          await reporte.labelRpt2(data)

          const labels = reporte.label.data
          const months = labels.map(
            (item: any) => item.labels.charAt(0).toUpperCase() + item.labels.slice(1),
          )
          await reporte.dataRpt2(data)

          const dataset = reporte.dataset.data

          let index = 0

          let datasets = dataset.map((concepto: any) => {
            const data = months.map((mes: any) => parseFloat(concepto[mes.toLowerCase()]) || 0)
            const color = getNextColor(index++)
            return {
              label: concepto.marca,
              data: data,
              backgroundColor: color,
              borderColor: color,
              stack: 'stack_' + concepto.marca, // Agrupar por stack si es necesario
            }
          })

          chartInstanceV.data = {
            labels: months,
            datasets: datasets,
          }

          chartInstanceV.update()

          chartInstanceH.data = {
            labels: months,
            datasets: datasets,
          }

          chartInstanceH.update()

          chartInstanceLineal.data = {
            labels: months,
            datasets: datasets,
          }

          chartInstanceLineal.update()
        } catch (error) {
        } finally {
        }
      }
    }

    const fetchExcel = async () => {
      // Obtener los legends (nombres de los datasets) y agregar un primer elemento vacío
      const legends = ['', ...chartInstanceV.data.datasets.map((ds) => ds.label as string)]

      // Obtener los labels (eje X) de la gráfica
      const labels = chartInstanceV.data.labels as string[]

      // Inicializar la matriz con la primera fila de legends
      const transformedData: (string | number)[][] = [legends]

      // Recorrer los labels y construir cada fila
      for (let i = 0; i < labels.length; i++) {
        const row: (string | number)[] = [labels[i]] // Primer elemento de la fila es el label (Q1, Q2...)

        // Agregar los datos correspondientes de cada dataset en esta posición
        for (let j = 0; j < chartInstanceV.data.datasets.length; j++) {
          row.push(chartInstanceV.data.datasets[j].data[i] as number)
        }

        // Agregar la fila a la matriz transformada
        transformedData.push(row)
      }

      const backgroundColors = chartInstanceV.data.datasets.map((ds) => ds.backgroundColor)

      console.log(transformedData)

      /*const data = {
          info: transformedData,
          colors: backgroundColors.map((color) => rgbaToHex(color as string)),
        }*/

      const data = {
        info: transformedData,
        colors: backgroundColors.map((color) => (color as string).replace('#', '')),
        tipo: vtabGraficaSelected.value,
      }

      await exportStore.fetchExcel(data)

      console.log(exportStore.object)

      console.log(chartInstanceV.data.datasets)
      console.log(chartInstanceV.data.labels)
    }

    const fetchEmpresas = async () => {
      try {
        await reporte.rptEmpresas()

        itemsEmpresas.value = reporte.empresas.data
      } catch (error) {
      } finally {
      }
    }

    const fetchMarcas = async () => {
      modelMarca.value = []
      itemsMarcas.value = []
      const fechaInicio = modelFechas.value?.[0] ? new Date(modelFechas.value[0]) : null

      const fechaInicioFormateada = fechaInicio
        ? `${fechaInicio.getFullYear()}-${String(fechaInicio.getMonth() + 1).padStart(2, '0')}-${String(fechaInicio.getDate()).padStart(2, '0')}`
        : ''

      const fechaFin = modelFechas.value?.[modelFechas.value.length - 1]
        ? new Date(modelFechas.value[modelFechas.value.length - 1])
        : null

      const fechaFinFormateada = fechaFin
        ? `${fechaFin.getFullYear()}-${String(fechaFin.getMonth() + 1).padStart(2, '0')}-${String(fechaFin.getDate()).padStart(2, '0')}`
        : ''

      const data = {
        empresa: modelEmpresa.value,
        fechaInicio: fechaInicioFormateada,
        fechaFin: fechaFinFormateada,
      }

      try {
        await reporte.marcasRpt2(data)

        itemsMarcas.value = reporte.object.data
      } catch (error) {
      } finally {
      }
    }

    return {
      modelFechas,
      modelModo,
      itemsModos,
      modelEmpresa,
      itemsEmpresas,
      modelMarca,
      itemsMarcas,
      chartBarrasH,
      chartBarrasV,
      chartLineal,
      fetchExcel,
      fetchChartData,
      fetchMarcas,
      filtroItems,
      filtroModels,
      getCardHeight,
      getChartHeight,
      getMarcas,
      mergeProps,
      name,
      validarFiltros,
      vbrePrincipalItems,
      vbrePrincipalRef,
      vconPrincipalRef,
      vforFiltrosRef,
      vforFiltrosRule,
      vnavFiltrosIsOpen,
      vtabMenuItems,
      vtabGraficaRef,
      vtabGraficaSelected,
      smAndDown,
    }
  },
})
</script>
