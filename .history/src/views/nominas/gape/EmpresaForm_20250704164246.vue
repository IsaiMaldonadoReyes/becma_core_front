<template>
  <v-container ref="vconPrincipalRef" fluid style="height: 95% !important">
    <v-row ref="vbrePrincipalRef" dense>
      <v-col cols="12" md="6" class="d-flex align-center">
        <v-breadcrumbs :items="vbrePrincipalItems" divider="|" class="text-medium-emphasis">
          <template v-slot:prepend>
            <v-icon icon="mdi-briefcase-account" color="primary" />
          </template>
        </v-breadcrumbs>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center justify-end overflow-auto">
        <v-divider class="mr-5 my-2 border-opacity-50" vertical />
        <v-tooltip bottom color="primary" interactive>
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              class="mr-1"
              color="primary"
              disabled
              height="40px"
              min-width="40px"
              width="40px"
            >
              <v-icon size="20px" color="white">mdi-upload</v-icon>
            </v-btn>
          </template>
          <span>Importar / Subir</span>
        </v-tooltip>

        <v-menu v-model="vbtnMenuExportarModel" :close-on-content-click="false">
          <template v-slot:activator="{ props: vbtnMenuExportarModel }">
            <v-tooltip bottom color="primary" interactive>
              <template v-slot:activator="{ props: tooltip }">
                <v-btn
                  v-bind="mergeProps(vbtnMenuExportarModel, tooltip)"
                  class="mr-1"
                  color="primary"
                  disabled
                  height="40px"
                  min-width="40px"
                  width="40px"
                >
                  <v-icon size="20px" color="white">mdi-download</v-icon>
                </v-btn>
              </template>
              <span>Exportar / Descargar</span>
            </v-tooltip>
          </template>

          <v-card min-width="300">
            <v-list>
              <v-list-item
                class="py-3 border-b"
                color="primary"
                title="Descargar formato de importación"
                value="cuenta"
              >
                <template v-slot:prepend>
                  <v-icon icon="mdi-microsoft-excel" size="30" />
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>

        <v-tooltip bottom color="primary" interactive>
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              class="mr-1"
              color="primary"
              disabled
              height="40px"
              min-width="40px"
              width="40px"
            >
              <v-icon size="20px" color="white">mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>Eliminar</span>
        </v-tooltip>

        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              min-width="40px"
              width="40px"
              height="40px"
              v-bind="props"
              class="mr-1"
            >
              <v-icon size="20px" color="white">mdi-floppy</v-icon>
            </v-btn>
          </template>
          <span>Guardar</span>
        </v-tooltip>

        <v-tooltip bottom color="primary" interactive>
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              class="mr-1"
              color="primary"
              height="40px"
              min-width="40px"
              width="40px"
              @click.stop="vbtnActivarModel = !vbtnActivarModel"
            >
              <v-icon size="20px" color="white">
                {{ vbtnActivarModel ? 'mdi-checkbox-blank-outline' : 'mdi-checkbox-marked' }}
              </v-icon>
            </v-btn>
          </template>
          <span>
            Marque la casilla para
            <b>
              <i>
                {{ vbtnActivarModel ? ' ACTIVAR ' : 'DESACTIVAR' }}
              </i>
            </b>
            este registro
          </span>
        </v-tooltip>

        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" min-width="40px" width="40px" height="40px" v-bind="props">
              <v-icon size="20px" color="white">mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Agregar nuevo</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="my-0 py-0"><v-divider class="border-opacity-25 ma-0 pa-0" /></v-col>
    </v-row>

    <v-row>
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
        <v-switch
          v-model="vswiFiscal"
          false-icon="mdi-bank-off"
          hide-details
          inset
          true-icon="mdi-bank"
          :label="vswiFiscal ? 'Empresa fiscal' : 'Empresa no fiscal'"
          class="text-medium-emphasis"
          density="compact"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="my-0 py-0"><v-divider class="border-opacity-25 ma-0 pa-0" /></v-col>
    </v-row>

    <v-row ref="vtabMenuRef">
      <v-col class="my-0 py-0">
        <v-tabs v-model="vtabMenuModel" class="text-medium-emphasis" color="primary" grow>
          <v-tab
            prepend-icon="mdi-bank"
            value="tab01"
            class="text-none text-no-wrap"
            style="letter-spacing: 0.5px"
            :disabled="vswiFiscal ? false : true"
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

    <v-row class="overflow-auto">
      <v-col>
        <v-card elevation="0" color="transparent">
          <v-tabs-window v-model="vtabMenuModel">
            <v-tabs-window-item value="tab01" eager>
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
                <v-col cols="12" >
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
              <v-row>
                <v-col class="my-0 py-0">
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
                        v-model="itemsSeleccionados"
                        :headers="encabezadoCuentaOrigen"
                        :hover="true"
                        :items="itemsCuentaOrigen"
                        eager
                        item-value="concepto"
                        color="transparent"
                      >
                        <template v-slot:header.eliminar>
                          <v-btn
                            class="mr-1"
                            color="primary"
                            height="20px"
                            min-width="20px"
                            width="20px"
                            size="x-small"
                            variant="elevated"
                            @click="itemsCuentaOrigen.push()"
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
                               height="20px"
                            min-width="20px"
                            width="20px"
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
            <v-tabs-window-item value="tab02" eager>
              <v-card color="transparent">
                <v-card-title class="text-medium-emphasis text-body-1">
                  Parametrización de perioricidad
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text> </v-card-text>
              </v-card>
            </v-tabs-window-item>
            <v-tabs-window-item value="tab03" eager>
              <v-card color="transparent">
                <v-card-title color="primary">Usuarios</v-card-title>
                <v-divider></v-divider>
                <v-card-text></v-card-text>
              </v-card>
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
    const vbrePrincipalRef = ref()
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
    const vrowClienteRef = ref()

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
          vbrePrincipalRef.value.$el.clientHeight -
          vtabMenuRef.value.$el.clientHeight -
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

    const movies = [
      {
        perioricidad: 'Fondeadora',
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
      { title: 'Cuenta origen', key: 'cuenta', sortable: false, align: 'center' },
      { title: '', key: 'eliminar', sortable: false, align: 'end' },
    ])

    const itemsCuentaOrigen = ref([{ cuenta: '001850255586' }, { cuenta: '001850255586' }])

    return {
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
      vbrePrincipalRef,
      vbtnActivarModel,
      vbtnMenuExportarModel,
      vconPrincipalRef,
      vforFiltrosRef,
      vforFiltrosRule,
      vrowClienteRef,
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
