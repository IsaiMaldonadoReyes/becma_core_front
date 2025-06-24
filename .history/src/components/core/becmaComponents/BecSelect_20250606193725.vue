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
      <v-tooltip v-if="tooltip" interactive>
        <template v-slot:activator="{ props: tooltipProps }">
          <v-icon :icon="icon" v-bind="mergeProps(tooltipProps)" size="20" />
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

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { mergeProps } from 'vuetify/lib/util/helpers'
// import axios from 'axios' // Descomentar para uso real

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

export default defineComponent({
  name: 'BecSelect',
  props: {
    label: { type: String, required: true },
    placeholder: { type: String, default: '' },
    icon: { type: String, default: 'mdi-apps' },
    tooltip: { type: String, default: '' },
    modelValue: { type: Object as () => Item | null, default: null },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selected = ref(props.modelValue)

    // Emit on change
    watch(selected, (val) => {
      emit('update:modelValue', val)
    })

    // Datos simulados (puedes usar axios aquí)
    const rawItems = ref<Item[]>([])

    const groupedItems = computed(() => {
      const padres = rawItems.value.filter((i) => i.idPadre === 0)
      const hijos = rawItems.value.filter((i) => i.idPadre !== 0)

      return padres.map((padre) => ({
        title: padre.etiqueta,
        children: hijos
          .filter((hijo) => hijo.idPadre === padre.id)
          .map((hijo) => ({
            ...hijo,
            title: hijo.etiqueta,
          })),
      }))
    })

    onMounted(() => {
      // const res = await axios.get('/api/items')
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
        {
          id: 4,
          idSistema: 4,
          idPadre: 0,
          isActive: true,
          nombre: 'becom',
          descripcion: 'Comercial',
          etiqueta: 'BECOM',
          ruta: '',
          icono: 'mdi-chart-bar',
          orden: 3,
        },
        {
          id: 7,
          idSistema: 4,
          idPadre: 4,
          isActive: true,
          nombre: 'dashboard',
          descripcion: 'Dashboard',
          etiqueta: 'Dashboard',
          ruta: '',
          icono: 'mdi-monitor-dashboard',
          orden: 1,
        },
      ]
    })

    return {
      selected,
      groupedItems,
      mergeProps,
    }
  },
})
</script>
