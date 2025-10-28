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
    <v-row ref="vrowFiltrosRef">
      <v-col cols="12" lg="9">
        <bec-autocomplete
          v-model="dataModel.id_nomina_gape_cliente"
          :disabled="btnDisabled.compCliente"
          :item-subtitle="(item) => `${item.codigo}`"
          :item-title="'nombre'"
          :item-value="'id'"
          :items="itemsClientesNomina"
          :label="'Cliente *'"
          :multiple="false"
          :prepend-icon="'mdi-account-box'"
          :return-object="false"
          :show-chips="false"
          @update:model-value="buscarEmpresasNomina"
        >
          <template #tooltip>
            <v-card color="transparent" elevation="0" class="pa-3">
              <v-row>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <v-icon class="mr-1" color="white" icon="mdi-account-box" />
                </v-col>
                <v-col cols="11">
                  Es necesario configurar la parametrización para la prenómina para cada una de las
                  empresas de cada cliente.<br />
                  Seleccione primero el cliente para después elegir la empresa a la que desea
                  configurar su parametrización.
                </v-col>
              </v-row>
            </v-card>
          </template>
        </bec-autocomplete>
      </v-col>
      <v-col cols="12" lg="3" class="d-flex align-start justify-end">
        <bec-select
          :clearable="false"
          :item-title="'title'"
          :item-value="'value'"
          :items="[
            { title: 'Empresa fiscal', value: true },
            { title: 'Empresa no fiscal', value: false },
          ]"
          :label="'Tipo de empresa'"
          :multiple="false"
          :placeholder="'Seleccione'"
          :prepend-icon="'mdi-briefcase-account'"
        >
          <template #tooltip>
            <v-card color="transparent" elevation="0" class="pa-3">
              <v-row>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <v-icon class="mr-1" color="white" icon="mdi-briefcase-account" />
                </v-col>
                <v-col cols="11">
                  Seleccione el tipo de empresa (fiscal o no fiscal) para mostrar únicamente las
                  empresas correspondientes.
                </v-col>
              </v-row>
              <v-divider class="border-opacity-50 my-2 mx-2" />
              <v-row>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <v-icon class="mr-1" color="white" icon="mdi-cursor-default-click" />
                </v-col>
                <v-col cols="11">
                  <span style="font-weight: bold">Campo dependiente:</span>
                  debe seleccionar primero el <b style="color: #2a73c5">TIPO DE EMPRESA</b> para
                  poder habilitar el campo y mostrar las empresas correcpondientes.
                </v-col>
              </v-row>
            </v-card>
          </template>
        </bec-select>
      </v-col>
      <v-col cols="12" lg="9">
        <bec-autocomplete
          v-model="dataModel.id_nomina_gape_cliente"
          :disabled="btnDisabled.compCliente"
          :item-subtitle="(item) => `${item.codigo}`"
          :item-title="'nombre'"
          :item-value="'id'"
          :items="itemsClientesNomina"
          :label="'Empresa *'"
          :multiple="false"
          :prepend-icon="'mdi-briefcase-account'"
          :return-object="false"
          :show-chips="false"
          @update:model-value="buscarEmpresasNomina"
        >
          <template #tooltip>
            <v-card color="transparent" elevation="0" class="pa-3 border-opacity-50">
              <v-row>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <v-icon class="mr-1" color="white" icon="mdi-briefcase-account" />
                </v-col>
                <v-col cols="11">
                  Seleccione primero el tipo de empresa (fiscal o no fiscal) para mostrar únicamente
                  las empresas correspondientes.
                </v-col>
              </v-row>
              <v-divider class="border-opacity-50 my-2 mx-2" />
              <v-row>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <v-icon class="mr-1" color="white" icon="mdi-file-rotate-left" />
                </v-col>
                <v-col cols="11">
                  <span style="font-weight: bold; color: #2a73c5">Campo relacionado:</span>
                  debe seleccionar <b style="color: #2a73c5"><i>TIPO DE EMPRESA</i></b> para poder
                  habilitar este campo y mostrar las empresas correspondientes.
                </v-col>
              </v-row>
            </v-card>
          </template>
        </bec-autocomplete>
      </v-col>
      <v-col cols="12" lg="3" class="d-flex align-start justify-end">
        <bec-select
          :clearable="false"
          :item-title="'title'"
          :item-value="'value'"
          :items="[
            { title: 'Empresa fiscal', value: true },
            { title: 'Empresa no fiscal', value: false },
          ]"
          :label="'Tipo de periodo'"
          :multiple="false"
          :placeholder="'Seleccione'"
          :prepend-icon="'mdi-calendar-range'"
        >
          <template #tooltip>
            <v-card color="transparent" elevation="0" class="pa-3">
              <v-row>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <v-icon class="mr-1" color="white" icon="mdi-calendar-range" />
                </v-col>
                <v-col cols="11">
                  Elija el tipo de empresa que desea registrar: <br />
                  - Fiscal: la información será considerada para procesos fiscales.
                  <br />
                  - No fiscal: se usa para registros sin efectos fiscales.
                </v-col>
              </v-row>
              <v-divider class="border-opacity-50 my-2 mx-2" />
              <v-row>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <v-icon class="mr-1" color="white" icon="mdi-alert" />
                </v-col>
                <v-col cols="11">
                  <span style="font-weight: bold">Nota:</span>
                  antes de crear una nueva empresa, seleccione el tipo de empresa que desea
                  registrar.
                </v-col>
              </v-row>
            </v-card>
          </template>
        </bec-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="my-0 py-0">
        <v-divider class="border-opacity-25 ma-0 pa-0" />
      </v-col>
    </v-row>

    <v-row class="overflow-auto" :style="getCardHeight">
      <v-col cols="12" lg="6">
        <v-card-title color="primary" class="text-primary text-body-1">
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
          <template v-slot:header.data-table-select="{ allSelected, selectAll, someSelected }">
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
          <template v-slot:item.data-table-select="{ internalItem, isSelected, toggleSelect }">
            <v-checkbox-btn
              :model-value="isSelected(internalItem)"
              color="primary"
              @update:model-value="toggleSelect(internalItem)"
            />
          </template>
          <template v-slot:item.seleccionado="{ item }">
            <v-chip
              :color="itemsSeleccionados.some((i) => i === item.concepto) ? 'primary' : 'grey'"
              size="small"
              label
              variant="flat"
            >
              {{
                itemsSeleccionados.some((i) => i === item.concepto) ? 'Habilitado' : 'Inhabilitado'
              }}
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
        <v-card-title color="primary" class="text-primary text-body-1">
          Parametrización
        </v-card-title>
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

// import composables
import { useEmpresaModel } from '@/composables/nomina/gape/useEmpresa'
import { useEmpresasStore } from '@/stores/modules/Core/empresas'

// import stores
import { useClienteStore } from '@/stores/modules/Nomina/gape/Cliente'
import { useDialogManagerStore } from '@/stores/modules/Core/dialog'

// import utils

// import components
import BecAutocomplete from '@/components/core/becmaComponents/BecAutocomplete.vue'
import BecSelect from '@/components/core/becmaComponents/BecSelect.vue'
import BecTextField from '@/components/core/becmaComponents/BecTextField.vue'

// import router

// import views

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
    const clienteStore = useClienteStore()
    const empresasStore = useEmpresasStore()
    const { dataModel, setEmpresa, resetModel, resetModelEmpresa } = useEmpresaModel()
    const dialogConfirmation = useDialogManagerStore()

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
    const vrowFiltrosRef = ref()

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

    const btnDisabled = ref({
      importarRegistros: true,
      descargarFormato: true,
      eliminarRegistros: true,
      guardarCambios: false,
      activarRegistro: true,
      crearRegistro: true,

      tabDatosGenerales: true,
      tabBancos: true,

      tabNoFisDatosGenerales: true,
      tabNoFisBancos: true,

      compTipoEmp: false,
      compCliente: false,
      compEmpresa: false,
      compRazonSocial: true,
      compRfc: true,
      compCorreo: false,
      compCodigo: false,
      compNoFisRazonSocial: false,
      compNoFisRfc: false,
      compNoFisCorreo: false,
      compNoFisCodigo: false,
    })

    // 5. Computed properties
    const getCardHeight = computed(() => {
      if (vconPrincipalRef.value) {
        calcularDimensiones()
      }
      return { height: `${cardHeight.value}px !important` }
    })

    const itemsClientesNomina = computed(() => clienteStore.clientes)

    // 7. Lifecycle hooks (onMounted, mounted)
    onMounted(async () => {
      nextTick(() => {
        window.addEventListener('resize', calcularDimensiones)
        fetchEmpresas()
      })

      await fetchClientes()
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
          vrowFiltrosRef.value.$el.clientHeight
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

    const fetchEmpresas = async () => {
      try {
        await reporte.rptEmpresas()

        itemsEmpresas2.value = reporte.empresas.data

        console.log(itemsEmpresas2.value)
      } catch (error) {
      } finally {
      }
    }

    const fetchClientes = async () => {
      try {
        await clienteStore.catalogoCliente()
      } catch (error) {
        console.error('Error al cargar empresas nómina:', error)
      }
    }

    const fetchEmpresasNominaPorCliente = async (idCliente: any) => {
      try {
        await empresasStore.empresasNominasPorCliente(idCliente)
      } catch (error) {
        console.error('Error al cargar catálogos por empresa:', error)
      }
    }

    const buscarEmpresasNomina = async (codigo: number) => {
      resetModel(true)

      await fetchEmpresasNominaPorCliente(codigo)
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

    return {
      buscarEmpresasNomina,
      btnDisabled,
      dataModel,
      itemsPerioricidad,
      itemsClientesNomina,
      modelGastosPorComprobar,
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
      vrowFiltrosRef,
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
