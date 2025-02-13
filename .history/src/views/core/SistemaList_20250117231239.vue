<template>
  <v-container>
    <v-row>
      <v-col>
        <v-breadcrumbs :items="vbrePrincipalItems" divider="|">
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
                <v-col>
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
                <v-col class="d-flex justify-end">
                  <v-tooltip>
                    <template v-slot:activator="{ props: tooltip }">
                      <v-btn-group
                        v-bind="mergeProps(tooltip)"
                        class="border-opacity-25"
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
                </v-col>
              </v-row>

              <v-divider class="border-opacity-25"></v-divider>
            </template>
            <template v-slot:header.data-table-select="{ allSelected, selectAll, someSelected }">
              <v-btn-group
                class="border-opacity-25"
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
                        color="primary"
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
            <template v-slot:bottom>
              <v-divider class="border-opacity-25 pt-5" color="primary"></v-divider>
              <v-pagination
                active-color="primary"
                v-model="vdtbPrincipalPaginaActual"
                :length="getVdtPrincipalTotalPaginas"
                show-first-last-page
                rounded="circle"
                color="primary"
                :total-visible="7"
                variant="elevated"
              ></v-pagination>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, onUnmounted, mergeProps, computed } from 'vue'
import { useDisplay } from 'vuetify'
export default defineComponent({
  name: 'SistemaListado',
  components: {},

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
      { key: string; align?: 'start' | 'center' | 'end'; title: string }[]
    >([
      { key: 'nombre', align: 'start', title: 'Nombre' },
      { key: 'codigo', align: 'center', title: 'Código' },
      { key: 'descripcion', align: 'start', title: 'Descripción' },
      { key: 'fecha', align: 'center', title: 'Fecha' },
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
    return {
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
