<template>
  <v-container>
    <v-row>
      <v-breadcrumbs :items="breadcrumbs" divider="|">
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
        <v-card width="100%" variant="elevated">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="items"
            :mobile="smAndDown"
            :multi-sort="true"
            :sticky="true"
            item-value="codigo"
            show-select
            sort-asc-icon="mdi-arrow-down-thin"
            sort-desc-icon="mdi-arrow-up-thin"
            class="pa-5"
          >
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
                    <v-list-item v-for="(item, index) in opcionesMenu" :key="index">
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
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, onUnmounted, mergeProps } from 'vue'
import { useDisplay } from 'vuetify'
export default defineComponent({
  name: 'SistemaList',
  components: {},

  setup() {
    const headers = ref([
      {
        align: 'start',
        key: 'nombre',
        title: 'Nombre',
      },
      { key: 'codigo', title: 'Código' },
      { key: 'decripcion', title: 'Descripción' },
      { key: 'fecha', title: 'Fecha' },
    ])

    const items = ref([
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
        nombre: 'Nóminas',
        codigo: '03CONTPAQ',
        decripcion: '0.1',
        fecha: '16-01-2025',
      },
    ])

    const selected = ref([])

    const opcionesMenu = ref([{ title: 'Eliminar' }, { title: 'Click Me2' }])

    const breadcrumbs = ref([
      {
        title: 'Sistema',
        disabled: false,
        href: 'breadcrumbs_dashboard',
      },
      {
        title: 'Listado',
        disabled: false,
        href: 'breadcrumbs_link_1',
      },
    ])

    const { smAndDown } = useDisplay()
    return { items, selected, headers, mergeProps, opcionesMenu, smAndDown, breadcrumbs }
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
