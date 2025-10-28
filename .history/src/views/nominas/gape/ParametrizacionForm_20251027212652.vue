<template>
  <v-container ref="vconPrincipalRef" fluid style="height: 95% !important">
    <!--vrowBarraDeAccionesRef -->
    <v-row ref="vrowBarraDeAccionesRef" dense>
      <v-col cols="12" md="6" class="d-flex align-center">
        <v-tooltip interactive>
          <template v-slot:activator="{ props: tooltipProps }">
            <v-icon
              v-bind="mergeProps(tooltipProps)"
              icon="mdi-information-slab-circle-outline"
              size="20"
              class="text-medium-emphasis"
            />
          </template>
          <v-icon icon="mdi-calendar-clock" size="14" />
          <span style="font-size: 10px"> Fecha de creación: 02/04/2025 14:52:02</span>
          <br />
          <v-icon icon="mdi-account-circle" size="14" />
          <span style="font-size: 10px"> Creado por: Administrador</span>
          <br />
          <v-icon icon="mdi-calendar-clock" size="14" />
          <span style="font-size: 10px"> Última edición: 02/04/2025 14:52:02</span>
          <br />
          <v-icon icon="mdi-account-circle" size="14" />
          <span style="font-size: 10px"> Última edición por: Administrador 2</span>
        </v-tooltip>
        <v-breadcrumbs :items="vbrePrincipalItems" divider="|" class="text-medium-emphasis">
          <template v-slot:prepend>
            <v-icon icon="mdi-list-box" color="primary" />
          </template>
        </v-breadcrumbs>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center justify-end overflow-auto">
        <v-divider class="mr-5 my-2 border-opacity-50" vertical />
        <!-- vbtnCargar -->
        <v-tooltip bottom color="primary" interactive location="bottom">
          <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
              v-bind="mergeProps(tooltipProps)"
              class="mr-1"
              color="primary"
              height="40px"
              min-width="40px"
              width="40px"
            >
              <v-icon color="white" icon="mdi-upload" size="24px" />
            </v-btn>
          </template>
          <span>
            <v-icon icon="mdi-microsoft-excel" />
            Importar registros desde el formato Excel
          </span>
        </v-tooltip>

        <!-- vbtnDescargar -->
        <v-tooltip bottom color="primary" interactive location="bottom">
          <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
              v-bind="mergeProps(tooltipProps)"
              class="mr-1"
              color="primary"
              height="40px"
              min-width="40px"
              width="40px"
            >
              <v-icon color="white" icon="mdi-download" size="24px" />
            </v-btn>
          </template>
          <span>
            <v-icon icon="mdi-microsoft-excel" />
            Descargar el formato base de Excel para importación de registros
          </span>
        </v-tooltip>

        <!-- vbtnEliminar -->
        <v-tooltip bottom color="primary" interactive location="bottom">
          <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
              v-bind="mergeProps(tooltipProps)"
              class="mr-1"
              color="primary"
              height="40px"
              min-width="40px"
              width="40px"
            >
              <v-icon color="white" icon="mdi-delete" size="24px" />
            </v-btn>
          </template>
          <span>Eliminar</span>
        </v-tooltip>

        <!-- vbtnGuardar -->
        <v-tooltip bottom color="primary" interactive location="bottom">
          <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
              v-bind="mergeProps(tooltipProps)"
              class="mr-1"
              color="primary"
              height="40px"
              min-width="40px"
              width="40px"
            >
              <v-icon icon="mdi-floppy" color="white" size="24px" />
            </v-btn>
          </template>
          <span>Guardar</span>
        </v-tooltip>

        <!-- vbtnActivar -->
        <v-tooltip bottom color="primary" interactive location="bottom">
          <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
              v-bind="mergeProps(tooltipProps)"
              class="mr-1"
              color="primary"
              height="40px"
              min-width="40px"
              width="40px"
            >
              <v-icon color="white" size="24px">
                <!--{{ vbtnActivarRegistro ? 'mdi-checkbox-blank-outline' : 'mdi-checkbox-marked' }}-->
                mdi-checkbox-blank-outline
              </v-icon>
            </v-btn>
          </template>
          <span>
            Marque la casilla para
            <b>
              <i>
                {{ vbtnActivarRegistro ? ' ACTIVAR ' : 'DESACTIVAR' }}
              </i>
            </b>
            este registro
          </span>
        </v-tooltip>

        <!--vbtnCrear-->
        <v-tooltip bottom color="primary" interactive location="bottom">
          <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
              v-bind="mergeProps(tooltipProps)"
              color="primary"
              height="40px"
              min-width="40px"
              width="40px"
            >
              <v-icon color="white" icon="mdi-plus" size="24px" />
            </v-btn>
          </template>
          <span>Crear nuevo registro</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="my-0 py-0"><v-divider class="border-opacity-25 ma-0 pa-0" /></v-col>
    </v-row>

    <!-- vrowFiltrosRef -->
    <v-row ref="vrowClienteRef">
      <v-col cols="12" lg="6">
        <bec-autocomplete
          v-model="modelEmpresa2"
          :item-title="'nombre_empresa'"
          :item-value="'id'"
          :items="itemsEmpresas2"
          :label="'Cliente'"
          :multiple="false"
          :placeholder="'Seleccione'"
          :prepend-icon="'mdi-briefcase-account'"
          :return-object="false"
          :tooltip="'Ruta del archivo de la base de datos de la empresa del cliente.'"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="my-0 py-0">
        <v-divider class="border-opacity-25 ma-0 pa-0" />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="my-0 py-0"><v-divider class="border-opacity-25 ma-0 pa-0" /></v-col>
    </v-row>

    <v-row class="overflow-auto" :style="getCardHeight">
      <v-col>
        <v-card elevation="0" color="transparent">
          <v-card color="transparent">
            <v-card-text>
              <v-row>
                <v-col cols="12" lg="6">
                  <v-card-title class="text-medium-emphasis">
                    Conceptos alternativos de pago
                  </v-card-title>
                  <v-divider class="border-opacity-25 ma-0 pa-0" />
                  <v-data-table
                    hide-default-footer
                    v-model="itemsSeleccionados"
                    :headers="headers"
                    :hover="true"
                    :items="items"
                    :mobile="smAndDown"
                    eager
                    item-value="concepto"
                    show-select
                    color="transparent"
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
                    <template v-slot:item.seleccionado="{ item }">
                      <v-chip
                        :color="
                          itemsSeleccionados.some((i) => i === item.concepto) ? 'primary' : 'grey'
                        "
                        size="small"
                        label
                        variant="flat"
                      >
                        {{ itemsSeleccionados.some((i) => i === item.concepto) ? 'Sí' : 'No' }}
                      </v-chip>
                    </template>
                    <!-- solo sobrescribes la columna 'nombre' -->
                    <template v-slot:item.tope="{ item }">
                      <v-text-field
                        v-model="item.tope"
                        :placeholder="'0.00'"
                        class="text-end"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        density="compact"
                        hide-details
                        prefix="$"
                        variant="underlined"
                      />
                    </template>

                    <!-- sobrescribes la columna 'drag' -->
                    <template v-slot:item.drag="{ index }">
                      <v-icon
                        icon="mdi-drag"
                        color="primary"
                        class="draggable-row"
                        draggable="true"
                        @dragstart="onDragStart(index)"
                        @dragover.prevent
                        @drop="onDrop(index)"
                      />
                    </template>
                  </v-data-table>
                </v-col>
                <v-col cols="12" lg="6">
                  <v-card-title class="text-medium-emphasis"> Parametrización </v-card-title>
                  <v-divider class="border-opacity-25 ma-0 pa-0" />
                  <v-row class="mt-3">
                    <v-col cols="12">
                      <bec-select
                        v-model="modelSueldoIMSS"
                        :items="itemsClasePrimaRiesgo"
                        :label="'Clase de Prima de Riesgo'"
                        :multiple="false"
                        :placeholder="'Seleccione'"
                        :prepend-icon="'mdi-account-key'"
                        :tooltip="'Clase de Prima de Riesgo'"
                      />
                    </v-col>
                    <v-col v-if="modelSueldoIMSS === 1" cols="12">
                      <bec-text-field
                        v-model="modelSueldoIMSS"
                        :label="'Clae'"
                        :placeholder="'0.00'"
                        :prefix="'%'"
                        :prepend-icon="'mdi-account-key'"
                        :rules="[(v) => !!v || 'Este campo es requerido']"
                        :tooltip="'Porcentaje de comisión que se le cobrará al cliente'"
                      />
                    </v-col>
                    <v-col cols="12">
                      <bec-text-field
                        v-model="modelSueldoIMSS"
                        :label="'FEE'"
                        :placeholder="'0.00'"
                        :prefix="'%'"
                        :prepend-icon="'mdi-account-cash'"
                        :rules="[(v) => !!v || 'Este campo es requerido']"
                        :tooltip="'Porcentaje de comisión que se le cobrará al cliente'"
                      />
                    </v-col>
                    <v-col cols="12">
                      <bec-select
                        v-model="modelGastosPorComprobar"
                        :items="itemsBaseFEE"
                        :label="'Base FEE'"
                        :multiple="false"
                        :placeholder="'Seleccione'"
                        :prepend-icon="'mdi-account-cash'"
                        :rules="[(v) => !!v || 'Este campo es requerido']"
                        :tooltip="'Base FEE'"
                      />
                    </v-col>
                    <v-col cols="12">
                      <bec-select
                        v-model="modelGastosPorComprobar"
                        :items="itemsComprobacion"
                        :label="'Provisiones'"
                        :multiple="false"
                        :placeholder="'Seleccione'"
                        :prepend-icon="'mdi-hand-coin'"
                        :rules="[(v) => !!v || 'Este campo es requerido']"
                        :tooltip="'Son las provisiones de las prestaciones de ley como aguinaldo y prima vacacional que se tendrán que calcular e ir provisionado de acuerdo con cada periodo de pago, cuando aplique.'"
                      />
                    </v-col>
                    <v-col cols="12">
                      <bec-text-field
                        v-model="modelSueldoIMSS"
                        :label="'ISN'"
                        :placeholder="'0.00'"
                        :prefix="'%'"
                        :prepend-icon="'mdi-bank-transfer-out'"
                        :rules="[(v) => !!v || 'Este campo es requerido']"
                        :tooltip="'Se requiere reporte de ISN mensual.<br><br>Fecha creación: 01/02/2025 14:56<br>Fecha modificación: 01/02/2025 14:56'"
                      />
                    </v-col>
                    <v-col cols="12">
                      <bec-select
                        v-model="modelGastosPorComprobar"
                        :items="itemsComprobacion"
                        :label="'Cuota sindical'"
                        :multiple="false"
                        :placeholder="'Seleccione'"
                        :prepend-icon="'mdi-cash-refund'"
                        :rules="[(v) => !!v || 'Este campo es requerido']"
                        :tooltip="'Es el % de retención que se tiene que se tiene que realizar a en la nómina fiscal, sobre sueldo o percepción bruta a los trabajadores agremiados.'"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
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
  nextTick,
  onBeforeUnmount,
} from 'vue'

import BecSelect from '@/components/core/becmaComponents/BecSelect.vue'
import BecAutocomplete from '@/components/core/becmaComponents/BecAutocomplete.vue'
import BecTextField from '@/components/core/becmaComponents/BecTextField.vue'

import { useDisplay } from 'vuetify'
import { rpt2VentasPorMarcas } from '../../../stores/modules/Comercial/rpt2VentasPorMarcas'

interface Empresa {
  id: number
  nombre_empresa: string
  nombre_base: string
}

export default defineComponent({
  name: 'ParametrizacionForm',
  components: { BecSelect, BecAutocomplete, BecTextField },

  setup() {
    // 1. Imports
    // 2. Props y Emits
    // 3. Composables (funciones reusables de Vuetify)
    // 4. Reactive
    // 5. Computed properties
    // 6. Watchers
    // 7. Lifecycle hooks (onMounted, mounted)
    // 8. Functions (fetch, metodos, async)

    // 3. Composables (funciones reutilizables de Vuetify)
    const { name, mobile, smAndDown } = useDisplay()

    // 4. Reactive
    const vrowBarraDeAccionesRef = ref()
    const vbrePrincipalItems = ref([
      {
        disabled: false,
        href: '/nominas/gape/parametrizacionList',
        title: 'Parametrización',
      },
      {
        disabled: false,
        href: 'breadcrumbs_link_1',
        title: 'Fintopia',
      },
    ])

    const vconPrincipalRef = ref()
    const vrowClienteRef = ref()

    const vtabMenuModel = ref<any>('tab01')
    const vtabMenuItems = ref([
      {
        icon: 'mdi-badge-account-horizontal',
        title: 'Quincenal',
        value: 'tab01',
      },
      {
        icon: 'mdi-chart-line',
        title: 'Semanal',
        value: 'tab02',
      },
    ])

    const vbtnActivarModel = ref(true)
    const vbtnMenuExportarModel = ref(false)
    const cardHeight = ref(0)
    const rfc = ref<string>('')

    const modelEmpresa = ref<Object>()
    const itemsEmpresas = ref<Object[]>([])

    const modelSueldoIMSS = ref<number | null>(null)
    const modelProvSoc = ref<number | null>(null)
    const modelTarjetaFacil = ref<number | null>(null)
    const modelHonAsimilados = ref<number | null>(null)
    const modelGastosPorComprobar = ref<number | null>(null)
    const modelClasePrimaRiesgo = ref<number | null>(null)
    const modelPerioricidad = ref<number | null>(null)

    const itemsComprobacion = ref([
      { title: 'Si', value: 0 },
      { title: 'No', value: 1 },
    ])

    const itemsClasePrimaRiesgo = ref([
      { title: 'Media', value: 0 },
      { title: 'Actualizada', value: 1 },
    ])

    const itemsBaseFEE = ref([
      { title: 'Percepciones brutas', value: 0 },
      { title: 'Percepciones brutas más carca', value: 21 },
      { title: 'Neto', value: 2 },
      { title: 'Neto más carga social', value: 3 },
      { title: 'FEE Neto + Bruto + CS', value: 4 },
    ])

    // Este se obtiene de la base de datos campo dependiente
    const itemsPerioricidad = ref([
      { title: 'Quicenal', value: 0 },
      { title: 'Semanal', value: 1 },
    ])

    const vforFiltrosRef = ref()
    const vforFiltrosRule = {
      required: (v: string) => !!v || 'Este dato es requerido para continuar.',
      required2: (v: any) => (v != null && String(v).length > 0) || 'Selecciona',
    }

    const itemsEmpresas2 = ref<Empresa[]>([])
    const modelEmpresa2 = ref<Empresa>()

    const headers = ref<
      {
        key: string
        align?: 'start' | 'center' | 'end'
        title: string
        sortable?: boolean
        width?: string
      }[]
    >([
      { title: '', key: 'seleccionado', width: '5%', sortable: false },
      { title: 'Concepto', key: 'concepto', sortable: false },
      { title: 'Tope', key: 'tope', sortable: false },
      { title: '', key: 'drag', sortable: false, align: 'center' },
    ])

    const items = ref([
      { concepto: 'Sueldo IMSS', tope: '5000' },
      { concepto: 'Prev. Soc.', tope: '2000' },
      { concepto: 'Fondos Sind.', tope: '' },
      { concepto: 'Tarjeta Fácil', tope: '' },
      { concepto: 'Hon. Asimilados', tope: '' },
      { concepto: 'Gastos por comprobar', tope: '' },
    ])

    const itemsSeleccionados = ref(['Sueldo IMSS'])

    // 5. Computed properties
    const getCardHeight = computed(() => {
      if (vconPrincipalRef.value) {
        calcularDimensiones()
      }
      return { height: `${cardHeight.value}px !important` }
    })

    // 7. Lifecycle hooks (onMounted, mounted)
    onMounted(() => {
      nextTick(() => {
        window.addEventListener('resize', calcularDimensiones)
        fetchEmpresas()
      })
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', calcularDimensiones)
    })

    // 8. Functions (fetch, metodos, async)
    const validarFiltros = async () => {
      await vforFiltrosRef.value?.validate()
    }

    const calcularDimensiones = () => {
      if (vconPrincipalRef.value) {
        cardHeight.value =
          vconPrincipalRef.value.$el.clientHeight -
          vrowBarraDeAccionesRef.value.$el.clientHeight -
          vrowClienteRef.value.$el.clientHeight
      }
    }

    const validateRfc = (value: string): true | string => {
      if (!value) return 'El RFC es requerido'

      const rfcRegex =
        /^([A-ZÑ&]{3,4})(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[A-Z\d]{2}([A\d])$/

      return rfcRegex.test(value.toUpperCase()) ? true : 'RFC no válido'
    }

    const myCustomUpdate = (nuevoValor: any) => {
      //alert(nuevoValor);
      //alert(modelSueldoIMSS.value); //✅ ya está actualizado gracias al emit
    }

    const reporte = rpt2VentasPorMarcas()

    const fetchEmpresas = async () => {
      try {
        await reporte.rptEmpresas()

        itemsEmpresas2.value = reporte.empresas.data

        console.log(itemsEmpresas2.value)
      } catch (error) {
      } finally {
      }
    }

    let dragIndex = -1

    function onDragStart(index: number) {
      dragIndex = index
    }

    function onDrop(dropIndex: number) {
      if (dragIndex === -1 || dragIndex === dropIndex) return
      const moved = items.value.splice(dragIndex, 1)[0]
      items.value.splice(dropIndex, 0, moved)
      dragIndex = -1
    }

    const headers2 = ref<
      {
        key: string
        align?: 'start' | 'center' | 'end'
        title: string
        sortable?: boolean
        width?: string
      }[]
    >([
      {
        title: 'Perioricidad',
        key: 'perioricidad',
        align: 'center',
        sortable: false,
        width: '10%',
      },
      {
        title: 'Clase de Prima de riesgo',
        key: 'clasePrimaRiesgo',
        align: 'center',
        sortable: false,
        width: '15%',
      },
      {
        title: 'Valor de Prima de Riesgo',
        key: 'valorPrimaRiesgo',
        align: 'center',
        sortable: false,
        width: '15%',
      },
      { title: 'FEE', key: 'fee', align: 'center', sortable: false, width: '10%' },
      {
        title: 'BASE FEE',
        key: 'baseFee',
        align: 'center',
        sortable: false,
        width: '15%',
      },
      {
        title: 'Provisiones',
        key: 'provisiones',
        align: 'center',
        sortable: false,
        width: '10%',
      },
      {
        title: 'ISN',
        key: 'isn',
        align: 'center',
        sortable: false,
        width: '10%',
      },
      {
        title: 'Cuota sindical',
        key: 'cuotaSindical',
        align: 'center',
        sortable: false,
        width: '10%',
      },
    ])

    const movies = [
      {
        perioricidad: 'Quincenal',
        clasePrimaRiesgo: 0,
        director: 'Frank Darabont',
        year: 1994,
        runtime: 142,
        details: {
          synopsis:
            'Two imprisoned men bond over years, finding solace and redemption through acts of decency.',
          cast: ['Tim Robbins', 'Morgan Freeman'],
          rating: 3.5,
        },
      },
      {
        perioricidad: 'Semanal',
        clasePrimaRiesgo: 0,
        director: 'Christopher Nolan',
        genre: 'Sci-Fi',
        year: 2010,
        runtime: 148,
        details: {
          synopsis:
            'A thief with the ability to enter dreams is tasked with stealing a secret from the subconscious.',
          cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'],
          rating: 5,
        },
      },
      {
        perioricidad: 'Catorcenal',
        clasePrimaRiesgo: 0,
        director: 'Francis Ford Coppola',
        genre: 'Crime',
        year: 1972,
        runtime: 175,
        details: {
          synopsis:
            'The aging patriarch of a crime dynasty transfers control to his reluctant son.',
          cast: ['Marlon Brando', 'Al Pacino'],
          rating: 4.5,
        },
      },
    ]

    const encabezadoCuentaOrigen = ref<
      {
        key: string
        align?: 'start' | 'center' | 'end'
        title: string
        sortable?: boolean
        width?: string
      }[]
    >([
      { title: 'Cuenta origen', key: 'cuenta', sortable: false },
      { title: '', key: 'eliminar', sortable: false, align: 'end' },
    ])

    const itemsCuentaOrigen = ref([{ cuenta: '001850255586' }, { cuenta: '001850255586' }])

    return {
      encabezadoCuentaOrigen,
      itemsCuentaOrigen,
      modelGastosPorComprobar,
      headers2,
      movies,
      onDragStart,
      onDrop,
      headers,
      itemsSeleccionados,
      items,
      itemsEmpresas2,
      modelEmpresa2,
      myCustomUpdate,
      getCardHeight,
      itemsClasePrimaRiesgo,
      itemsComprobacion,
      itemsBaseFEE,
      itemsEmpresas,
      mergeProps,
      modelEmpresa,
      modelProvSoc,
      modelSueldoIMSS,
      modelPerioricidad,
      name,
      rfc,
      smAndDown,
      validarFiltros,
      validateRfc,
      vbrePrincipalItems,
      vrowBarraDeAccionesRef,
      vbtnActivarModel,
      vbtnMenuExportarModel,
      vconPrincipalRef,
      vforFiltrosRef,
      vforFiltrosRule,
      vrowClienteRef,
      vtabMenuItems,
      vtabMenuModel,
    }
  },
})
</script>
<style scoped>
.draggable-row {
  cursor: grab;
}
</style>
