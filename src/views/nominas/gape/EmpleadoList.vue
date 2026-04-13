<template>
  <v-container ref="vconPrincipalRef" fluid style="height: 95% !important">
    <!-- vrowBarraDeAccionesRef -->
    <v-row ref="vrowBarraDeAccionesRef" dense>
      <v-col cols="12" md="6" class="d-flex align-center">
        <v-breadcrumbs
          :items="vbrePrincipalItems"
          class="text-medium-emphasis text-subtitle-1"
          divider="|"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-account-box" color="primary" />
          </template>
        </v-breadcrumbs>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center justify-end overflow-auto">
        <v-divider class="mr-5 my-2 border-opacity-25" vertical />

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
              :disabled="btnDisabled.importarRegistros"
              @click="onDecisionDownload"
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
              :disabled="btnDisabled.descargarFormato"
              @click="onOpenModalExportFormEmpleados"
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
              height="40px"
              min-width="40px"
              width="40px"
              :disabled="btnDisabled.eliminarRegistros"
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
              :disabled="btnDisabled.guardarCambios"
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
              height="40px"
              min-width="40px"
              width="40px"
              :disabled="btnDisabled.activarRegistro"
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
              :disabled="btnDisabled.crearRegistro"
              :to="'/nominas/gape/empleadoForm'"
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
      <v-col cols="12">
        <bec-autocomplete
          v-model="dataModel.id_nomina_gape_cliente"
          :clearable="false"
          :disabled="btnDisabled.compCliente"
          :item-subtitle="(item) => `${item.codigo}`"
          :item-title="'nombre'"
          :item-value="'id'"
          :items="itemsClientesNomina"
          :label="'Cliente'"
          :multiple="false"
          :prepend-icon="'mdi-account-box'"
          :return-object="false"
          :show-chips="false"
          @update:model-value="buscarEmpresasNomina"
        >
          <template #tooltip>
            <empleado-list-tooltips name="ayudaFiltroCliente" />
          </template>
        </bec-autocomplete>
      </v-col>
      <v-col cols="12" md="6">
        <bec-autocomplete
          v-model="dataModel.id_nomina_gape_empresa"
          :clearable="false"
          :disabled="btnDisabled.compEmpresa"
          :item-subtitle="(item) => `${item.rfc}`"
          :item-title="'razon_social'"
          :item-value="'id'"
          :items="itemsEmpresaDatabase"
          :label="'Empresa *'"
          :multiple="false"
          :prepend-icon="'mdi-briefcase-account'"
          :return-object="false"
          :show-chips="false"
          @update:model-value="buscarEsquemasPorEmpresa"
        >
          <template #tooltip>
            <empleado-list-tooltips name="ayudaFiltroEmpresa" />
          </template>
        </bec-autocomplete>
      </v-col>
      <v-col cols="12" lg="6">
        <bec-autocomplete
          v-model="dataModel.id_nomina_gape_esquema"
          :clearable="false"
          :disabled="btnDisabled.compEsquema"
          :item-title="'esquema'"
          :item-value="'id'"
          :items="itemsEsquemas"
          :label="'Esquema *'"
          :multiple="false"
          :placeholder="'Seleccione'"
          :prepend-icon="'mdi-calendar-month'"
          :return-object="false"
          @update:model-value="buscarEmpleadosClienteEmpresa"
        >
          <template #tooltip>
            <empleado-list-tooltips name="ayudaFiltroEsquema" />
          </template>
        </bec-autocomplete>
      </v-col>
      <v-col cols="12" md="10" class="d-flex align-center">
        <bec-text-field
          v-model="vdtbPrincipalBusqueda"
          :placeholder="'Buscar'"
          :prepend-icon="'mdi-magnify'"
        >
          >
          <template #tooltip>
            <v-card
              :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
              class="py-3"
              color="transparent"
              elevation="0"
            >
              <v-row>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <v-icon icon="mdi-information-slab-circle-outline" />
                </v-col>
                <v-col cols="11">
                  <span style="font-weight: bold; color: #2a73c5">Instrucción:</span>
                  puede buscar registros ingresando cualquier coincidencia con los datos de la
                  tabla.
                </v-col>
              </v-row>
              <v-divider class="border-opacity-50 my-2 mx-2" />
              <v-row>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <v-icon icon="mdi-file-rotate-left" />
                </v-col>
                <v-col cols="11">
                  <span style="font-weight: bold; color: #2a73c5">Campo dependiente:</span>
                  debe seleccionar primero
                  <b style="color: #2a73c5"><i>TIPO DE EMPRESA</i></b> para poder habilitar este
                  campo y mostrar las empresas correspondientes.
                </v-col>
              </v-row>
              <v-divider class="border-opacity-50 my-2 mx-2" />
              <v-row>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <v-icon icon="mdi-cursor-default-click" />
                </v-col>
                <v-col cols="11">
                  <span style="font-weight: bold; color: #2a73c5">Evento:</span>
                  al ingresar su búsqueda, se mostrará en la tabla el listado con las coincidencias
                  encontradas.
                </v-col>
              </v-row>
            </v-card>
          </template>
        </bec-text-field>
      </v-col>
      <v-col cols="12" md="2" class="d-flex justify-end align-center">
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props: tooltip }">
            <v-btn-group
              v-bind="mergeProps(tooltip)"
              class="border-opacity-25"
              color="primary"
              density="comfortable"
              divided
              variant="outlined"
            >
              <v-btn density="compact">
                <v-text-field
                  :model-value="vdtbPrincipalItemsPorPagina"
                  class="mb-1 pb-1"
                  density="compact"
                  hide-details
                  max="15"
                  min="1"
                  type="number"
                  variant="plain"
                  width="50"
                  @update:model-value="vdtbPrincipalItemsPorPagina = parseInt($event, 10)"
                />
              </v-btn>

              <v-menu>
                <template v-slot:activator="{ props: menu }">
                  <v-btn icon="mdi-menu-down" v-bind="mergeProps(menu, tooltip)" />
                </template>
                <v-list color="primary" v-model:selected="vdtbPrincipalItemsPorPagina">
                  <v-list-item
                    v-for="(item, index) in vdtbPrincipalOpcionesItemsPorPagina"
                    :key="index"
                    :value="item.valor"
                  >
                    <v-list-item-title>{{ item.titulo }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-btn-group>
          </template>
          <template #default>
            <v-card
              :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
              class="py-3"
              color="transparent"
              elevation="0"
            >
              <v-row>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <v-icon icon="mdi-information-slab-circle-outline" />
                </v-col>
                <v-col cols="11">
                  <span style="font-weight: bold; color: #2a73c5">Instrucción:</span>
                  escriba o seleccione la cantidad de registros que desea ver por página en la
                  tabla.
                </v-col>
              </v-row>
            </v-card>
          </template>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="my-0 py-0"><v-divider class="border-opacity-25 ma-0 pa-0" /></v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card color="transparent" elevation="0">
          <v-data-table
            v-model:page="vdtbPrincipalPaginaActual"
            v-model:search="vdtbPrincipalBusqueda"
            v-model="vdtbPrincipalItemsSeleccionados"
            :headers="vdtbPrincipalEncabezados"
            :hover="true"
            :items-per-page="vdtbPrincipalItemsPorPagina"
            :items="vdtbPrincipalItems"
            :mobile="smAndDown"
            :multi-sort="true"
            :sticky="true"
            item-value="codigo"
            show-select
            sort-asc-icon="mdi-arrow-down-thin"
            sort-desc-icon="mdi-arrow-up-thin"
            fixed-header
            eager
            :height="smAndDown ? undefined : getTableHeight"
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
                        class="pa-0"
                        density="compact"
                        true-icon="mdi-checkbox-multiple-marked"
                        :indeterminate="someSelected && !allSelected"
                        :model-value="allSelected"
                        @update:model-value="selectAll(!allSelected)"
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
                    :to="{
                      name: 'EmpleadoUpdateForm',
                      params: { id: item.idempleado },
                      query: {
                        id_nomina_gape_cliente: dataModel.id_nomina_gape_cliente,
                        id_nomina_gape_empresa: dataModel.id_nomina_gape_empresa,
                        fiscal: dataModel.fiscal ? 'true' : 'false',
                      },
                    }"
                  >
                    <v-icon size="small" color="white" icon="mdi-pencil" />
                  </v-btn>
                </template>
                <span>
                  Editar <b>{{ item.rfc }}</b>
                </span>
              </v-tooltip>
            </template>
            <template v-slot:no-data>
              <v-card
                border
                class="ma-5 d-flex align-center justify-center"
                color="transparent"
                elevation="0"
                :height="getTableNoDataHeight"
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
                v-model="vdtbPrincipalPaginaActual"
                :length="getVdtPrincipalTotalPaginas"
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
        </v-card>
      </v-col>
    </v-row>
    <empleado-modal-export-form
      :dialog-title="modalExportFormEmpleados.titulo"
      :dialog-view="modalExportFormEmpleados.dialog"
      @close="onCloseModalExportFormEmpleados"
      @cancel="onCloseModalExportFormEmpleados"
    />
    <empleado-modal-import-form
      :dialog-event="modalImportFormEmpleados.evento"
      :dialog-items="modalImportFormEmpleados.items"
      :dialog-title="modalImportFormEmpleados.titulo"
      :dialog-view="modalImportFormEmpleados.dialog"
      @close="onCloseModalImportFormEmpleados"
      @cancel="onCloseModalImportFormEmpleados"
    />
  </v-container>
</template>

<script lang="ts">
import { ref, defineComponent, mergeProps, computed, onMounted, watch } from 'vue'

import { useDisplay } from 'vuetify'

import { EmpleadoListTooltips } from '@/components/nomina/ayudas'

// import composables
import { useEmpleadoListDisableRules } from '@/composables/nomina/gape'

// import components
import { BecSelect, BecAutocomplete, BecTextField } from '@/components/core/becmaComponents'

import EmpleadoModalExportForm from '@/views/nominas/gape/EmpleadoModalExportForm.vue'
import EmpleadoModalImportForm from '@/views/nominas/gape/EmpleadoModalImportForm.vue'

// import interfaces
import type { EmpleadoModel } from '@/interfaces/nomina/gape'

// import stores
import {
  useClienteStore,
  useEmpresaStore,
  useEmpleadoStore,
  useEsquemaStore,
} from '@/stores/modules/Nomina/gape'

import { useDialogManagerStore } from '@/stores/modules/Core/dialog'

import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'EmpleadoList',
  components: {
    BecTextField,
    BecSelect,
    BecAutocomplete,
    EmpleadoListTooltips,
    EmpleadoModalExportForm,
    EmpleadoModalImportForm,
  },

  setup() {
    // 1. Imports
    // 2. Props y Emits
    // 3. Composables (funciones reusables)
    // 4. Reactive
    // 5. Computed properties
    // 6. Watchers
    // 7. Lifecycle hooks (onMounted, mounted)
    // 8. Functions (fetch, metodos, async)

    // 3. Composables
    const router = useRouter()
    const clienteStore = useClienteStore()
    const empresasStore = useEmpresaStore()
    const empleadoStore = useEmpleadoStore()
    const esquemaStore = useEsquemaStore()

    const dialogConfirmation = useDialogManagerStore()
    const { smAndDown } = useDisplay()

    const dataModel = ref({
      id_nomina_gape_cliente: undefined,
      fiscal: false,
      id_nomina_gape_empresa: undefined,
      id_nomina_gape_esquema: undefined,
    })

    const { btnDisabled } = useEmpleadoListDisableRules(dataModel)

    /*
    const btnDisabled = ref({
      importarRegistros: true,
      descargarFormato: true,
      eliminarRegistros: true,
      guardarCambios: true,
      activarRegistro: true,
      crearRegistro: false,

      compCliente: false,
      compTipoEmp: false,
      compEmpresa: true,
    })
    */

    // 4. Reactive

    const itemsEsquemas = computed(() => esquemaStore.esquemas)

    const vconPrincipalRef = ref()
    const vrowBarraDeAccionesRef = ref()
    const vrowFiltrosRef = ref()
    const vbrePrincipalItems = ref([
      {
        disabled: false,
        href: '',
        title: 'Empleado',
      },
      {
        disabled: false,
        href: '',
        title: 'Listado',
      },
    ])

    const vbtnActivarRegistro = ref(true)

    // 4. Reactive | vrowTableRef
    const vdtbPrincipalBusqueda = ref('')
    const vdtbPrincipalEncabezados = ref<
      {
        key: string
        align?: 'start' | 'center' | 'end'
        sortable?: boolean
        title: string
      }[]
    >([
      {
        key: 'codigoempleado',
        align: 'center',
        sortable: true,
        title: 'Código',
      },
      {
        key: 'nombrelargo',
        align: 'start',
        sortable: true,
        title: 'Nombre',
      },

      {
        key: 'rfc',
        align: 'start',
        sortable: true,
        title: 'RFC',
      },
      {
        key: 'fechaalta',
        align: 'center',
        title: 'Fecha de alta',
      },
      {
        key: 'acciones',
        title: '',
        align: 'end',
        sortable: false,
      },
    ])

    const vdtbPrincipalItems = ref<EmpleadoModel[]>([])
    const vdtbPrincipalItemsPorPagina = ref(5)
    const vdtbPrincipalItemsSeleccionados = ref<string[]>([])

    const vdtbPrincipalOpcionesItemsPorPagina = ref([
      { titulo: '5', valor: 5 },
      { titulo: '10', valor: 10 },
      { titulo: '15', valor: 15 },
      { titulo: '20', valor: 20 },
      { titulo: 'Ver todos', valor: 0 },
    ])

    const vdtbPrincipalPaginaActual = ref(1)

    const loading = ref(false)
    const loadingUpload = ref(false)

    // 5. Computed | vrowTableRef
    const getVdtPrincipalTotalPaginas = computed(() =>
      Math.ceil(vdtbPrincipalItems.value.length / vdtbPrincipalItemsPorPagina.value),
    )

    const getTableHeight = computed(() => {
      const height = ref(0)
      if (vconPrincipalRef.value) {
        height.value =
          vconPrincipalRef.value.$el.clientHeight -
          vrowBarraDeAccionesRef.value.$el.clientHeight -
          vrowFiltrosRef.value.$el.clientHeight -
          80
      }

      return `${height.value}px !important`
    })

    const getTableNoDataHeight = computed(() => {
      const height = ref(0)
      if (vconPrincipalRef.value) {
        height.value =
          vconPrincipalRef.value.$el.clientHeight -
          vrowBarraDeAccionesRef.value.$el.clientHeight -
          vrowFiltrosRef.value.$el.clientHeight -
          80 -
          100
      }

      return `${height.value}px !important`
    })

    const itemsClientesNomina = computed(() => clienteStore.clientes)
    const itemsEmpresaDatabase = computed(() => empresasStore.empresasList)

    const modalExportFormEmpleados = ref<{
      dialog: boolean
      titulo: string
    }>({
      dialog: false,
      titulo: '',
    })

    const modalImportFormEmpleados = ref<{
      dialog: boolean
      evento: string
      items: []
      titulo: string
    }>({
      dialog: false,
      evento: '',
      items: [],
      titulo: '',
    })

    const esquemaSeleccionado = computed(() => {
      const id = dataModel.value.id_nomina_gape_esquema
      if (!id) return null

      return itemsEsquemas.value.find((e) => e.id === id) ?? null
    })

    const esEsquemaContpaq = computed<boolean>(() => {
      return esquemaSeleccionado.value?.contpaq === true
    })

    // 6. Watchers
    watch(vdtbPrincipalItemsSeleccionados, (nuevosSeleccionados) => {
      btnDisabled.value.eliminarRegistros = nuevosSeleccionados.length === 0
    })

    watch(
      esEsquemaContpaq,
      async (esFiscal) => {
        dataModel.value.fiscal = esFiscal
      },
      { immediate: true },
    )

    // 7. Lifecycle hooks (onMounted, mounted)
    onMounted(async () => {
      await fetchClientes()
    })

    // 8. Functions (fetch, metodos, async)

    const fetchClientes = async () => {
      try {
        await clienteStore.catalogoCliente()
      } catch (error) {
        console.error('Error al cargar empresas nómina:', error)
      }
    }

    const buscarEmpresasNomina = async () => {
      dataModel.value.id_nomina_gape_empresa = undefined

      await fetchEmpresasNominaPorClienteTipo(buildData())
    }

    const buscarEsquemasPorEmpresa = async () => {
      await buscarEsquemas()
    }

    const buscarEsquemas = async () => {
      await esquemaStore.esquemasPorEmpresa(buildData())
    }

    const buscarEmpleadosClienteEmpresa = async (codigo: any) => {
      await fetchEmpleadosClienteEmpresa(buildData())
    }

    const fetchEmpleadosClienteEmpresa = async (data: any) => {
      vdtbPrincipalItems.value = []
      try {
        await empleadoStore.indexEmpleados(data)

        vdtbPrincipalItems.value = empleadoStore.empleado
      } catch (error) {
        console.error('Error al cargar los empleados:', error)
      }
    }

    const fetchEmpresasNominaPorClienteTipo = async (data: any) => {
      empresasStore.reset()
      try {
        await empresasStore.empresasNominasPorClienteTipo(data)
      } catch (error) {
        console.error('Error al cargar catálogos por empresa:', error)
      }
    }

    const onOpenModalExportFormEmpleados = async () => {
      modalExportFormEmpleados.value.dialog = true
      modalExportFormEmpleados.value.titulo = 'Formato de importación'
    }

    const onCloseModalExportFormEmpleados = async () => {
      modalExportFormEmpleados.value.dialog = false
    }

    const onDecisionDownload = async () => {
      let mensaje = ''
      let titulo = ''

      // Mostrar ventana de importación
      // Validar los campos, cliente, tipo de empresa, EMPRESA

      titulo = 'Importación de empleados'
      mensaje = '¿Está seguro que desea cargar los empleados?'

      dialogConfirmation.onOpenDialogConfirmation(
        mensaje,
        validateUpload, // << callback directo
        [],
        titulo,
        'alert',
      )
    }

    const validateUpload = async () => {
      modalImportFormEmpleados.value.dialog = true
      modalImportFormEmpleados.value.titulo = 'Importación de excel'

      dialogConfirmation.onCloseDialogConfirmation()

      try {
        loadingUpload.value = true

        let titulo = 'Carga de empleados'
        let mensaje =
          'Los datos se guardaron de forma exitosa, revisar en el sistema de nóminas para confirmar.'

        const data = buildFormData()
        const formData = objectToFormData(data)

        // 3. Agregas el archivo

        const archivo = dataModel.value.archivo

        if (archivo instanceof File) {
          // v-file-upload devuelve un solo File
          formData.append('file', archivo)
        } else if (Array.isArray(archivo) && archivo.length > 0) {
          // v-file-upload devuelve File[]
          formData.append('file', archivo[0])
        }

        await incidenciaStore.uploadIncidencias(formData)

        dialogConfirmation.onOpenDialogInformation(mensaje, titulo, 'correct', '#438701', 2)
      } catch (error: any) {
        if (error.type === 'validation') {
          modalLogIncidencia.value = {
            dialog: true,
            evento: '',
            items: error.errors,
            titulo: 'hola',
          }
        } else {
          dialogConfirmation.onOpenDialogInformation(
            'Ocurrió un error inesperado al guardar.',
            'Error',
            'incorrect',
            '#B00000',
            2,
          )
        }
      } finally {
        loadingUpload.value = false
      }
    }

    const onCloseModalImportFormEmpleados = async () => {
      modalImportFormEmpleados.value.dialog = false
    }

    const buildData = (extras: any = {}) => {
      return {
        idCliente: dataModel.value.id_nomina_gape_cliente,
        idEmpresa: dataModel.value.id_nomina_gape_empresa,
        idEsquema: dataModel.value.id_nomina_gape_esquema,
        ...extras, // añade valores adicionales dinámicamente
      }
    }

    return {
      esEsquemaContpaq,
      buscarEsquemasPorEmpresa,
      itemsEsquemas,
      btnDisabled,
      buscarEmpleadosClienteEmpresa,
      buscarEmpresasNomina,
      dataModel,
      dialogConfirmation,
      getTableHeight,
      getTableNoDataHeight,
      getVdtPrincipalTotalPaginas,
      itemsClientesNomina,
      itemsEmpresaDatabase,
      mergeProps,
      modalExportFormEmpleados,
      modalImportFormEmpleados,
      onCloseModalExportFormEmpleados,
      onCloseModalImportFormEmpleados,
      onDecisionDownload,
      onOpenModalExportFormEmpleados,
      smAndDown,
      vbrePrincipalItems,
      vbtnActivarRegistro,
      vconPrincipalRef,
      vdtbPrincipalBusqueda,
      vdtbPrincipalEncabezados,
      vdtbPrincipalItems,
      vdtbPrincipalItemsPorPagina,
      vdtbPrincipalItemsSeleccionados,
      vdtbPrincipalOpcionesItemsPorPagina,
      vdtbPrincipalPaginaActual,
      vrowBarraDeAccionesRef,
      vrowFiltrosRef,
    }
  },
})
</script>
