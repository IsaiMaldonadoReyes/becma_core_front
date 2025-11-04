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
                  Elija el <b style="color: #2a73c5"><i>CLIENTE</i></b> para poder filtrar la
                  información correspondientes.
                </v-col>
              </v-row>
              <v-divider class="border-opacity-50 my-2 mx-2" />
              <v-row>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <v-icon icon="mdi-cursor-default-click" />
                </v-col>
                <v-col cols="11">
                  <span style="font-weight: bold; color: #2a73c5">Evento:</span>
                  al seleccionar una opción en este campo, se habilitará y mostrará la información
                  correspondiente de: <b style="color: #2a73c5"><i>TIPO DE EMPRESA</i></b>
                </v-col>
              </v-row>
            </v-card>
          </template>
        </bec-autocomplete>
      </v-col>
      <v-col cols="12" md="3" class="d-flex align-start justify-end">
        <bec-select
          v-model="dataModel.fiscal"
          :clearable="false"
          :disabled="btnDisabled.compTipoEmp"
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
          @update:model-value="buscarEmpresasNomina"
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
                  elija el tipo de empresa (fiscal o no fiscal) para mostrar únicamente las empresas
                  correspondientes.
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
                  <b style="color: #2a73c5"><i>CLIENTE</i></b> para poder habilitar este campo.
                </v-col>
              </v-row>
              <v-divider class="border-opacity-50 my-2 mx-2" />
              <v-row>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <v-icon icon="mdi-cursor-default-click" />
                </v-col>
                <v-col cols="11">
                  <span style="font-weight: bold; color: #2a73c5">Evento:</span>
                  al seleccionar una opción en este campo, se habilitará y mostrará la información
                  correspondiente de: <b style="color: #2a73c5"><i>EMPRESA</i></b>
                </v-col>
              </v-row>
            </v-card>
          </template>
        </bec-select>
      </v-col>
      <v-col cols="12" md="9">
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
          @update:model-value="buscarEmpleadosClienteEmpresa"
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
                  elija la empresa por la que desea filtrar los empleados.
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
                  al seleccionar una opción en este campo, se habilitará el:
                  <b style="color: #2a73c5"><i>BUSCADOR</i></b> de empleados
                </v-col>
              </v-row>
            </v-card>
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
                  >
                    <v-icon size="small" color="white" icon="mdi-pencil" />
                  </v-btn>
                </template>
                <span>
                  Editar <b>{{ item.nombre }}</b>
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
  </v-container>
</template>

<script lang="ts">
import { ref, defineComponent, mergeProps, computed, onMounted, watch } from 'vue'

import { useDisplay } from 'vuetify'

// import interfaces
import type { ClienteModel } from '@/interfaces/nomina/gape/ClienteModel'

// import composables

// import stores
import { useClienteStore } from '@/stores/modules/Nomina/gape/Cliente'
import { useDialogManagerStore } from '@/stores/modules/Core/dialog'
import { useEmpresaStore } from '@/stores/modules/Nomina/gape/Empresa'
import { useRouter } from 'vue-router'

// import components
import BecAutocomplete from '@/components/core/becmaComponents/BecAutocomplete.vue'
import BecSelect from '@/components/core/becmaComponents/BecSelect.vue'
import BecTextField from '@/components/core/becmaComponents/BecTextField.vue'

// import views

export default defineComponent({
  name: 'EmpleadoList',
  components: { BecTextField, BecSelect, BecAutocomplete },

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

    const dialogConfirmation = useDialogManagerStore()
    const { smAndDown } = useDisplay()

    const dataModel = ref({
      id_nomina_gape_cliente: undefined,
      fiscal: false,
      id_nomina_gape_empresa: undefined,
    })

    // 4. Reactive
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
        key: 'codigo',
        align: 'center',
        sortable: true,
        title: 'Código',
      },
      {
        key: 'nombre',
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
        key: 'fecha_alta',
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

    const vdtbPrincipalItems = ref<ClienteModel[]>([])
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

    // 6. Watchers
    watch(vdtbPrincipalItemsSeleccionados, (nuevosSeleccionados) => {
      btnDisabled.value.eliminarRegistros = nuevosSeleccionados.length === 0
    })

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

    const buscarEmpresasNomina = async (codigo: any) => {
      dataModel.value.id_nomina_gape_empresa = undefined

      const idCliente = dataModel.value.id_nomina_gape_cliente
      const fiscal = dataModel.value.fiscal

      btnDisabled.value.compEmpresa = idCliente != null ? false : true

      // ✅ Si el cliente está seleccionado, aplicar la lógica fiscal/no fiscal
      await fetchEmpresasNominaPorClienteTipo(idCliente, fiscal)
    }

    const buscarEmpleadosClienteEmpresa = async (codigo: any) => {
      const data = {
        idCliente: dataModel.value.id_nomina_gape_cliente,
        fiscal: dataModel.value.fiscal,
        idEmpresa: dataModel.value.id_nomina_gape_empresa,
      }

      await fetchEmpleadosClienteEmpresa(data)
    }

    const fetchEmpleadosClienteEmpresa = async (data: any) => {
      vdtbPrincipalItems.value = []
      try {
        await empresasStore.empresasNominasPorClienteTipo(data)

        vdtbPrincipalItems.value = clienteStore.clientes
      } catch (error) {
        console.error('Error al cargar los empleados:', error)
      }
    }

    const fetchEmpresasNominaPorClienteTipo = async (idCliente: any, fiscal: boolean) => {
      empresasStore.reset()
      try {
        const data = {
          idCliente: idCliente,
          fiscal: fiscal,
        }
        await empresasStore.empresasNominasPorClienteTipo(data)
      } catch (error) {
        console.error('Error al cargar catálogos por empresa:', error)
      }
    }

    return {
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
