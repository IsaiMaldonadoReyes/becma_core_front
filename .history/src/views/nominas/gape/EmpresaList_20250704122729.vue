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
            <v-icon icon="mdi-briefcase-account" color="primary" />
          </template>
        </v-breadcrumbs>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center justify-end overflow-auto">
        <v-divider class="mr-5 border-opacity-25" vertical />

        <!-- vbtnCargar -->
        <v-tooltip bottom color="primary" interactive>
          <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
              v-bind="mergeProps(tooltipProps)"
              class="mr-1"
              color="primary"
              height="48px"
              min-width="48px"
              width="48px"
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
              height="48px"
              min-width="48px"
              width="48px"
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
              height="48px"
              min-width="48px"
              width="48px"
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
              disabled
              height="48px"
              min-width="48px"
              width="48px"
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
              height="48px"
              min-width="48px"
              width="48px"
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
              height="48px"
              min-width="48px"
              width="48px"
              to="/nominas/gape/empresaForm"
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

    <!-- data-table -->
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
                  Editar <b></b>
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
import { ref, defineComponent, mergeProps, computed, onMounted } from 'vue'

import { useDisplay } from 'vuetify'

import { useSistemaStore } from '../../../stores/modules/Core/sistema'
import BecTextField from '@/components/core/becmaComponents/BecTextField.vue'

export interface Elementos {
  id: number
  codigo: string
  descripcion: string
  nombre: string
}

interface InterfaceItem {
  id: number
  nombre: string
  codigo: string
  descripcion: string
  fecha_creacion: string
  estado: number
}

export default defineComponent({
  name: 'EmpresaList',
  components: { BecTextField },

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
    const vbrePrincipalItems = ref([
      {
        disabled: false,
        href: '',
        title: 'Empresa',
      },
      {
        disabled: false,
        href: '',
        title: 'Listado',
      },
    ])
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
        key: 'nombre',
        align: 'start',
        sortable: true,
        title: 'Nombre',
      },
      {
        key: 'codigo',
        align: 'center',
        sortable: true,
        title: 'Código',
      },
      {
        key: 'descripcion',
        align: 'start',
        sortable: true,
        title: 'Descripción',
      },
      {
        key: 'fecha',
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
    const vdtbPrincipalItems = ref<
      {
        id: number
        cliente: object
        fiscal?: boolean
        empresaBD: object
        razonSocial: string
        rfc: string
        codigoInterno: string
        correoNotificacion: string
        esActiva?: boolean
      }[]
    >([])
    const vdtbPrincipalItemsPorPagina = ref(5)
    const vdtbPrincipalItemsSeleccionados = ref([])
    const vdtbPrincipalOpcionesItemsPorPagina = ref([
      { titulo: '5', valor: 5 },
      { titulo: '10', valor: 10 },
      { titulo: '15', valor: 15 },
      { titulo: '20', valor: 20 },
      { titulo: 'Ver todos', valor: 0 },
    ])
    const vdtbPrincipalPaginaActual = ref(1)

    const sistema = useSistemaStore()

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

    // 7. Lifecycle hooks
    onMounted(() => {
      fnCargarListado()
    })

    // 8. Functions (fetch, metodos, async) | vrowTableRef
    async function fnCargarListado() {
      vdtbPrincipalItems.value = []

      await sistema.indexSistema()

      /*vdtbPrincipalItems.value = sistema.object.data.map((item: InterfaceItem) => ({
        id: item.id,
        nombre: item.nombre,
        codigo: item.codigo,
        descripcion: item.descripcion,
        fecha: item.fecha_creacion,
        estado: item.estado,
      }));*/
      /*
      vdtbPrincipalItems.value = sistema.object.data.flatMap((item: InterfaceItem) =>
        Array.from({ length: 5 }, () => ({
          id: item.id,
          nombre: item.nombre,
          codigo: item.codigo,
          descripcion: item.descripcion,
          fecha: item.fecha_creacion,
          estado: item.estado,
        })),
      )
      */
    }

    return {
      getTableHeight,
      getTableNoDataHeight,
      getVdtPrincipalTotalPaginas,
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
