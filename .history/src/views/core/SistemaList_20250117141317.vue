<template>
  <div class="about">
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      item-value="codigo"
      show-select
    >
      <template v-slot:header.data-table-select="{ allSelected, selectAll, someSelected }">
        <v-btn-group variant="outlined" divided rounded="xl" height="auto">
          <v-btn color="black" density="compact">
            <v-checkbox-btn
              base-color="black"
              density="compact"
              color="primary"
              :indeterminate="someSelected && !allSelected"
              :model-value="allSelected"
              @update:model-value="selectAll(!allSelected)"
            >
            </v-checkbox-btn>
          </v-btn>

          <v-menu>
            <template v-slot:activator="{ props: menu }">
              <v-tooltip location="top">
                <template v-slot:activator="{ props: tooltip }">
                  <v-btn color="primary" icon="mdi-menu-down" v-bind="mergeProps(menu, tooltip)">
                  </v-btn>
                </template>
                <span>I'm A Tooltip</span>
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
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, onUnmounted, mergeProps } from 'vue'

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

    return { items, selected, headers, mergeProps, opcionesMenu }
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
