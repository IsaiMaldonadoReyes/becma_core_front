<template>
  <v-container>
    <v-row>
      <v-breadcrumbs :items="vbrePrincipalItems" divider="|">
        <template v-slot:prepend>
          <v-icon icon="mdi-laptop" color="primary"></v-icon>
        </template>
      </v-breadcrumbs>
    </v-row>
    <v-row>
      <v-divider />
    </v-row>
    <v-row class="py-3">
      <v-col>
        <v-card width="100%" variant="elevated" elevation="10" rounded="lg">
          <v-data-table
            v-model="vdtbPrincipalItemsSeleccionados"
            v-model:search="vdtbPrincipalBusqueda"
            :headers="vdtbPrincipalEncabezados"
            :items="vdtbPrincipalItems"
            :mobile="smAndDown"
            :multi-sort="true"
            :sticky="true"
            item-value="codigo"
            show-select
            sort-asc-icon="mdi-arrow-down-thin"
            sort-desc-icon="mdi-arrow-up-thin"
            class="pa-5"
            :hover="true"
            :items-per-page="vdtbPrincipalItemsPorPagina"
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
                    label="Buscar"
                    prepend-inner-icon="mdi-magnify"
                    rounded="xl"
                    single-line
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex justify-end">
                  <v-btn-group variant="outlined" divided rounded="xl" density="comfortable">
                    <v-btn density="compact">
                      <v-tooltip>
                        <template v-slot:activator="{ props: tooltip }">
                          <v-text-field
                            v-bind="mergeProps(tooltip)"
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
                        </template>
                        <span>
                          Escriba o seleccione la cantidad de registros que desea ver por página en
                          la tabla.
                        </span>
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
                      <v-list color="primary" v-model:selected="vdtbPrincipalItemsSeleccionados">
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
                </v-col>
              </v-row>

              <v-divider></v-divider>
            </template>
            <template v-slot:header.data-table-select="{ allSelected, selectAll, someSelected }">
              <v-btn-group variant="outlined" divided rounded="xl" density="compact">
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
              <v-pagination
                v-model="vdtbPrincipalPaginaActual"
                :length="getVdtPrincipalTotalPaginas"
                show-first-last-page
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
    const vdtbPrincipalEncabezados = ref([
      {
        key: 'nombre',
        align: 'start',
        title: 'Nombre',
      },
      { key: 'codigo', align: 'center', title: 'Código' },
      { key: 'decripcion', title: 'Descripción' },
      { key: 'fecha', align: 'center', title: 'Fecha' },
    ])
    const vdtbPrincipalItems = ref([
      {
        nombre: 'Comercial',
        codigo: '01CONTPAQ',
        decripcion: '0.1',
        fecha: '16-01-2025',
      },
      {
        nombre: 'Nóminas',
        codigo: '02CONTPAQ',
        decripcion: '0.1',
        fecha: '16-01-2025',
      },
      {
        nombre: 'Contabilidad',
        codigo: '03CONTPAQ',
        decripcion: '0.1',
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
