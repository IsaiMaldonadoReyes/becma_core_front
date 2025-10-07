<template>
  <v-container ref="vconPrincipalRef" fluid style="height: 95% !important">
    <!-- vnavMenuFiltrosRef -->
    <v-navigation-drawer v-model="drawerVisible" :width="350" location="right" style="border: none">
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
                  :onModelUpdate="fetchEjercicios"
                  :prepend-icon="'mdi-home-city'"
                  :return-object="false"
                  :rules="[vforFiltrosRule.required]"
                  :show-chips="true"
                  :tooltip="'Seleccione una Empresa para poder ver las opciones del campo Marca(s)'"
                />
              </v-col>
              <v-col cols="12">
                <bec-autocomplete
                  v-model="modelEjercicio"
                  :disabled="!modelEmpresa ? true : false"
                  :item-title="'cejercicio'"
                  :item-value="'cidejercicio'"
                  :items="itemsEjercicios"
                  :label="'Ejercicios'"
                  :multiple="false"
                  :onModelUpdate="fetchMarcas"
                  :prepend-icon="'mdi-calendar-month'"
                  :return-object="true"
                  :rules="[vforFiltrosRule.required]"
                  :show-chips="true"
                  :tooltip="'Seleccione ejercicio'"
                />
              </v-col>
              <v-col cols="12">
                <bec-autocomplete
                  v-model="modelMarca"
                  :disabled="!modelEjercicio ? true : false"
                  :hideSelected="true"
                  :item-title="'marca'"
                  :item-value="'id_marca'"
                  :items="itemsMarcas"
                  :label="'Marca(s)'"
                  :multiple="true"
                  :onModelUpdate="fetchAgentes"
                  :prepend-icon="'mdi-shopping'"
                  :return-object="true"
                  :rules="[vforFiltrosRule.required]"
                  :show-chips="true"
                  :tooltip="'Seleccione una Empresa para poder ver las opciones del campo Marca(s)'"
                />
              </v-col>
              <v-col cols="12">
                <bec-autocomplete
                  v-model="modelAgente"
                  :disabled="!modelEjercicio ? true : false"
                  :item-title="'CNOMBREAGENTE'"
                  :item-value="'CIDAGENTE'"
                  :items="itemsAgentes"
                  :label="'Agente'"
                  :multiple="false"
                  :prepend-icon="'mdi-account-tie'"
                  :return-object="false"
                  :rules="[vforFiltrosRule.required]"
                  :show-chips="true"
                  :tooltip="'Seleccione una Empresa para poder ver las opciones del campo Marca(s)'"
                />
              </v-col>
              <v-col cols="12">
                <bec-select
                  v-model="modelPeriodoInicial"
                  :disabled="!modelAgente ? true : false"
                  :item-title="'label'"
                  :item-value="'index'"
                  :items="itemsPeriodos"
                  :label="'Periodo inicial'"
                  :multiple="false"
                  :onModelUpdate="validateRangoPeriodos"
                  :placeholder="'Seleccione'"
                  :prepend-icon="'mdi-calendar-clock'"
                  :return-object="true"
                  :rules="[vforFiltrosRule.required]"
                  :show-chips="true"
                  :tooltip="'Este es un campo dependiente selecciones primero el cliente para mostrar los Tipos de periodos'"
                />
              </v-col>
              <v-col cols="12">
                <bec-select
                  v-model="modelPeriodoFinal"
                  :disabled="!modelAgente ? true : false"
                  :item-title="'label'"
                  :item-value="'value'"
                  :items="itemsPeriodos"
                  :label="'Periodo final'"
                  :multiple="false"
                  :onModelUpdate="fetchChartData"
                  :placeholder="'Seleccione'"
                  :prepend-icon="'mdi-calendar-clock'"
                  :return-object="true"
                  :rules="[vforFiltrosRule.required]"
                  :show-chips="true"
                  :tooltip="'Este es un campo dependiente selecciones primero el cliente para mostrar los Tipos de periodos'"
                />
              </v-col>
            </v-row>
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
        <v-tooltip bottom color="primary">
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
        <v-tooltip bottom color="primary">
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
        <v-tooltip bottom color="primary">
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
              <!-- Chart -->
              <div v-if="tab.type === 'chart'" class="position-relative">
                <canvas :ref="tab.canvas" :style="getChartHeight" />

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

              <!-- Table -->
              <div v-else-if="tab.type === 'table'">
                <v-row>
                  <v-col cols="12" lg="11">
                    <v-row>
                      <v-col cols="12" lg="6">
                        <bec-autocomplete
                          :item-subtitle="(item) => `${item.nombre_base}`"
                          :item-title="'nombre_empresa'"
                          :item-value="'id'"
                          :items="itemsEmpresas"
                          :label="'Empresas'"
                          :multiple="false"
                          :prepend-icon="'mdi-home-city'"
                          :return-object="false"
                          :rules="[vforFiltrosRule.required]"
                          :show-chips="true"
                          :tooltip="'Seleccione una Empresa para poder ver las opciones del campo Marca(s)'"
                        />
                      </v-col>
                      <v-col cols="12" lg="6">
                        <bec-autocomplete
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
                      <v-col cols="12" lg="6">
                        <bec-autocomplete
                          :item-subtitle="(item) => `${item.nombre_base}`"
                          :item-title="'cvalorclasificacion'"
                          :item-value="'id'"
                          :label="'Ejercicio'"
                          :multiple="false"
                          :prepend-icon="'mdi-calendar-month'"
                          :return-object="false"
                          :rules="[vforFiltrosRule.required]"
                          :show-chips="true"
                          :tooltip="'Seleccione una Empresa para poder ver las opciones del campo Marca(s)'"
                        />
                      </v-col>
                      <v-col cols="12" lg="6">
                        <bec-autocomplete
                          :item-title="'nombre_empresa'"
                          :item-value="'id'"
                          :label="'Marca'"
                          :multiple="true"
                          :prepend-icon="'mdi-shopping'"
                          :return-object="false"
                          :rules="[vforFiltrosRule.required]"
                          :show-chips="true"
                          :tooltip="'Seleccione una Empresa para poder ver las opciones del campo Marca(s)'"
                        />
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" lg="1" class="d-flex align-center justify-center">
                    <v-row>
                      <v-col class="d-flex align-center justify-center">
                        <!-- vbtnMenuFiltros -->
                        <v-tooltip bottom color="primary">
                          <template v-slot:activator="{ props }">
                            <v-btn
                              v-bind="props"
                              color="primary"
                              height="40px"
                              min-width="40px"
                              width="40px"
                            >
                              <v-icon size="24px" color="white" icon="mdi-plus" />
                            </v-btn>
                          </template>
                          <span>Crear nuevo registro</span>
                        </v-tooltip>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-data-table
                      :headers="vdtbPrincipalEncabezados"
                      :hover="true"
                      :mobile="smAndDown"
                      :multi-sort="true"
                      :sticky="true"
                      item-value="codigo"
                      show-select
                      sort-asc-icon="mdi-arrow-down-thin"
                      sort-desc-icon="mdi-arrow-up-thin"
                      fixed-header
                      eager
                    >
                      <template
                        v-slot:header.data-table-select="{ allSelected, selectAll, someSelected }"
                      >
                        <v-btn-group
                          class="border-opacity-25"
                          color="primary"
                          density="compact"
                          divided
                          variant="outlined"
                        >
                          <v-btn density="compact" stacked class="pa-2" style="min-width: auto">
                            <v-tooltip>
                              <template v-slot:activator="{ props: tooltip }">
                                <v-checkbox-btn
                                  v-bind="mergeProps(tooltip)"
                                  :indeterminate="someSelected && !allSelected"
                                  :model-value="allSelected"
                                  density="compact"
                                  true-icon="mdi-checkbox-multiple-marked"
                                  @update:model-value="selectAll(!allSelected)"
                                  class="pa-0"
                                />
                              </template>
                              <span>Seleccionar todo</span>
                            </v-tooltip>
                          </v-btn>
                        </v-btn-group>
                      </template>
                      <template
                        v-slot:item.data-table-select="{ internalItem, isSelected, toggleSelect }"
                      >
                        <v-checkbox-btn
                          :model-value="isSelected(internalItem)"
                          color="primary"
                          @update:model-value="toggleSelect(internalItem)"
                        />
                      </template>

                      <template v-slot:item.acciones="{ item }">
                        <v-tooltip interactive>
                          <template v-slot:activator="{ props: tooltipProps }">
                            <v-btn
                              v-bind="mergeProps(tooltipProps)"
                              class="mr-1"
                              color="primary"
                              height="36px"
                              min-width="36px"
                              width="36px"
                              variant="elevated"
                            >
                              <v-icon size="small" color="white" icon="mdi-pencil" />
                            </v-btn>
                          </template>
                          <span> Editar <b></b> </span>
                        </v-tooltip>
                      </template>
                      <template v-slot:no-data>
                        <v-card
                          border
                          class="ma-5 d-flex align-center justify-center"
                          color="transparent"
                          elevation="0"
                        >
                          <v-card-text class="text-grey-darken-1">
                            <v-icon color="grey-lighten-1" size="60" icon="mdi-selection-search" />
                            <span>No se encontraron registros.</span>
                          </v-card-text>
                        </v-card>
                      </template>
                      <template v-slot:bottom>
                        <v-divider class="border-opacity-25 ma-0 pa-0" />
                        <v-pagination
                          :total-visible="smAndDown ? 3 : 20"
                          active-color="primary"
                          class="pt-2"
                          color="primary"
                          density="comfortable"
                          show-first-last-page
                          variant="elevated"
                        />
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
              </div>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card>
      </v-col>
    </v-row>

    <presupuestos-modal-chart
      :dialog-view="dialogPresupuestosChartPropiedades.dialog"
      :dialog-title="dialogPresupuestosChartPropiedades.titulo"
      :dialog-parametros="dialogPresupuestosChartPropiedades.parametros"
      @close="onCloseDialogCliente"
      @cancel="onCloseDialogCliente"
    />
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

import { useSistemaStore } from '@/stores/modules/Core/sistema'
import { useDialogManagerStore } from '@/stores/modules/Core/dialog'
import { rptPresupuestos } from '@/stores/modules/Comercial/rptPresupuestos'

import BecSelect from '@/components/core/becmaComponents/BecSelect.vue'
import BecAutocomplete from '@/components/core/becmaComponents/BecAutocomplete.vue'

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// import views
import PresupuestosModalChart from '@/views/comercial/PresupuestosModalChart.vue'

interface Empresa {
  id: number
  nombre_empresa: string
  nombre_base: string
}

interface Marca {
  id_marca: number
  marca: string
}

interface Modo {
  subtitle: string
  title: string
  value: string
}

interface Ejercicio {
  cidejercicio: string
  cejercicio: string
}

interface Agente {
  cidagente: string
  cnombreagente: string
}

export default defineComponent({
  name: 'PresupuestosChart',
  components: { Vue3Lottie, BecAutocomplete, BecSelect, PresupuestosModalChart },

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

    // 3. Composables | Store
    const dialogStore = useDialogManagerStore()

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

    // 4. Reactive | ChartJs con Canvas
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
          const marca = chart.data.datasets[datasetIndex]
          const label = chart.data.labels?.[index] as string
          const legend = chart.legend?.legendItems?.[0].text ?? ''

          const labelParts = label.split(' - ')
          const valorMarca = labelParts[0] // "URREA"

          const data = {
            empresa: modelEmpresa.value,
            ejercicio: modelEjercicio.value?.cidejercicio,
            agente: modelAgente.value,
            marca: valorMarca,
            periodo: label,
          }

          //alert(`Hiciste clic en: ${legend}: ${label} con valor ${value}`)

          dialogPresupuestosChartPropiedades.value.dialog = true
          dialogPresupuestosChartPropiedades.value.titulo = legend
          dialogPresupuestosChartPropiedades.value.parametros = data
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
    const modelEmpresa = ref<Empresa>()
    const itemsEmpresas = ref<Empresa[]>([])

    const modelEjercicio = ref<Ejercicio | null>(null)
    const itemsEjercicios = ref<Ejercicio[]>([])

    const modelMarca = ref<Marca[]>([])
    const itemsMarcas = ref<Marca[]>([])

    const modelAgente = ref<string | null>(null)
    const itemsAgentes = ref<Agente[]>([])

    const modelPeriodoInicial = ref<{ label: string; code: string; index: number } | null>(null)

    const modelPeriodoFinal = ref<{ label: string; code: string; index: number } | null>(null)

    const itemsPeriodos = [
      { code: '01', label: 'Enero', index: 1 },
      { code: '02', label: 'Febrero', index: 2 },
      { code: '03', label: 'Marzo', index: 3 },
      { code: '04', label: 'Abril', index: 4 },
      { code: '05', label: 'Mayo', index: 5 },
      { code: '06', label: 'Junio', index: 6 },
      { code: '07', label: 'Julio', index: 7 },
      { code: '08', label: 'Agosto', index: 8 },
      { code: '09', label: 'Septiembre', index: 9 },
      { code: '10', label: 'Octubre', index: 10 },
      { code: '11', label: 'Noviembre', index: 11 },
      { code: '12', label: 'Diciembre', index: 12 },
    ]

    const vforFiltrosRef = ref()
    const vforFiltrosRule = {
      required: (v: string) => !!v || 'Este dato es requerido para continuar.',
      required2: (v: any) => (v != null && String(v).length > 0) || 'Selecciona',
    }

    // 4. Reactive | stores
    const exportStore = useSistemaStore()
    const reporte = rptPresupuestos()

    // 4. Reactive | modal chart

    const dialogPresupuestosChartPropiedades = ref({
      dialog: false,
      titulo: '',
      parametros: {},
    })

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

    // 5. Computes | menu
    const drawerVisible = computed({
      get: () => vtabMenuModel.value !== 'tabTable' && vbtnMenuFiltros.value,
      set: (val) => {
        if (vtabMenuModel.value !== 'tabTable') {
          vbtnMenuFiltros.value = val
        }
      },
    })

    // 6. Watch

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
        const periodoInicial =
          modelEjercicio.value?.cejercicio + '-' + modelPeriodoInicial.value?.code

        const periodoFinal = modelEjercicio.value?.cejercicio + '-' + modelPeriodoFinal.value?.code

        const months = getRangoMeses(
          modelPeriodoInicial.value?.index,
          modelPeriodoFinal.value?.index,
        )

        const data = {
          empresa: modelEmpresa.value,
          ejercicio: modelEjercicio.value?.cidejercicio,
          agente: modelAgente.value,
          marcas: modelMarca.value.map((m: any) => m.id_marca).join(', '),
          periodoInicial: periodoInicial,
          periodoFinal: periodoFinal,
        }

        try {
          await reporte.storeData(data)
          const dataset = reporte.dataset

          let index = 0

          let datasets = dataset.map((concepto: any) => {
            const data = months.map(
              (mes: any) => parseFloat(concepto[mes.label.toLowerCase()]) || 0,
            )

            const color = getNextColor(index++)
            return {
              label: concepto.marca + '-' + concepto.tipo,
              data: data,
              backgroundColor: color,
              borderColor: color,
              stack: 'stack_' + concepto.marca, // Agrupar por stack si es necesario
            }
          })

          instanceChartBarV.data = {
            labels: months.map((m) => m.label),
            datasets: datasets,
          }

          instanceChartBarV.update()

          instanceChartBarH.data = {
            labels: months.map((m) => m.label),
            datasets: datasets,
          }

          instanceChartBarH.update()

          instanceChartLine.data = {
            labels: months.map((m) => m.label),
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
        await reporte.storeEmpresas()
        itemsEmpresas.value = reporte.resultEmpresas.data
      } catch (error) {
      } finally {
      }
    }

    const fetchEjercicios = async () => {
      modelEjercicio.value = null
      itemsEjercicios.value = []
      try {
        const data = {
          empresa: modelEmpresa.value,
        }

        await reporte.storeEjercicios(data)
        itemsEjercicios.value = reporte.resultEjercicios.data
      } catch (error) {
        console.error('Error al cargar ejercicio:', error)
      } finally {
      }
    }

    const fetchMarcas = async () => {
      modelMarca.value = []
      itemsMarcas.value = []
      try {
        const data = {
          empresa: modelEmpresa.value,
          ejercicio: modelEjercicio.value?.cidejercicio,
        }

        await reporte.storeMarcas(data)
        itemsMarcas.value = reporte.resultMarcas.data
      } catch (error) {
        console.error('Error al cargar ejercicio:', error)
      } finally {
      }
    }

    const fetchAgentes = async () => {
      modelAgente.value = null
      itemsAgentes.value = []
      try {
        const data = {
          empresa: modelEmpresa.value,
          ejercicio: modelEjercicio.value?.cidejercicio,
        }

        await reporte.storeAgentes(data)
        itemsAgentes.value = reporte.resultAgentes.data
      } catch (error) {
        console.error('Error al cargar ejercicio:', error)
      } finally {
      }
    }

    const onCloseDialogCliente = () => {
      dialogPresupuestosChartPropiedades.value.dialog = false
    }

    const onOpenDialogPresupuestosChart = (evento: string, items: object, titulo: string) => {
      dialogPresupuestosChartPropiedades.value.dialog = true
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

    const getRangoMeses = (inicio?: number, fin?: number) => {
      if (!inicio || !fin) return []
      return itemsPeriodos.filter((item) => item.index >= inicio && item.index <= fin)
    }

    const validateRangoPeriodos = () => {
      const inicio = modelPeriodoInicial?.value
      const fin = modelPeriodoFinal?.value

      // Solo validar si ambos tienen valor
      if (inicio != null && fin != null) {
        if (inicio > fin) {
          dialogStore.onOpenDialogInformation(
            'El período inicial debe ser menor que el período final',
            'Rango de período inválido',
            'alert',
            '#285697',
            1,
          )
          modelPeriodoFinal.value = null
          return false
        }
      }

      return true
    }

    // Metodos
    const validarFiltros = async () => {
      await vforFiltrosRef.value?.validate()
    }

    const vdtbPrincipalEncabezados = ref<
      {
        key: string
        align?: 'start' | 'center' | 'end'
        sortable?: boolean
        title: string
      }[]
    >([
      {
        key: 'marca',
        align: 'start',
        sortable: true,
        title: 'Marca',
      },
      {
        key: 'ene',
        align: 'center',
        sortable: true,
        title: 'Ene',
      },
      {
        key: 'feb',
        align: 'center',
        sortable: true,
        title: 'Feb',
      },
      {
        key: 'mar',
        align: 'center',
        sortable: true,
        title: 'Mar',
      },
      {
        key: 'abr',
        align: 'center',
        sortable: true,
        title: 'Abr',
      },
      {
        key: 'may',
        align: 'center',
        sortable: true,
        title: 'May',
      },
      {
        key: 'jun',
        align: 'center',
        sortable: true,
        title: 'Jun',
      },
      {
        key: 'jul',
        align: 'center',
        sortable: true,
        title: 'Jul',
      },
      {
        key: 'ago',
        align: 'center',
        sortable: true,
        title: 'Ago',
      },
      {
        key: 'sep',
        align: 'center',
        sortable: true,
        title: 'Sep',
      },
      {
        key: 'oct',
        align: 'center',
        sortable: true,
        title: 'Oct',
      },
      {
        key: 'nov',
        align: 'center',
        sortable: true,
        title: 'Nov',
      },
      {
        key: 'dic',
        align: 'center',
        sortable: true,
        title: 'Dic',
      },
    ])

    return {
      drawerVisible,
      dialogPresupuestosChartPropiedades,
      onCloseDialogCliente,
      canvasChartBarH,
      canvasChartBarV,
      canvasChartLine,
      validateRangoPeriodos,
      fetchExcel,
      fetchEjercicios,
      fetchMarcas,
      fetchAgentes,
      fetchChartData,
      getChartHeight,
      getRowContenidoHeight,
      itemsEmpresas,
      itemsEjercicios,
      itemsMarcas,
      itemsAgentes,
      itemsPeriodos,
      mergeProps,
      modelEmpresa,
      modelEjercicio,
      modelMarca,
      modelAgente,
      modelPeriodoInicial,
      modelPeriodoFinal,
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
      vdtbPrincipalEncabezados,
    }
  },
})
</script>
