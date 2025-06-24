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
  >
    <template v-slot:chip="{ props, item }">
      <v-chip v-bind="props" :text="item.raw" color="primary" variant="flat" />
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
