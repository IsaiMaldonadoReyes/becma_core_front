<template>
  <div class="about">
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      item-value="name"
      show-select
    >
      <template v-slot:header.data-table-select="{ allSelected, selectAll, someSelected }">
        <v-checkbox-btn
          false-icon="mdi-white-balance-sunny"
          true-icon="mdi-moon-waning-crescent"
          base-color="black"
          color="primary"
          :indeterminate="someSelected && !allSelected"
          :model-value="allSelected"
          @update:model-value="selectAll(!allSelected)"
        ></v-checkbox-btn>
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
import { ref, defineComponent, onMounted, onUnmounted } from 'vue'

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

    return { items, selected, headers }
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
