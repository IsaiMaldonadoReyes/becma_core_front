<template>
  <v-container>
    <v-row density="compact">
      <v-col>
        <v-breadcrumbs class="text-h5" :items="vbrePrincipalItems" divider="|">
          <template v-slot:prepend>
            <v-icon icon="mdi-laptop" color="primary"></v-icon>
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
                            density="compact"
                            hide-details
                            max="15"
                            min="1"
                            rounded="xl"
                            type="number"
                            variant="plain"
                            @update:model-value="vdtbPrincipalItemsPorPagina = parseInt($event, 10)"
                            class="mb-1 pb-1"
                            width="50"
                          ></v-text-field>
                        </v-btn>

                        <v-menu>
                          <template v-slot:activator="{ props: menu }">
                            <v-btn icon="mdi-menu-down" v-bind="mergeProps(menu, tooltip)"></v-btn>
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
                    @click="onOpenDFSistema"
                  >
                    <v-icon icon="mdi-plus" size="x-large"> </v-icon
                  ></v-btn>
                </v-col>
              </v-row>

              <v-divider class="border-opacity-25"></v-divider>
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
                <v-btn density="compact">
                  <v-tooltip>
                    <template v-slot:activator="{ props: tooltip }">
                      <v-checkbox-btn
                        v-bind="mergeProps(tooltip)"
                        :indeterminate="someSelected && !allSelected"
                        :model-value="allSelected"
                        density="compact"
                        @update:model-value="selectAll(!allSelected)"
                      >
                      </v-checkbox-btn>
                    </template>
                    <span>Seleccionar todo</span>
                  </v-tooltip>
                </v-btn>

                <v-menu>
                  <template v-slot:activator="{ props: menu }">
                    <v-tooltip>
                      <template v-slot:activator="{ props: tooltip }">
                        <v-btn icon="mdi-menu-down" v-bind="mergeProps(menu, tooltip)"></v-btn>
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
                @update:model-value="toggleSelect(internalItem)"
              ></v-checkbox-btn>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon class="me-2" size="small" @click="onOpenDFSistema"> mdi-pencil </v-icon>
              <v-divider
                class="mx-3 align-self-center"
                length="24"
                thickness="2"
                vertical
              ></v-divider>
              <v-icon size="small" @click="onOpenDialogAction('onEditSistema')">
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:bottom>
              <v-divider class="border-opacity-25 pt-5"></v-divider>
              <v-pagination
                active-color="primary"
                v-model="vdtbPrincipalPaginaActual"
                :length="getVdtPrincipalTotalPaginas"
                show-first-last-page
                rounded="circle"
                color="primary"
                :total-visible="5"
                variant="tonal"
              ></v-pagination>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card width="100%" variant="elevated" elevation="10" rounded="lg">
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  clearable
                  label="Nombre"
                  placeholder="Nombre del sistema"
                  prepend-inner-icon="mdi-laptop"
                  variant="outlined"
                >
                  <template v-slot:prepend>
                    <v-tooltip>
                      <template v-slot:activator="{ props: tooltip }">
                        <v-icon
                          icon="mdi-information-outline"
                          v-bind="mergeProps(tooltip)"
                        ></v-icon>
                      </template>
                      <span>Mensaje de ayuda o informativo del campo.</span>
                    </v-tooltip>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  clearable
                  label="Código"
                  placeholder="Código del sistema"
                  prepend-inner-icon="mdi-barcode"
                  variant="outlined"
                >
                  <template v-slot:prepend>
                    <v-tooltip>
                      <template v-slot:activator="{ props: tooltip }">
                        <v-icon
                          icon="mdi-information-outline"
                          v-bind="mergeProps(tooltip)"
                        ></v-icon>
                      </template>
                      <span>Mensaje de ayuda o informativo del campo.</span>
                    </v-tooltip>
                  </template>
                </v-text-field>
              </v-col>
              <v-col>
                <v-textarea
                  auto-grow
                  clearable
                  label="Descripción"
                  placeholder="Descripción del sistema"
                  prepend-inner-icon="mdi-text"
                  variant="outlined"
                  rows="1"
                >
                  <template v-slot:prepend>
                    <v-tooltip>
                      <template v-slot:activator="{ props: tooltip }">
                        <v-icon
                          icon="mdi-information-outline"
                          v-bind="mergeProps(tooltip)"
                        ></v-icon>
                      </template>
                      <span>Mensaje de ayuda o informativo del campo.</span>
                    </v-tooltip>
                  </template>
                </v-textarea>
              </v-col>
              <v-col>
                <v-tooltip>
                  <template v-slot:activator="{ props: tooltip }">
                    <v-checkbox
                      v-bind="mergeProps(tooltip)"
                      color="success"
                      false-icon="mdi-checkbox-blank-circle-outline"
                      label="Es activo"
                      true-icon="mdi-checkbox-marked-circle-outline"
                    ></v-checkbox>
                  </template>
                  <span>Marque o desmarque la casilla para activar o desactivar el registro.</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <dialog-action
      :dialog-color="dialogPropiedades.color"
      :dialog-content="dialogPropiedades.cuerpo"
      :dialog-route="dialogPropiedades.ruta"
      :dialog-speed="dialogPropiedades.velocidad"
      :dialog-text-button="dialogPropiedades.boton"
      :dialog-title="dialogPropiedades.titulo"
      :dialog-view="dialogPropiedades.dialog"
      :dialog-event="dialogPropiedades.evento"
      @closeDialog="cerrardialogPropiedades"
      @clickYes="onSaveSistema"
    />
    <dialog-sistema
      :dialog-color="dmSistemaPropiedades.color"
      :dialog-content="dmSistemaPropiedades.cuerpo"
      :dialog-route="dmSistemaPropiedades.ruta"
      :dialog-speed="dmSistemaPropiedades.velocidad"
      :dialog-text-button="dmSistemaPropiedades.boton"
      :dialog-title="dmSistemaPropiedades.titulo"
      :dialog-view="dmSistemaPropiedades.dialog"
      @cerrarDialog="onCloseDFSistema"
    />
  </v-container>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, onUnmounted, mergeProps, computed } from 'vue'
import { useDisplay } from 'vuetify'

import DialogAction from '../../components/DialogAction.vue'
import DialogSistema from '../../helpers/dialogForms/DialogSistema.vue'

export default defineComponent({
  name: 'SistemaListado',
  components: { DialogAction, DialogSistema },

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

    const dialogPropiedades = ref({
      dialog: false,
      titulo: '',
      cuerpo: '',
      ruta: '',
      color: '',
      boton: '',
      velocidad: 0,
      componente: '',
      evento: '',
    })

    function cerrardialogPropiedades() {
      dialogPropiedades.value.dialog = false
    }

    function onOpenDialogAction(evento: string) {
      dialogPropiedades.value = {
        dialog: true,
        titulo: 'Eliminar registro',
        cuerpo: 'Esta acción eliminará el registro de forma definitiva. ¿Deseas continuar?',
        ruta: 'alert',
        color: '#285697',
        boton: 'Aceptar',
        velocidad: 0.8,
        componente: '',
        evento: evento,
      }
    }

    const dmSistemaPropiedades = ref({
      dialog: false,
      titulo: '',
      cuerpo: '',
      ruta: '',
      color: '',
      boton: '',
      velocidad: 0,
      componente: '',
    })

    function onCloseDFSistema() {
      dmSistemaPropiedades.value.dialog = false
    }

    function onOpenDFSistema() {
      console.log('Hola')

      dmSistemaPropiedades.value = {
        dialog: true,
        titulo: 'Sistema',
        cuerpo: 'Por favor, asegúrese de llenar todos los campos requeridos para poder continuar.',
        ruta: 'correct',
        color: '#438701',
        boton: 'Aceptar',
        velocidad: 1,
        componente: '',
      }
    }

    function onSaveSistema(evento: string) {
      ;[evento]()
    }

    function onEditSistema() {
      alert('Edit')
    }

    return {
      dialogPropiedades,
      cerrardialogPropiedades,
      onOpenDialogAction,
      onSaveSistema,
      dmSistemaPropiedades,
      onEditSistema,
      onCloseDFSistema,
      onOpenDFSistema,
      getVdtPrincipalTotalPaginas,
      mergeProps,
      smAndDown,
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

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
