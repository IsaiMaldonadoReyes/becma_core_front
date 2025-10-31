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
              @click="onExecuteOpcionesCheck('onDeleteIds')"
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
              :to="'/nominas/gape/parametrizacionForm'"
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
      <v-col cols="12" lg="10" class="d-flex align-center">
        <bec-text-field
          v-model="vdtbPrincipalBusqueda"
          :placeholder="'Buscar'"
          :prepend-icon="'mdi-magnify'"
          :tooltip="'Puede buscar registros ingresando cualquier coincidencia con los datos de la tabla.'"
        />
      </v-col>
      <v-col cols="12" lg="2" class="d-flex justify-end align-center">
        <v-tooltip interactive>
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
          <span>
            Escriba o seleccione la cantidad de registros que desea ver por página en la tabla.
          </span>
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
                    :to="`/nominas/gape/parametrizacionForm/${item.id}`"
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
    <cliente-modal-form
      :dialog-event="dialogClientePropiedades.evento"
      :dialog-items="dialogClientePropiedades.items"
      :dialog-title="dialogClientePropiedades.titulo"
      :dialog-view="dialogClientePropiedades.dialog"
      @close="onCloseDialogCliente"
      @cancel="onCloseDialogCliente"
      @save="onSaveDialogCliente"
    />
  </v-container>
</template>

<script lang="ts">
import { ref, defineComponent, mergeProps, computed, onMounted, watch } from 'vue'

import { useDisplay } from 'vuetify'

// import interfaces
import type { ConceptoPagoParametrizacionModel } from '@/interfaces/nomina/gape/ConceptoPagoParametrizacionModel'

// import stores
import { useConceptoPagoParametrizacionStore } from '@/stores/modules/Nomina/gape/ConceptoPagoParametrizacion'
import { useDialogManagerStore } from '@/stores/modules/Core/dialog'

// import components
import BecTextField from '@/components/core/becmaComponents/BecTextField.vue'

// import views
import ClienteModalForm from '@/views/nominas/gape/ClienteModalForm.vue'

export default defineComponent({
  name: 'ClienteList',
  components: { ClienteModalForm, BecTextField },

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
    const { smAndDown } = useDisplay()

    // 4. Reactive | vconPrincipalRef
    const vconPrincipalRef = ref()

    // 4. Reactive | vrowBarraDeAccionesRef
    const vrowBarraDeAccionesRef = ref()

    const parammetrizacionStore = useConceptoPagoParametrizacionStore()
    const dialogConfirmation = useDialogManagerStore()
    // breadcrumbs
    const vbrePrincipalItems = ref([
      {
        disabled: false,
        href: '',
        title: 'Parametrización',
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
    })

    const vbtnActivarRegistro = ref(true)

    // 4. Reactive | vrowFiltrosRef
    const vrowFiltrosRef = ref()

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
        key: 'cliente',
        align: 'start',
        sortable: false,
        title: 'Cliente',
      },
      {
        key: 'empresa',
        align: 'start',
        sortable: false,
        title: 'Empresa',
      },
      {
        key: 'tipo',
        align: 'start',
        sortable: true,
        title: 'Tipo registro',
      },
      {
        key: 'periodo',
        align: 'center',
        title: 'Periodo',
      },
      {
        key: 'fecha_creacion',
        align: 'center',
        title: 'Fecha',
      },
      {
        key: 'acciones',
        title: '',
        align: 'end',
        sortable: false,
      },
    ])
    const vdtbPrincipalItems = ref<ConceptoPagoParametrizacionModel[]>([])

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
          85
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
          85 -
          100
      }

      return `${height.value}px !important`
    })

    const dialogClientePropiedades = ref({
      dialog: false,
      evento: '',
      items: {},
      titulo: '',
    })

    // DialogClienteSistema
    type Eventos = 'onSave' | 'onEdit' | 'onDelete' | 'onDeleteIds'

    const methods: Record<Eventos, (...args: any[]) => void> = {
      onSave: () => {
        dialogClientePropiedades.value.dialog = false
        fnCargarListado()
      },
      onEdit: () => {
        dialogClientePropiedades.value.dialog = false
        fnCargarListado()
      },
      onDelete: async (
        items: ConceptoPagoParametrizacionModel | ConceptoPagoParametrizacionModel[],
      ) => {},
      onDeleteIds: () => {
        let titulo = 'Eliminar registro(s)'
        let mensaje = 'Esta acción eliminará los clientes seleccionados. ¿Desea continuar?'
      },
    }

    const onOpenDialogCliente = (evento: string, items: object, titulo: string) => {
      dialogClientePropiedades.value = {
        dialog: true,
        evento: evento,
        items: items,
        titulo: titulo,
      }
    }

    const onCloseDialogCliente = () => {
      dialogClientePropiedades.value.dialog = false
      fnCargarListado()
    }

    const onSaveDialogCliente = (evento: Eventos) => {
      methods[evento]()
    }

    const onExecuteOpcionesCheck = (evento: Eventos) => {
      methods[evento]()
    }

    async function fnCargarListado() {
      vdtbPrincipalItems.value = []

      await parammetrizacionStore.index()
      vdtbPrincipalItems.value = parammetrizacionStore.conceptosPagoParametrizacion
    }

    // watchers
    watch(vdtbPrincipalItemsSeleccionados, (nuevosSeleccionados) => {
      btnDisabled.value.eliminarRegistros = nuevosSeleccionados.length === 0
    })

    onMounted(() => {
      fnCargarListado()
    })

    return {
      btnDisabled,
      dialogClientePropiedades,
      dialogConfirmation,
      getTableHeight,
      getTableNoDataHeight,
      getVdtPrincipalTotalPaginas,
      mergeProps,
      onCloseDialogCliente,
      onExecuteOpcionesCheck,
      onOpenDialogCliente,
      onSaveDialogCliente,
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
