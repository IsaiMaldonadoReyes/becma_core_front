<template>
  <v-select
    v-model=""
    :items="['Quincenal', 'Semanal']"
    chips
    clear-icon="mdi-close"
    clearable
    color="primary"
    density="compact"
    hide-details="auto"
    item-color="primary"
    label="Perioricidad"
    placeholder=""
    prepend-inner-icon="mdi-cash-clock"
    variant="outlined"
  >
    <template v-slot:prepend>
      <v-tooltip interactive>
        <template v-slot:activator="{ props: tooltip }">
          <v-icon
            v-bind="mergeProps(tooltip)"
            icon="mdi-information-slab-circle-outline"
            size="20"
          />
        </template>
        <span>
          Alimentar si la prima indica que es <b><i>ACTUALIZADA</i></b
          >, en caso de que indique que es <b><i>MEDIA</i></b> no es necesario alimentar.
        </span>
      </v-tooltip>
    </template>
  </v-select>
</template>

<script lang="ts">
import { ref, computed, defineComponent, mergeProps, onMounted, watch } from 'vue'

export default defineComponent({
  name: 'BecSelect',
  props: {
    tooltip: { type: String, required: false }, // antes 'ayuda'
    label: { type: String, required: true }, // antes 'etiqueta'
    prependIcon: { type: String, required: false }, // antes 'icono'
    items: { type: Array as PropType<object[]>, required: true }, // antes 'opciones'
    modelValue: { type: Array as PropType<any[]>, required: true }, // para usar v-model
    placeholder: { type: String, required: false },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const label = computed(() => props.label)
    const icon = computed(() => props.prependIcon)
    const tooltip = computed(() => props.tooltip)

    return { mergeProps }
  },
})
</script>
