<template>
  <v-container ref="vconPrincipalRef" fluid style="height: 95% !important">
    <!--breadcrumbs -->
    <v-row ref="vbrePrincipalRef" dense>
      <v-col cols="12" md="6" class="d-flex align-center">
        <v-breadcrumbs
          :items="vbrePrincipalItems"
          divider="|"
          class="text-medium-emphasis text-subtitle-1"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-briefcase-account" color="primary" />
          </template>
        </v-breadcrumbs>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center justify-end overflow-auto">
        <v-divider class="mr-5 border-opacity-25" vertical />

        <v-tooltip bottom color="primary" interactive>
          <template v-slot:activator="{ props: tooltip }">
            <v-btn
              v-bind="mergeProps(vbtnMenuImportarModel, tooltip)"
              class="mr-1"
              color="primary"
              height="48px"
              min-width="48px"
              width="48px"
            >
              <v-icon size="24px" color="white">mdi-upload</v-icon>
            </v-btn>
          </template>
          <span>
            <v-icon icon="mdi-microsoft-excel" /> Importar registros desde el formato Excel
          </span>
        </v-tooltip>

        <v-tooltip bottom color="primary" interactive>
          <template v-slot:activator="{ props: tooltip }">
            <v-btn
              v-bind="mergeProps(vbtnMenuExportarModel, tooltip)"
              class="mr-1"
              color="primary"
              height="48px"
              min-width="48px"
              width="48px"
            >
              <v-icon size="24px" color="white">mdi-download</v-icon>
            </v-btn>
          </template>
          <span>
            <v-icon icon="mdi-microsoft-excel" /> Descargar el formato base de Excel para
            importación de registros
          </span>
        </v-tooltip>

        <v-tooltip bottom color="primary" interactive>
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              class="mr-1"
              color="primary"
              height="48px"
              min-width="48px"
              width="48px"
              disabled
            >
              <v-icon size="24px" color="white">mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>Eliminar</span>
        </v-tooltip>

        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              class="mr-1"
              color="primary"
              disabled
              height="48px"
              min-width="48px"
              width="48px"
            >
              <v-icon size="24px" color="white">mdi-floppy</v-icon>
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
              height="48px"
              min-width="48px"
              width="48px"
              disabled
              @click.stop="vbtnActivarModel = !vbtnActivarModel"
            >
              <v-icon size="24px" color="white">
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
            <v-btn
              color="primary"
              min-width="48px"
              width="48px"
              height="48px"
              v-bind="props"
              :to="'/nominas/gape/parametrizacionForm'"
            >
              <v-icon size="24px" color="white">mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Agregar nuevo</span>
        </v-tooltip>

        <!--v-btn
          min-width="48px"
          width="48px"
          height="48px"
          color="primary"
          style="font-size: 18px"
          density="comfortable"
        >
          <v-tooltip>
            <template v-slot:activator="{ props: tooltip }">
              <v-checkbox-btn v-bind="mergeProps(tooltip)" />
            </template>
            <span>Marque la casilla para activar este registro.</span>
          </v-tooltip>
        </v-btn-->
      </v-col>
    </v-row>
    <v-row>
      <v-col class="my-0 py-0"><v-divider class="border-opacity-25 ma-0 pa-0" /></v-col>
    </v-row>

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
            v-model:search="vdtbPrincipalBusqueda"
            :headers="vdtbPrincipalEncabezados"
            :items="vdtbPrincipalItems"
            item-value="title"
            hide-default-footer
            show-expand
            :mobile="smAndDown"
            :hover="true"
            :multi-sort="true"
            sort-asc-icon="mdi-arrow-down-thin"
            sort-desc-icon="mdi-arrow-up-thin"
          >
            <template v-slot:item.data-table-expand="{ internalItem, isExpanded, toggleExpand }">
              <v-btn
                :append-icon="isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                :text="isExpanded(internalItem) ? 'Ocultar conceptos' : 'Ver conceptos'"
                class="text-none"
                color="medium-emphasis"
                size="small"
                variant="text"
                border
                slim
                @click="toggleExpand(internalItem)"
              ></v-btn>
            </template>

            <template v-slot:expanded-row="{ columns, item }">
              <tr>
                <td :colspan="columns.length" class="py-2">
                  <v-data-table
                    hide-default-footer
                    v-model="itemsSeleccionados"
                    :headers="headers"
                    :hover="true"
                    :items="items"
                    :mobile="smAndDown"
                    eager
                    item-value="concepto"
                    :show-select="false"
                    color="transparent"
                  >
                    <template v-slot:item.seleccionado="{ item }">
                      <v-chip
                        :color="
                          itemsSeleccionados.some((i) => i === item.concepto) ? 'green' : 'red'
                        "
                        size="small"
                        label
                        variant="flat"
                      >
                        {{ itemsSeleccionados.some((i) => i === item.concepto) ? 'Sí' : 'No' }}
                      </v-chip>
                    </template>
                  </v-data-table>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <dialog-information
      :dialog-color="dialogInformation.color"
      :dialog-content="dialogInformation.cuerpo"
      :dialog-icon="dialogInformation.icono"
      :dialog-speed-icon="dialogInformation.velocidad"
      :dialog-title="dialogInformation.titulo"
      :dialog-view="dialogInformation.dialog"
      @close="onCloseDialogInformation"
    />
    <dialog-confirmation
      :dialog-content="dialogConfirmation.cuerpo"
      :dialog-event="dialogConfirmation.evento"
      :dialog-icon="dialogConfirmation.icono"
      :dialog-items="dialogConfirmation.items"
      :dialog-title="dialogConfirmation.titulo"
      :dialog-view="dialogConfirmation.dialog"
      @clickNo="onCloseDialogConfirmation"
      @clickYes="onClickYesDialogConfirmation"
    />
    <dialog-sistema
      :dialog-event="dialogSistemaPropiedades.evento"
      :dialog-items="dialogSistemaPropiedades.items"
      :dialog-title="dialogSistemaPropiedades.titulo"
      :dialog-view="dialogSistemaPropiedades.dialog"
      @close="onCloseDialogSistema"
      @cancel="onCloseDialogSistema"
      @save="onSaveDialogSistema"
    />
  </v-container>
</template>

<script lang="ts">
import { ref, defineComponent, toRaw, mergeProps, computed, onMounted } from 'vue'

import { useDisplay } from 'vuetify'

import DialogConfirmation from '../../../components/core/dialogMessage/DialogConfirmation.vue'
import DialogInformation from '../../../components/core/dialogMessage/DialogInformation.vue'
import DialogSistema from '../../../helpers/core/dialogForm/DialogSistema.vue'
import { sistemaStore } from '../../../stores/modules/Core/sistema'
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
  name: 'ParametrizacionList',
  components: { DialogInformation, DialogSistema, DialogConfirmation, BecTextField },

  setup() {
    const sistema = sistemaStore()

    // breadcrumbs
    const vbrePrincipalItems = ref([
      {
        disabled: false,
        href: 'breadcrumbs_dashboard',
        title: 'Parametrización',
      },
      {
        disabled: false,
        href: 'breadcrumbs_link_1',
        title: 'Listado',
      },
    ])

    const vbtnActivarModel = ref(true)
    const vbtnMenuExportarModel = ref(false)
    const vbtnMenuImportarModel = ref(false)

    // Tabla
    const vdtbPrincipalBusqueda = ref('')

    const vdtbPrincipalItemsPorPagina = ref(5)
    const vdtbPrincipalItemsSeleccionados = ref([])
    const vdtbPrincipalOpcionesCheck = ref([{ title: 'Eliminar' }, { title: 'Click Me2' }])
    const vdtbPrincipalOpcionesItemsPorPagina = ref([
      { titulo: '5', valor: 5 },
      { titulo: '10', valor: 10 },
      { titulo: '15', valor: 15 },
      { titulo: '20', valor: 20 },
      { titulo: 'Ver todos', valor: 0 },
    ])
    const vdtbPrincipalPaginaActual = ref(1)

    const getVdtPrincipalTotalPaginas = computed(() =>
      Math.ceil(vdtbPrincipalItems.value.length / vdtbPrincipalItemsPorPagina.value),
    )

    // Funcionalidad vuetify
    const { smAndDown } = useDisplay()

    const dialogSistemaPropiedades = ref({
      dialog: false,
      evento: '',
      items: {},
      titulo: '',
    })

    // DialogInformation
    const dialogInformation = ref({
      color: '',
      cuerpo: '',
      dialog: false,
      icono: '',
      titulo: '',
      velocidad: 0,
    })

    const onCloseDialogInformation = () => {
      dialogInformation.value.dialog = false
    }

    const onOpenDialogInformation = (
      color: string,
      cuerpo: string,
      icono: string,
      titulo: string,
      velocidad: number,
    ) => {
      dialogInformation.value = {
        color: color,
        cuerpo: cuerpo,
        dialog: true,
        icono: icono,
        titulo: titulo,
        velocidad: velocidad,
      }
    }

    // DialogConfirmation
    const dialogConfirmation = ref({
      cuerpo: '',
      dialog: false,
      evento: '',
      icono: '',
      items: {},
      titulo: '',
    })

    const onOpenDialogConfirmation = (
      cuerpo: string,
      evento: string,
      items: object,
      titulo: string,
    ) => {
      dialogConfirmation.value = {
        cuerpo: cuerpo,
        dialog: true,
        evento: evento,
        icono: 'alert',
        items: items,
        titulo: titulo,
      }
    }

    const onCloseDialogConfirmation = () => {
      dialogConfirmation.value.dialog = false
    }

    const onClickYesDialogConfirmation = (evento: Eventos, items: object) => {
      methods[evento](items)
    }

    // DialogSistema
    type Eventos = 'onSave' | 'onEdit' | 'onDelete'

    const methods: Record<Eventos, (...args: any[]) => void> = {
      onSave: () => {
        dialogSistemaPropiedades.value.dialog = false
        fnCargarListado()
      },
      onEdit: () => {
        dialogSistemaPropiedades.value.dialog = false
        fnCargarListado()
      },
      onDelete: async (items: Elementos) => {
        dialogConfirmation.value.dialog = false

        try {
          await sistema.destroySistema(items.id)
          onOpenDialogInformation(
            '#438701',
            sistema.object.message,
            'correct',
            'Registro eliminado',
            1,
          )
        } catch (error) {
          onOpenDialogInformation(
            '#438701',
            sistema.responseMessage,
            'incorrect',
            'Ocurrió un error en el registro guardado',
            1,
          )
        }
        fnCargarListado()
      },
    }

    const onOpenDialogSistema = (evento: string, items: object, titulo: string) => {
      dialogSistemaPropiedades.value = {
        dialog: true,
        evento: evento,
        items: items,
        titulo: titulo,
      }
    }

    const onCloseDialogSistema = () => {
      dialogSistemaPropiedades.value.dialog = false
    }

    const onSaveDialogSistema = (evento: Eventos) => {
      methods[evento]()
    }

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
    }

    onMounted(() => {
      //fnCargarListado()
    })

    // Computed

    const vbrePrincipalRef = ref()
    const vconPrincipalRef = ref()
    const vrowFiltrosRef = ref()
    const cardHeight = ref(0)
    const tableHeight = ref(0)

    const getCardHeight = computed(() => {
      if (vconPrincipalRef.value) {
        calcularDimensiones()
      }

      return `${cardHeight.value}px`
    })

    const getTableHeight = computed(() => {
      if (vconPrincipalRef.value) {
        calcularDimensiones()
      }

      return `${tableHeight.value}px !important`
    })

    const getTableNoDataHeight = computed(() => {
      if (vconPrincipalRef.value) {
        calcularDimensiones()
      }

      return `${tableHeight.value - 100}px !important`
    })

    const calcularDimensiones = () => {
      if (vconPrincipalRef.value) {
        cardHeight.value =
          vconPrincipalRef.value.$el.clientHeight -
          vbrePrincipalRef.value.$el.clientHeight -
          vrowFiltrosRef.value.$el.clientHeight -
          85

        tableHeight.value = cardHeight.value
      }
    }

    const rowProps = (item: any) => {
      const isSelected = vdtbPrincipalItemsSeleccionados.value.some((i) => i === item.codigo)

      return {
        class: isSelected ? '' : 'bg-blue-lighten-5',
      }
    }

    // DataTable

    const itemsSeleccionados = ref(['Sueldo IMSS'])
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

    const vdtbPrincipalEncabezados = ref<
      {
        key: string
        align?: 'start' | 'center' | 'end'
        title: string
        sortable?: boolean
        width?: string
      }[]
    >([
      {
        title: 'Cliente',
        key: 'cliente',
        align: 'start',
        sortable: false,
        width: '10%',
      },
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
        width: '10%',
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

    const vdtbPrincipalItems = ref([
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
    ])

    return {
      itemsSeleccionados,
      headers,
      items,
      onDragStart,
      onDrop,
      rowProps,
      vrowFiltrosRef,
      vbtnMenuExportarModel,
      vbtnMenuImportarModel,
      vbtnActivarModel,
      vbrePrincipalRef,
      vconPrincipalRef,
      getCardHeight,
      getTableHeight,
      getTableNoDataHeight,
      dialogConfirmation,
      dialogInformation,
      dialogSistemaPropiedades,
      getVdtPrincipalTotalPaginas,
      mergeProps,
      onClickYesDialogConfirmation,
      onCloseDialogConfirmation,
      onCloseDialogInformation,
      onCloseDialogSistema,
      onOpenDialogConfirmation,
      onOpenDialogInformation,
      onOpenDialogSistema,
      onSaveDialogSistema,
      smAndDown,
      toRaw,
      vbrePrincipalItems,
      vdtbPrincipalBusqueda,
      vdtbPrincipalEncabezados,
      vdtbPrincipalItems,
      vdtbPrincipalItemsPorPagina,
      vdtbPrincipalItemsSeleccionados,
      vdtbPrincipalOpcionesCheck,
      vdtbPrincipalOpcionesItemsPorPagina,
      vdtbPrincipalPaginaActual,
    }
  },
})
</script>
