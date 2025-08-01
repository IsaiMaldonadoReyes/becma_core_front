<template>
  <v-container ref="vconPrincipalRef" fluid style="height: 95% !important">
    <!-- vnavMenuFiltrosRef -->
    <v-navigation-drawer
      v-model="vbtnMenuFiltros"
      :width="350"
      location="right"
      style="border: none"
    >
      <v-card class="overflow-auto mt-3 mx-3" border elevation="0" height="calc(100% - 20px)">
        <v-form ref="vforFiltrosRef">
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <bec-autocomplete
                  v-model="modelEmpresa"
                  :item-subtitle="(item) => `${item.nombre_base}`"
                  :item-title="'nombre_empresa'"
                  :item-value="'id'"
                  :items="itemsEmpresas"
                  :label="'Empresa'"
                  :multiple="false"
                  :prepend-icon="'mdi-home-city'"
                  :return-object="false"
                  :rules="[vforFiltrosRule.required]"
                  :show-chips="true"
                  :tooltip="'Seleccione una Empresa para poder ver las opciones del campo Marca(s)'"
                />
              </v-col>
              <v-col cols="12">
                <bec-autocomplete
                  v-model="modelEmpresa"
                  :item-subtitle="(item) => `${item.nombre_base}`"
                  :item-title="'nombre_empresa'"
                  :item-value="'id'"
                  :items="itemsEmpresas"
                  :label="'Ejercicio'"
                  :multiple="false"
                  :prepend-icon="'mdi-calendar-month'"
                  :return-object="false"
                  :rules="[vforFiltrosRule.required]"
                  :show-chips="true"
                  :tooltip="'Seleccione una Empresa para poder ver las opciones del campo Marca(s)'"
                />
              </v-col>
              <v-col cols="12">
                <bec-autocomplete
                  v-model="modelEmpresa"
                  :item-title="'nombre_empresa'"
                  :item-value="'id'"
                  :items="itemsEmpresas"
                  :label="'Marca(s)'"
                  :multiple="true"
                  :prepend-icon="'mdi-shopping'"
                  :return-object="false"
                  :rules="[vforFiltrosRule.required]"
                  :show-chips="true"
                  :tooltip="'Seleccione una Empresa para poder ver las opciones del campo Marca(s)'"
                />
              </v-col>
              <v-col cols="12">
                <bec-autocomplete
                  v-model="modelEmpresa"
                  :item-title="'nombre_empresa'"
                  :item-value="'id'"
                  :items="itemsEmpresas"
                  :label="'Agente'"
                  :multiple="true"
                  :prepend-icon="'mdi-account-tie'"
                  :return-object="false"
                  :rules="[vforFiltrosRule.required]"
                  :show-chips="true"
                  :tooltip="'Seleccione una Empresa para poder ver las opciones del campo Marca(s)'"
                />
              </v-col>
              <v-col cols="12">
                <bec-autocomplete
                  v-model="modelEmpresa"
                  :item-title="'nombre_empresa'"
                  :item-value="'id'"
                  :items="itemsEmpresas"
                  :label="'Agente'"
                  :multiple="true"
                  :prepend-icon="'mdi-celendar'"
                  :return-object="false"
                  :rules="[vforFiltrosRule.required]"
                  :show-chips="true"
                  :tooltip="'Seleccione una Empresa para poder ver las opciones del campo Marca(s)'"
                />
              </v-col>
            </v-row>

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
              <!-- Gráfica -->
              <div v-if="tab.type === 'chart'" class="position-relative">
                <canvas :ref="tab.canvas" :style="getChartHeight" />

                <div
                  v-if="modelMarca.length === 0"
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

              <!-- Tabla -->
              <div v-else-if="tab.type === 'table'" class="pa-4">tabla</div>
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
  computed,
  defineComponent,
  mergeProps,
  nextTick,
  onBeforeUnmount,
  onMounted,
} from 'vue'

import { useDisplay } from 'vuetify'
import { Chart, type ChartData, type ChartOptions } from 'chart.js/auto'
import { Vue3Lottie } from 'vue3-lottie'
import { useSistemaStore } from '../../stores/modules/Core/sistema'
import { rpt2VentasPorMarcas } from '../../stores/modules/Comercial/rpt2VentasPorMarcas'
import BecAutocomplete from '@/components/core/becmaComponents/BecAutocomplete.vue'

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
  name: 'PresupuestosChart',
  components: { Vue3Lottie, BecAutocomplete },

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
        title: 'Presupuestos',
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
        type: 'chart',
      },
      {
        icon: 'mdi-chart-gantt',
        title: 'Horizontal',
        value: 'tabBarH',
        canvas: 'canvasChartBarH',
        type: 'chart',
      },
      {
        icon: 'mdi-chart-line',
        title: 'Lineal',
        value: 'tabLine',
        canvas: 'canvasChartLine',
        type: 'chart',
      },
      {
        icon: 'mdi-bullseye-arrow',
        title: 'Estimación de presupuestos',
        value: 'tabTable',
        type: 'table',
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
