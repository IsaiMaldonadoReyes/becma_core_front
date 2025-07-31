<template>
  <v-container ref="vconPrincipalRef" fluid style="height: 95% !important">
    <!-- vrowBarraDeAccionesRef -->
    <v-row ref="vrowBarraDeAccionesRef">
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
            <v-icon icon="mdi-briefcase-account" color="primary" />
          </template>
        </v-breadcrumbs>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center justify-end overflow-auto">
        <v-divider class="mr-5 my-2 border-opacity-50" vertical />

        <!-- vbtnCargar -->
        <v-tooltip bottom color="primary" interactive>
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
        <v-tooltip bottom color="primary" interactive>
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
        <v-tooltip bottom color="primary" interactive>
          <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
              v-bind="mergeProps(tooltipProps)"
              class="mr-1"
              color="primary"
              disabled
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
        <v-tooltip bottom color="primary" interactive>
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
        <v-tooltip bottom color="primary" interactive>
          <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
              v-bind="mergeProps(tooltipProps)"
              class="mr-1"
              color="primary"
              disabled
              height="40px"
              min-width="40px"
              width="40px"
              @click.stop="vbtnActivarRegistro = !vbtnActivarRegistro"
            >
              <v-icon color="white" size="24px">
                {{ vbtnActivarRegistro ? 'mdi-checkbox-blank-outline' : 'mdi-checkbox-marked' }}
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
        <v-tooltip bottom color="primary" interactive>
          <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
              v-bind="mergeProps(tooltipProps)"
              color="primary"
              height="40px"
              min-width="40px"
              width="40px"
              :to="'/nominas/gape/empresaForm'"
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
          v-model="modelEmpresa"
          :item-title="'nombre_empresa'"
          :item-value="'id'"
          :items="itemsEmpresas"
          :label="'Cliente'"
          :multiple="false"
          :prepend-icon="'mdi-account-box'"
          :return-object="false"
          :rules="[vforFiltrosRule.required]"
          :tooltip="'Ruta del archivo de la base de datos de la empresa del cliente.'"
        />
      </v-col>
      <v-col cols="12" lg="3" class="d-flex align-start justify-end">
        <!--v-switch
          v-model="vswiFiscal"
          false-icon="mdi-bank-off"
          hide-details
          inset
          true-icon="mdi-bank"
          :label="vswiFiscal ? 'Empresa fiscal' : 'Empresa no fiscal'"
          class="text-medium-emphasis"
          density="compact"
        /-->
        <bec-select
          v-model="vswiFiscal"
          :items="[
            { title: 'Empresa fiscal', value: true },
            { title: 'Empresa no fiscal', value: false },
          ]"
          :item-title="'title'"
          :item-value="'value'"
          :label="'Tipo de empresa'"
          :multiple="false"
          :placeholder="'Seleccione'"
          :prepend-icon="'mdi-briefcase-account'"
          :rules="[(v) => !!v || 'Este campo es requerido']"
          :tooltip="'Es el % de retención que se tiene que se tiene que realizar a en la nómina fiscal, sobre sueldo o percepción bruta a los trabajadores agremiados.'"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="my-0 py-0"><v-divider class="border-opacity-25 ma-0 pa-0" /></v-col>
    </v-row>

    <!-- vtabMenuRef -->
    <v-row ref="vtabMenuRef">
      <v-col class="my-0 py-0">
        <v-tabs v-model="vtabMenuModel" class="text-medium-emphasis" color="primary" grow>
          <v-tab
            prepend-icon="mdi-bank"
            value="tab01"
            class="text-none text-no-wrap"
            style="letter-spacing: 0.5px"
            :disabled="vswiFiscal ? false : true"
            variant="tonal"
          >
            Fiscal
          </v-tab>
          <v-tab
            prepend-icon="mdi-bank-off"
            value="tab02"
            class="text-none text-no-wrap"
            style="letter-spacing: 0.5px"
            :disabled="!vswiFiscal ? false : true"
          >
            No fiscal
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="my-0 py-0"><v-divider class="border-opacity-25 ma-0 pa-0" /></v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-tabs-window v-model="vtabMenuModel">
          <v-tabs-window-item value="tab01" eager>
            <div class="d-lg-flex flex-lg-row" style="height: 100%">
              <v-tabs
                v-model="tabEmpresa"
                class="text-medium-emphasis tab-right border"
                color="primary"
                :direction="smAndDown ? 'horizontal' : 'vertical'"
                align-tabs="center"
                border
                width="100px"
                show-arrows
              >
                <v-tab
                  prepend-icon="mdi-account"
                  text="Datos generales"
                  value="option-1"
                  class="text-none text-no-wrap"
                  style="letter-spacing: 0.5px"
                  :variant="tabEmpresa == 'option-1' ? 'tonal' : 'text'"
                  min-width="100%"
                ></v-tab>
                <v-tab
                  prepend-icon="mdi-bank"
                  text="Bancos"
                  value="option-2"
                  class="text-none"
                  style="letter-spacing: 0.5px"
                  :variant="tabEmpresa == 'option-2' ? 'tonal' : 'text'"
                  min-width="100%"
                ></v-tab>
              </v-tabs>
              <div class="flex-lg-grow-1 overflow-auto ml-2" :style="getCardHeight">
                <v-tabs-window v-model="tabEmpresa" :mobile="smAndDown">
                  <v-tabs-window-item value="option-1">
                    <v-row>
                      <v-col>
                        <v-divider class="border-opacity-25 ma-0 pa-0" />
                        <v-card-title color="primary" class="text-primary text-body-1">
                          Datos generales de la empresa
                        </v-card-title>
                        <v-divider class="border-opacity-25 ma-0 pa-0" />
                      </v-col>
                    </v-row>
                    <v-row class="mt-1">
                      <v-col cols="12">
                        <bec-autocomplete
                          v-model="modelEmpresa"
                          :item-title="'nombre_empresa'"
                          :item-value="'id'"
                          :items="itemsEmpresas"
                          :label="'Empresa CONTAPQi Nóminas'"
                          :multiple="false"
                          :prepend-icon="'mdi-briefcase-account'"
                          :return-object="false"
                          :rules="[vforFiltrosRule.required]"
                          :tooltip="'Ruta del archivo de la base de datos de la empresa del cliente.'"
                        />
                      </v-col>
                      <v-col cols="12">
                        <bec-text-field
                          v-model="modelSueldoIMSS"
                          :label="'Razón Social'"
                          :prepend-icon="'mdi-briefcase-account'"
                          :rules="[(v) => !!v || 'Este campo es requerido']"
                          :tooltip="'Porcentaje de comisión que se le cobrará al cliente'"
                        />
                      </v-col>
                      <v-col cols="12">
                        <bec-text-field
                          v-model="modelSueldoIMSS"
                          :label="'RFC'"
                          :prepend-icon="'mdi-briefcase-account'"
                          :rules="[(v) => !!v || 'Este campo es requerido']"
                          :tooltip="'Porcentaje de comisión que se le cobrará al cliente'"
                        />
                      </v-col>
                      <v-col cols="12" lg="6" md="12">
                        <bec-text-field
                          v-model="modelSueldoIMSS"
                          :label="'Correo asignado para notificaciones'"
                          :prepend-icon="'mdi-email'"
                          :rules="[(v) => !!v || 'Este campo es requerido']"
                          :tooltip="'Porcentaje de comisión que se le cobrará al cliente'"
                        />
                      </v-col>
                      <v-col cols="12" lg="6" md="12">
                        <bec-text-field
                          v-model="modelSueldoIMSS"
                          :label="'Código interno'"
                          :prepend-icon="'mdi-barcode'"
                          :rules="[(v) => !!v || 'Este campo es requerido']"
                          :tooltip="'Porcentaje de comisión que se le cobrará al cliente'"
                        />
                      </v-col>
                    </v-row>
                  </v-tabs-window-item>
                  <v-tabs-window-item value="option-2">
                    <v-row>
                      <v-col>
                        <v-divider class="border-opacity-25 ma-0 pa-0" />
                        <v-card-title color="primary" class="text-primary text-body-1">
                          Configuración de bancos para layouts de dispersión
                        </v-card-title>
                        <v-divider class="border-opacity-25 ma-0 pa-0" />
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col>
                        <v-data-table
                          :headers="headers2"
                          :items="movies"
                          item-value="title"
                          hide-default-footer
                          :mobile="smAndDown"
                          :hover="true"
                          show-select
                        >
                          <template
                            v-slot:header.data-table-select="{
                              allSelected,
                              selectAll,
                              someSelected,
                            }"
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
                            v-slot:item.data-table-select="{
                              internalItem,
                              isSelected,
                              toggleSelect,
                            }"
                          >
                            <v-checkbox-btn
                              :model-value="isSelected(internalItem)"
                              color="primary"
                              @update:model-value="toggleSelect(internalItem)"
                            />
                          </template>

                          <template v-slot:item.clasePrimaRiesgo="{ item }">
                            <div @mousedown.stop>
                              <v-text-field
                                v-model="item.cuenta"
                                variant="underlined"
                                clearable
                                clear-icon="mdi-close"
                                density="compact"
                                hide-details
                                :placeholder="'0.00'"
                                class="text-end"
                                color="primary"
                              />
                            </div>
                          </template>
                          <template v-slot:item.valorPrimaRiesgo="{ item }">
                            <v-data-table
                              hide-default-footer
                              v-model="item.cuentasDeOrigen"
                              item-value="cuenta"
                              :headers="encabezadoCuentaOrigen"
                              :hover="true"
                              :items="item.cuentasDeOrigen"
                              eager
                              color="transparent"
                              no-data-text="Sin cuentas de origen"
                            >
                              <template v-slot:header.eliminar>
                                <v-btn
                                  class="mr-1"
                                  color="primary"
                                  height="24px"
                                  min-width="24px"
                                  width="24px"
                                  size="x-small"
                                  variant="elevated"
                                  @click="agregarFila(item)"
                                >
                                  <v-icon color="white" icon="mdi-plus" />
                                </v-btn>
                              </template>
                              <template v-slot:header.cuenta> Cuenta </template>
                              <!-- solo sobrescribes la columna 'nombre' -->
                              <template v-slot:item.cuenta="{ item }">
                                <v-text-field
                                  v-model="item.cuenta"
                                  variant="underlined"
                                  clearable
                                  clear-icon="mdi-close"
                                  density="compact"
                                  hide-details
                                  :placeholder="'0.00'"
                                  class="text-end"
                                  color="primary"
                                />
                              </template>
                              <template v-slot:item.eliminar="{ item }">
                                <v-tooltip interactive>
                                  <template v-slot:activator="{ props: tooltipProps }">
                                    <v-btn
                                      v-bind="mergeProps(tooltipProps)"
                                      class="mr-1"
                                      color="primary"
                                      height="24px"
                                      min-width="24px"
                                      width="24px"
                                      size="x-small"
                                      variant="elevated"
                                    >
                                      <v-icon color="white" icon="mdi-delete" />
                                    </v-btn>
                                  </template>
                                  <span> Eliminar </span>
                                </v-tooltip>
                              </template>
                            </v-data-table>
                          </template>
                        </v-data-table>
                      </v-col>
                    </v-row>
                  </v-tabs-window-item>
                </v-tabs-window>
              </div>
            </div>
          </v-tabs-window-item>
          <v-tabs-window-item value="tab02" eager>
            <v-row class="mt-1">
              <v-col cols="12">
                <bec-autocomplete
                  v-model="modelEmpresa"
                  :item-title="'nombre_empresa'"
                  :item-value="'id'"
                  :items="itemsEmpresas"
                  :label="'Empresa CONTAPQi Nóminas'"
                  :multiple="false"
                  :prepend-icon="'mdi-briefcase-account'"
                  :return-object="false"
                  :rules="[vforFiltrosRule.required]"
                  :tooltip="'Ruta del archivo de la base de datos de la empresa del cliente.'"
                />
              </v-col>
              <v-col cols="12">
                <bec-text-field
                  v-model="modelSueldoIMSS"
                  :label="'Razón Social'"
                  :prepend-icon="'mdi-briefcase-account'"
                  :rules="[(v) => !!v || 'Este campo es requerido']"
                  :tooltip="'Porcentaje de comisión que se le cobrará al cliente'"
                />
              </v-col>
              <v-col cols="12">
                <bec-text-field
                  v-model="modelSueldoIMSS"
                  :label="'RFC'"
                  :prepend-icon="'mdi-briefcase-account'"
                  :rules="[(v) => !!v || 'Este campo es requerido']"
                  :tooltip="'Porcentaje de comisión que se le cobrará al cliente'"
                />
              </v-col>
              <v-col cols="12" lg="6" md="12">
                <bec-text-field
                  v-model="modelSueldoIMSS"
                  :label="'Correo asignado para notificaciones'"
                  :prepend-icon="'mdi-email'"
                  :rules="[(v) => !!v || 'Este campo es requerido']"
                  :tooltip="'Porcentaje de comisión que se le cobrará al cliente'"
                />
              </v-col>
              <v-col cols="12" lg="6" md="12">
                <bec-text-field
                  v-model="modelSueldoIMSS"
                  :label="'Código interno'"
                  :prepend-icon="'mdi-barcode'"
                  :rules="[(v) => !!v || 'Este campo es requerido']"
                  :tooltip="'Porcentaje de comisión que se le cobrará al cliente'"
                />
              </v-col>
            </v-row>
          </v-tabs-window-item>
        </v-tabs-window>
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
  watch,
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
  name: 'EmpresaForm',
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
        href: 'breadcrumbs_dashboard',
        title: 'Empresa',
      },
      {
        disabled: false,
        href: 'breadcrumbs_link_1',
        title: 'Formulario',
      },
    ])

    const vconPrincipalRef = ref()
    const vrowFiltrosRef = ref()
    const vbtnActivarRegistro = ref(true)

    const vtabMenuRef = ref()
    const vtabMenuModel = ref<any>('tab01')
    const vtabMenuItems = ref([
      {
        icon: 'mdi-bank',
        title: 'Fiscal',
        value: 'tab01',
      },
      {
        icon: 'mdi-bank-off',
        title: 'No fiscal',
        value: 'tab02',
      },
    ])

    const tabEmpresa = ref('option-1')

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

    const camposTab1 = ref([
      {
        ayuda: 'Primero selecciona el campo <b><i>Cliente</i></b> para habilitar esta opción.',
        etiqueta: 'Perioricidad',
        icono: 'mdi-information-slab-circle-outline',
        items: itemsPerioricidad.value,
        model: modelPerioricidad,
        placeholder: '',
        tipo: 'select',
      },

      {
        ayuda:
          'Es el sueldo mensual y en cuota diaria bruto, con el cual esta dado de alta el colaborador ante el IMSS.',
        etiqueta: 'Sueldo IMSS',
        icono: 'mdi-hospital',
        items: itemsComprobacion.value,
        model: modelSueldoIMSS,
        placeholder: '',
        tipo: 'select',
      },
      {
        ayuda: 'Prov. Soc',
        etiqueta: 'Prov. Soc.',
        icono: 'mdi-account-injury',
        items: itemsComprobacion.value,
        model: modelProvSoc,
        placeholder: '',
        tipo: 'select',
      },
      {
        ayuda: 'Tarjeta fácil',
        etiqueta: 'Tarjeta fácil',
        icono: 'mdi-information-slab-circle-outline',
        items: itemsComprobacion.value,
        model: modelProvSoc,
        placeholder: '',
        tipo: 'select',
      },
      {
        ayuda: 'Hon. Asimilados',
        etiqueta: 'Hon. Asimilados',
        icono: 'mdi-account-hard-hat',
        items: itemsComprobacion.value,
        model: modelProvSoc,
        placeholder: '',
        tipo: 'select',
      },
      {
        ayuda: 'Gastos por comprobar',
        etiqueta: 'Gastos por comprobar',
        icono: 'mdi-account-file-text',
        items: itemsComprobacion.value,
        model: modelProvSoc,
        placeholder: '',
        tipo: 'select',
      },
      {
        ayuda: 'Clase de Prima de Riesgo',
        etiqueta: 'Clase de Prima de Riesgo',
        icono: 'mdi-account-key',
        items: itemsClasePrimaRiesgo.value,
        model: modelProvSoc,
        placeholder: '',
        tipo: 'select',
      },
    ])

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
      { title: '', key: 'drag', sortable: false, align: 'end' },
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
          vrowFiltrosRef.value.$el.clientHeight -
          vtabMenuRef.value.$el.clientHeight -
          15
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
        title: 'Banco',
        key: 'perioricidad',
        sortable: false,
      },
      {
        title: 'Clave de banco ID',
        key: 'clasePrimaRiesgo',
        sortable: false,
        align: 'center',
      },
      {
        title: 'Cuenta de origen',
        key: 'valorPrimaRiesgo',
        sortable: false,
        align: 'center',
      },
    ])

    const movies = ref([
      {
        perioricidad: 'Fondeadora',
        cuentasDeOrigen: [{ cuenta: '1000000000' }, { cuenta: '2020202020' }],
      },
      {
        perioricidad: 'Azteca Interbancario',
        cuentasDeOrigen: [],
      },
      {
        perioricidad: 'Azteca bancario',
        cuentasDeOrigen: [],
      },
      {
        perioricidad: 'Banorte de terceros',
        cuentasDeOrigen: [],
      },
    ])

    const vswiFiscal = ref(true)
    watch(
      vswiFiscal,
      (nuevoValor) => {
        vtabMenuModel.value = nuevoValor ? 'tab01' : 'tab02'
      },
      { immediate: true },
    )
    const encabezadoCuentaOrigen = ref<
      {
        key: string
        align?: 'start' | 'center' | 'end'
        title: string
        sortable?: boolean
        width?: string
      }[]
    >([
      { title: 'Cuenta origen', key: 'cuenta', sortable: false, align: 'center', width: '90%' },
      { title: '', key: 'eliminar', sortable: false, align: 'end' },
    ])

    const itemsCuentaOrigen = ref([{ cuenta: '001850255586' }, { cuenta: '001850255586' }])
    const agregarFila = (item: any) => {
      if (!Array.isArray(item.cuentasDeOrigen)) {
        item.cuentasDeOrigen = []
      }
      item.cuentasDeOrigen.push({ cuenta: '' })
    }

    return {
      tabEmpresa,
      agregarFila,
      encabezadoCuentaOrigen,
      itemsCuentaOrigen,
      vswiFiscal,
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
      camposTab1,
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
      vbtnActivarRegistro,
      vconPrincipalRef,
      vforFiltrosRef,
      vforFiltrosRule,
      vrowFiltrosRef,
      vtabMenuItems,
      vtabMenuModel,
      vtabMenuRef,
    }
  },
})
</script>
<style scoped>
.draggable-row {
  cursor: grab;
}
</style>
