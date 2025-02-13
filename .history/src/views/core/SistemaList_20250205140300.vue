<template>
  <v-container>
    <v-row dense>
      <v-col>
        <v-breadcrumbs class="text-h5" :items="vbrePrincipalItems" divider="|">
          <template v-slot:prepend>
            <v-icon icon="mdi-laptop" color="primary" />
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-divider class="border-opacity-25" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card width="100%" variant="elevated" elevation="10" rounded="lg">
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
            class="pa-5"
            item-value="codigo"
            show-select
            sort-asc-icon="mdi-arrow-down-thin"
            sort-desc-icon="mdi-arrow-up-thin"
          >
            <template v-slot:top>
              <v-row class="py-5">
                <v-col cols="12" md="6" class="d-flex align-center">
                  <v-text-field
                    v-model="vdtbPrincipalBusqueda"
                    clearable
                    density="compact"
                    flat
                    hide-details
                    placeholder="Buscar"
                    prepend-inner-icon="mdi-magnify"
                    rounded="xl"
                    single-line
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12" md="6" class="d-flex justify-end align-center">
                  <v-tooltip>
                    <template v-slot:activator="{ props: tooltip }">
                      <v-btn-group
                        v-bind="mergeProps(tooltip)"
                        class="border-opacity-25"
                        color="primary"
                        density="comfortable"
                        divided
                        rounded="xl"
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
                            rounded="xl"
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
                      Escriba o seleccione la cantidad de registros que desea ver por página en la
                      tabla.
                    </span>
                  </v-tooltip>
                  <v-btn
                    class="ml-5"
                    color="primary"
                    icon
                    rounded="xl"
                    size="small"
                    @click="onOpenDialogSistema('onSave', {}, 'Nuevo sistema')"
                  >
                    <v-icon icon="mdi-plus" size="x-large" />
                  </v-btn>
                </v-col>
              </v-row>
              <v-divider class="border-opacity-25" />
            </template>
            <template v-slot:header.data-table-select="{ allSelected, selectAll, someSelected }">
              <v-btn-group
                class="border-opacity-25"
                color="primary"
                density="compact"
                divided
                rounded="xl"
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
                        true-icon="mdi-checkbox-multiple-marked-outline"
                        @update:model-value="selectAll(!allSelected)"
                        class="pa-0"
                      />
                    </template>
                    <span>Seleccionar todo</span>
                  </v-tooltip>
                </v-btn>

                <v-menu>
                  <template v-slot:activator="{ props: menu }">
                    <v-tooltip>
                      <template v-slot:activator="{ props: tooltip }">
                        <v-btn icon="mdi-menu-down" v-bind="mergeProps(menu, tooltip)" />
                      </template>
                      <span>Acciones</span>
                    </v-tooltip>
                  </template>
                  <v-list>
                    <v-list-item v-for="(item, index) in vdtbPrincipalOpcionesCheck" :key="index">
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn-group>
            </template>
            <template v-slot:item.data-table-select="{ internalItem, isSelected, toggleSelect }">
              <v-checkbox-btn
                :model-value="isSelected(internalItem)"
                color="primary"
                true-icon="mdi-checkbox-marked-outline"
                @update:model-value="toggleSelect(internalItem)"
              />
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon
                class="me-2"
                icon="mdi-pencil"
                size="small"
                color="primary"
                @click="onOpenDialogSistema('onEdit', item, 'Editar sistema')"
              />
              <v-divider class="mx-3 align-self-center" length="24" thickness="2" vertical />
              <v-icon
                icon="mdi-delete"
                size="small"
                color="primary"
                @click="
                  onOpenDialogConfirmation(
                    `Esta acción eliminará ${item.codigo} de forma definitiva. ¿Desea continuar?`,
                    'onDelete',
                    item,
                    `Eliminar ${item.codigo}`,
                  )
                "
              />
            </template>
            <template v-slot:no-data>
              <v-card border class="my-5 pa-10 text-center" color="transparent" elevation="0">
                <v-icon color="grey-lighten-1" size="60" icon="mdi-database-remove" />
                <v-card-text class="text-grey-darken-1"> No se encontraron registros. </v-card-text>
              </v-card>
            </template>
            <template v-slot:bottom>
              <v-divider class="border-opacity-25 pt-5" />
              <v-pagination
                v-model="vdtbPrincipalPaginaActual"
                :length="getVdtPrincipalTotalPaginas"
                :total-visible="5"
                active-color="primary"
                color="primary"
                rounded="circle"
                show-first-last-page
                variant="tonal"
              />
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
import { ref, defineComponent, toRaw, mergeProps, computed } from 'vue'

import { useDisplay } from 'vuetify'

import DialogInformation from '../../components/mensaje/DialogInformation.vue'
import DialogSistema from '../../helpers/dialogForms/DialogSistema.vue'
import DialogConfirmation from '../../components/mensaje/DialogConfirmation.vue'

export interface Elementos {
  codigo: string
  descripcion: string
  nombre: string
}

export default defineComponent({
  name: 'SistemaListado',
  components: { DialogInformation, DialogSistema, DialogConfirmation },

  setup() {
    // breadcrumbs
    const vbrePrincipalItems = ref([
      {
        disabled: false,
        href: 'breadcrumbs_dashboard',
        title: 'Sistema',
      },
      {
        disabled: false,
        href: 'breadcrumbs_link_1',
        title: 'Listado',
      },
    ])

    // Tabla
    const vdtbPrincipalBusqueda = ref('')
    const vdtbPrincipalEncabezados = ref<
      { key: string; align?: 'start' | 'center' | 'end'; title: string; sortable?: boolean }[]
    >([
      { key: 'nombre', align: 'start', title: 'Nombre', sortable: true },
      { key: 'codigo', align: 'center', title: 'Código', sortable: true },
      { key: 'descripcion', align: 'start', title: 'Descripción', sortable: true },
      { key: 'fecha', align: 'center', title: 'Fecha' },
      { title: 'Actions', key: 'actions', sortable: false, align: 'end' },
    ])
    const vdtbPrincipalItems = ref([
      {
        nombre: 'Comercial',
        codigo: '01CONTPAQ',
        descripcion: '0.1',
        fecha: '16-01-2025',
      },
      {
        nombre: 'Nóminas',
        codigo: '02CONTPAQ',
        descripcion: '0.1',
        fecha: '16-01-2025',
      },
      {
        nombre: 'Contabilidad',
        codigo: '03CONTPAQ',
        descripcion: '0.1',
        fecha: '16-01-2025',
      },
    ])
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
        alert('Save new')
        dialogSistemaPropiedades.value.dialog = false
      },
      onEdit: () => {
        dialogSistemaPropiedades.value.dialog = false
        onOpenDialogInformation(
          '#438701',
          `Se guardo correctamente`,
          'correct',
          'Registro guardado',
          1,
        )
      },
      onDelete: (items: Elementos) => {
        dialogConfirmation.value.dialog = false
        onOpenDialogInformation(
          '#438701',
          `Esta acción eliminará ${items.codigo} de forma definitiva. ¿Desea continuar?`,
          'correct',
          'Registro eliminado',
          1,
        )
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

    return {
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
