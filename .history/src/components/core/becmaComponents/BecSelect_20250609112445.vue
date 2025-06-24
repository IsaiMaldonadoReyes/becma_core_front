<template>
  <v-select
    :items="['Quincenal', 'Semanal']"
    chips
    clear-icon="mdi-close"
    clearable
    color="primary"
    hide-details="auto"
    item-color="primary"
    label="Perioricidad"
    placeholder=""
    prepend-inner-icon="mdi-cash-clock"
    variant="outlined"
    density="compact"
  >
    <template v-slot:prepend>
      <v-tooltip interactive>
        <template v-slot:activator="{ props: tooltip }">
          <v-icon
            icon="mdi-information-slab-circle-outline"
            v-bind="mergeProps(tooltip)"
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
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'BecSelect',
  props: {},
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return {}
  },
})
</script>
