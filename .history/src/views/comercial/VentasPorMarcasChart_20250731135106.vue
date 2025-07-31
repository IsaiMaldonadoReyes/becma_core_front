<template>
  <v-container ref="vconPrincipalRef" fluid style="height: 95% !important">
    <!-- vnavMenuFiltrosRef -->
    <v-navigation-drawer
      v-model="vbtnMenuFiltros"
      :width="350"
      location="right"
      style="border: none"
    >
      <v-card class="overflow-auto mt-3 mr-3" border elevation="0" height="calc(100% - 20px)">
        <v-form ref="vforFiltrosRef">
          <v-card-text>
            <v-autocomplete
              v-model="modelEmpresa"
              :disabled="false"
              :items="itemsEmpresas"
              :rules="[vforFiltrosRule.required]"
              auto-select-first
              chips
              clear-icon="mdi-close"
              clear-on-select
              clearable
              closable-chips
              color="primary"
              filter-mode="every"
              item-color="primary"
              item-props
              item-title="nombre"
              item-value="id"
              label="Empresa"
              no-data-text="No hay información disponible"
              placeholder="Seleccione una Empresa"
              prepend-inner-icon="mdi-home-city"
              variant="outlined"
              density="compact"
            >
              <template v-slot:chip="{ props, item }">
                <v-chip
                  v-bind="props"
                  :text="item.raw.nombre_empresa"
                  color="primary"
                  variant="flat"
                />
              </template>

              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :subtitle="item.raw.nombre_base"
                  :title="item.raw.nombre_empresa"
                />
              </template>

              <template v-slot:prepend>
                <v-tooltip>
                  <template v-slot:activator="{ props: tooltip }">
                    <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                  </template>
                  <span>
                    Seleccione una Empresa para poder ver las opciones del campo Marca(s)
                  </span>
                </v-tooltip>
              </template>
            </v-autocomplete>
            <v-locale-provider locale="es-MX">
              <v-date-input
                v-model="modelFechas"
                :disabled="!modelEmpresa ? true : false"
                :mobile="smAndDown"
                :rules="[vforFiltrosRule.required]"
                clear-icon="mdi-close"
                clearable
                color="primary"
                density="compact"
                label="Rango de fechas"
                multiple="range"
                prepend-icon=""
                prepend-inner-icon="mdi-calendar"
                title="Rango de fechas"
                type="chip"
                variant="outlined"
                @update:model-value="fetchMarcas"
              >
                <template v-slot:prepend>
                  <v-icon icon="mdi-information-outline" />
                </template>
              </v-date-input>
            </v-locale-provider>
            <v-autocomplete
              v-model="modelMarca"
              :disabled="!modelFechas ? true : false"
              :items="itemsMarcas"
              chips
              clear-icon="mdi-close"
              clearable
              closable-chips
              color="primary"
              density="compact"
              item-color="primary"
              item-title="cvalorclasificacion"
              label="Marca(s)"
              multiple
              no-data-text="No hay información disponible"
              prepend-inner-icon="mdi-shopping"
              return-object
              variant="outlined"
              @click="validarFiltros"
              @update:modelValue="fetchChartData"
            >
              <template v-slot:chip="{ props, item }">
                <v-chip
                  v-bind="props"
                  :text="item.raw.cvalorclasificacion"
                  color="primary"
                  variant="flat"
                />
              </template>

              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :subtitle="item.raw.cidvalorclasificacion"
                  :title="item.raw.cvalorclasificacion"
                />
              </template>

              <template v-slot:prepend>
                <v-tooltip>
                  <template v-slot:activator="{ props: tooltip }">
                    <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                  </template>
                  <span>
                    Seleccione una Empresa para poder mostrar las opciones del campo Marca(s)
                  </span>
                </v-tooltip>
              </template>
            </v-autocomplete>
            <v-list
              v-model:selected="modelModo"
              class="text-medium-emphasis"
              color="primary"
              lines="three"
              select-strategy="single-independent"
            >
              <v-list-subheader>Mostrar por</v-list-subheader>
              <v-list-item
                v-for="item in itemsModos"
                :key="item.value"
                :subtitle="item.subtitle"
                :title="item.title"
                :value="item.value"
                class="py-0"
              >
                <template v-slot:prepend="{ isSelected }">
                  <v-list-item-action start>
                    <v-checkbox
                      v-model="modelModo"
                      :rules="[vforFiltrosRule.required2]"
                      :value="item.value"
                      :checked="isSelected"
                      @update:modelValue="fetchChartData"
                      color="primary"
                    />
                  </v-list-item-action>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-form>
      </v-card>
    </v-navigation-drawer>

    <!-- vrowBarraDeAccionesRef -->
    <v-row ref="vrowBarraDeAccionesRef">
      <v-col cols="12" md="6" class="d-flex align-center">
        <v-breadcrumbs :items="vbrePrincipalItems" divider="|" class="text-medium-emphasis">
          <template v-slot:prepend>
            <v-icon icon="mdi-chart-bar" color="primary" />
          </template>
        </v-breadcrumbs>
      </v-col>

      <v-col cols="12" md="6" class="d-flex align-center justify-end overflow-auto">
        <v-divider vertical class="mr-5 my-2 border-opacity-25"></v-divider>

        <!-- vbtnDescargarExcel -->
        <v-tooltip bottom color="primary" interactive>
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              class="mr-1"
              color="primary"
              height="40px"
              min-width="40px"
              width="40px"
              @click="fetchExcel"
            >
              <v-icon color="white" icon="mdi-microsoft-excel" size="24px" />
            </v-btn>
          </template>
          <span>Exportar información a .xlsx</span>
        </v-tooltip>

        <!-- vbtnDescargarPdf -->
        <v-tooltip bottom color="primary" interactive>
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              min-width="40px"
              width="40px"
              height="40px"
              class="mr-1"
              v-bind="props"
            >
              <v-icon size="24px" color="white">mdi-file-pdf-box</v-icon>
            </v-btn>
          </template>
          <span>Exportar gráfica a .pdf</span>
        </v-tooltip>

        <!-- vbtnMenuFiltros -->
        <v-tooltip bottom color="primary" interactive>
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              color="primary"
              height="40px"
              min-width="40px"
              width="40px"
              @click.stop="vbtnMenuFiltros = !vbtnMenuFiltros"
            >
              <v-icon size="24px" color="white">
                {{ vbtnMenuFiltros ? 'mdi-filter-menu' : 'mdi-filter' }}
              </v-icon>
            </v-btn>
          </template>
          <span>
            {{ vbtnMenuFiltros ? 'Cerrar panel de filtros' : 'Abrir panel de filtros' }}
          </span>
        </v-tooltip>
      </v-col>
    </v-row>

    <!-- vrowTabMenuRef -->
    <v-row ref="vrowTabMenuRef">
      <v-col class="my-0 py-0">
        <v-tabs v-model="vtabMenuModel" color="primary" class="text-medium-emphasis border rounded">
          <v-tab
            v-for="tab in vtabGraficaItems"
            :key="tab.value"
            :value="tab.value"
            :variant="vtabMenuModel == tab.value ? 'tonal' : 'text'"
          >
            <v-icon left>{{ tab.icon }}</v-icon>
            {{ tab.title }}
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <!-- vrowContenidoRef -->
    <v-row>
      <v-col>
        <v-card elevation="0" border class="pa-5 overflow-auto" :style="getRowContenidoHeight">
          <v-tabs-window v-model="vtabMenuModel">
            <v-tabs-window-item
              v-for="(tab, index) in vtabGraficaItems"
              :key="index"
              :value="tab.value"
              eager
            >
              <canvas :ref="tab.canvas" :style="getChartHeight"></canvas>

              <div
                v-if="modelMarca.length === 0"
                class="d-flex align-center justify-center position-absolute"
                :style="{
                  top: 0,
                  left: 0,
                  width: '100%',
                  ...getChartHeight,
                  backgroundColor: 'rgb(255, 255, 255)',
                  textAlign: 'center',
                  zIndex: 10,
                }"
              >
                <vue3-lottie
                  width="100%"
                  :animation-link="'/src/assets/images/no_data_animation.json'"
                />
              </div>
            </v-tabs-window-item>
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

import { Vue3Lottie } from 'vue3-lottie'

import { useSistemaStore } from '../../stores/modules/Core/sistema'
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

export default defineComponent({
  name: 'VentasPorMarcasChart',
  components: { Vue3Lottie },

  setup() {
    // 1. Imports
    // 2. Props y Emits
    // 3. Composables (funciones reusables)
    // 4. Reactive
    // 5. Computed properties
    // 6. Watchers
    // 7. Lifecycle hooks (onMounted, mounted)
    // 8. Functions (fetch, metodos, async)

    // 3. Composables | Vuetify
    const { name, mobile, smAndDown } = useDisplay()

    // 4. Reactive | vconPrincipalRef
    const vconPrincipalRef = ref()

    // 4. Reactive | vrowBarraDeAccionesRef
    const vrowBarraDeAccionesRef = ref()
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
    const vbtnMenuFiltros = ref(true)

    // 4. Reactive | vrowTabMenuRef
    const vrowTabMenuRef = ref()

    const vtabMenuModel = ref<any>('tabBarV')

    // 4. Reactive  | vrowContenidoRef
    const vtabGraficaItems = ref([
      {
        icon: 'mdi-chart-bar',
        title: 'Barras',
        value: 'tabBarV',
        canvas: 'canvasChartBarV',
      },
      {
        icon: 'mdi-chart-gantt',
        title: 'Horizontal',
        value: 'tabBarH',
        canvas: 'canvasChartBarH',
      },
      {
        icon: 'mdi-chart-line',
        title: 'Lineal',
        value: 'tabLine',
        canvas: 'canvasChartLine',
      },
    ])

    const canvasChartBarV = ref<HTMLCanvasElement | null>(null)
    const canvasChartBarH = ref<HTMLCanvasElement | null>(null)
    const canvasChartLine = ref<HTMLCanvasElement | null>(null)

    let instanceChartBarV: Chart
    let instanceChartBarH: Chart
    let instanceChartLine: Chart

    const chartData = ref<ChartData>({
      labels: [],
      datasets: [],
    })

    let delayed = false
    const optionsChartBarV: ChartOptions = {
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
    const optionsChartBarH: ChartOptions = {
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

    // 4. Reactive | vnavMenuFiltrosRef
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

    const vforFiltrosRef = ref()
    const vforFiltrosRule = {
      required: (v: string) => !!v || 'Este dato es requerido para continuar.',
      required2: (v: any) => (v != null && String(v).length > 0) || 'Selecciona',
    }

    // 4. Reactive | stores
    const exportStore = useSistemaStore()
    const reporte = rpt2VentasPorMarcas()

    // 5. Computed | vrowContenidoRef
    const getRowContenidoHeight = computed(() => {
      const alto = ref(0)
      if (vconPrincipalRef.value) {
        alto.value =
          vconPrincipalRef.value.$el.clientHeight -
          vrowBarraDeAccionesRef.value.$el.clientHeight -
          vrowTabMenuRef.value.$el.clientHeight -
          5
      }
      return { height: `${alto.value}px !important` }
    })

    const getChartHeight = computed(() => {
      const alto = ref(0)
      if (vconPrincipalRef.value) {
        alto.value =
          vconPrincipalRef.value.$el.clientHeight -
          vrowBarraDeAccionesRef.value.$el.clientHeight -
          vrowTabMenuRef.value.$el.clientHeight -
          60
      }
      return { height: `${alto.value}px !important` }
    })

    // 7. Lifecycle hooks | onMounted, onBeforeUnmount
    onMounted(() => {
      nextTick(() => {
        if (canvasChartBarV.value) {
          instanceChartBarV = new Chart(canvasChartBarV.value, {
            type: 'bar',
            data: chartData.value,
            options: optionsChartBarV,
          })
        }

        if (canvasChartBarH.value) {
          instanceChartBarH = new Chart(canvasChartBarH.value, {
            type: 'bar',
            data: chartData.value,
            options: optionsChartBarH,
          })
        }

        if (canvasChartLine.value) {
          instanceChartLine = new Chart(canvasChartLine.value, {
            type: 'line',
            data: chartData.value,
            options: optionsChartLine,
          })
        }

        fetchEmpresas()
      })
    })

    onBeforeUnmount(() => {
      if (instanceChartBarV) instanceChartBarV.destroy()
      if (instanceChartBarH) instanceChartBarH.destroy()
      if (instanceChartLine) instanceChartLine.destroy()
    })

    // 8. Functions (fetch, metodos, async)

    const fetchChartData = async () => {
      const isValidForm = await vforFiltrosRef.value?.validate()

      if (isValidForm.valid) {
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

          instanceChartBarV.data = {
            labels: months,
            datasets: datasets,
          }

          instanceChartBarV.update()

          instanceChartBarH.data = {
            labels: months,
            datasets: datasets,
          }

          instanceChartBarH.update()

          instanceChartLine.data = {
            labels: months,
            datasets: datasets,
          }

          instanceChartLine.update()
        } catch (error) {
        } finally {
        }
      }
    }

    const fetchExcel = async () => {
      // Obtener los legends (nombres de los datasets) y agregar un primer elemento vacío
      const legends = ['', ...instanceChartBarV.data.datasets.map((ds) => ds.label as string)]

      // Obtener los labels (eje X) de la gráfica
      const labels = instanceChartBarV.data.labels as string[]

      // Inicializar la matriz con la primera fila de legends
      const transformedData: (string | number)[][] = [legends]

      // Recorrer los labels y construir cada fila
      for (let i = 0; i < labels.length; i++) {
        const row: (string | number)[] = [labels[i]] // Primer elemento de la fila es el label (Q1, Q2...)

        // Agregar los datos correspondientes de cada dataset en esta posición
        for (let j = 0; j < instanceChartBarV.data.datasets.length; j++) {
          row.push(instanceChartBarV.data.datasets[j].data[i] as number)
        }

        // Agregar la fila a la matriz transformada
        transformedData.push(row)
      }

      const backgroundColors = instanceChartBarV.data.datasets.map((ds) => ds.backgroundColor)

      const data = {
        info: transformedData,
        colors: backgroundColors.map((color) => (color as string).replace('#', '')),
        tipo: vtabMenuModel.value,
      }

      await exportStore.fetchExcel(data)
    }

    const fetchEmpresas = async () => {
      try {
        await reporte.rptEmpresas()

        itemsEmpresas.value = reporte.empresas.data

        console.log(itemsEmpresas.value)
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

    return {
      canvasChartBarH,
      canvasChartBarV,
      canvasChartLine,
      fetchChartData,
      fetchExcel,
      fetchMarcas,
      getChartHeight,
      getRowContenidoHeight,
      itemsEmpresas,
      itemsMarcas,
      itemsModos,
      mergeProps,
      modelEmpresa,
      modelFechas,
      modelMarca,
      modelModo,
      name,
      smAndDown,
      validarFiltros,
      vbrePrincipalItems,
      vbtnMenuFiltros,
      vconPrincipalRef,
      vforFiltrosRef,
      vforFiltrosRule,
      vrowBarraDeAccionesRef,
      vrowTabMenuRef,
      vtabGraficaItems,
      vtabMenuModel,
    }
  },
})
</script>
