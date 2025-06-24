<template>
  <v-select
    v-model="selected"
    :items="groupedItems"
    :label="label"
    :placeholder="placeholder"
    :prepend-inner-icon="icon"
    item-title="etiqueta"
    item-value="id"
    return-object
    clearable
    clear-icon="mdi-close"
    color="primary"
    density="compact"
    variant="outlined"
    hide-details="auto"
    persistent-hint
  >
    <template v-slot:prepend>
      <v-tooltip v-if="tooltip">
        <template #activator="{ props: tooltipProps }">
          <v-icon
            icon="mdi-information-slab-circle-outline"
            v-bind="mergeProps(tooltipProps)"
            size="20"
          />
        </template>
        <span v-html="tooltip" />
      </v-tooltip>
    </template>
    <template #selection="{ item, index }">
      <v-chip :key="index" color="primary" variant="flat">
        {{ item.title }}
      </v-chip>
    </template>
  </v-select>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { mergeProps } from 'vuetify/lib/util/helpers'

export interface Item {
  id: number
  idSistema: number
  idPadre: number
  isActive: boolean
  nombre: string
  descripcion: string
  etiqueta: string
  ruta: string
  icono: string
  orden: number
}

// Props
defineProps<{
  label: string
  placeholder?: string
  icon?: string
  tooltip?: string
}>()

const selected = defineModel<Item | null>()

// Data
const rawItems = ref<Item[]>([])

const groupedItems = computed(() => {
  const padres = rawItems.value.filter((item) => item.idPadre === 0)
  const hijos = rawItems.value.filter((item) => item.idPadre !== 0)

  return padres.map((padre) => {
    return {
      title: padre.etiqueta,
      children: hijos
        .filter((hijo) => hijo.idPadre === padre.id)
        .map((hijo) => ({
          ...hijo,
          title: hijo.etiqueta,
        })),
    }
  })
})

// Carga simulada (puedes conectar a la API real aquí)
onMounted(async () => {
  try {
    // const res = await axios.get('https://api.tusistema.com/items')
    // rawItems.value = res.data
    rawItems.value = [
      {
        id: 1,
        idSistema: 1,
        idPadre: 0,
        isActive: true,
        nombre: 'becore',
        descripcion: 'Core',
        etiqueta: 'BECORE',
        ruta: '',
        icono: 'mdi-robot',
        orden: 1,
      },
      {
        id: 2,
        idSistema: 2,
        idPadre: 0,
        isActive: true,
        nombre: 'becloud',
        descripcion: 'Cloud',
        etiqueta: 'BECLOUD',
        ruta: '',
        icono: 'mdi-cloud',
        orden: 2,
      },
      {
        id: 5,
        idSistema: 2,
        idPadre: 2,
        isActive: true,
        nombre: 'respaldos',
        descripcion: 'Respaldos',
        etiqueta: 'Respaldos',
        ruta: '',
        icono: 'mdi-cloud',
        orden: 1,
      },
      {
        id: 6,
        idSistema: 4,
        idPadre: 4,
        isActive: true,
        nombre: 'panel',
        descripcion: 'Panel',
        etiqueta: 'Panel',
        ruta: '',
        icono: 'mdi-chart-bar',
        orden: 1,
      },
    ]
  } catch (e) {
    console.error('Error cargando items', e)
  }
})
</script>
