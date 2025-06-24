<template>
  <v-select
    :items="['Quincenal', 'Semanal']"
    :label="label"
    chips
    clear-icon="mdi-close"
    clearable
    color="primary"
    density="compact"
    hide-details="auto"
    item-color="primary"
    :placeholder="placeholder"
    prepend-inner-icon="mdi-cash-clock"
    variant="outlined"
    v-model="modelValue"
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
          {{ tooltip }}
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
    items: { type: Array as PropType<object[]>, required: false },
    label: { type: String, required: false },
    modelValue: { type: Array as PropType<any[]>, required: false },
    placeholder: { type: String, required: false },
    prependIcon: { type: String, required: false },
    tooltip: { type: String, required: false },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const label = computed(() => props.label)
    const icon = computed(() => props.prependIcon)
    const tooltip = computed(() => props.tooltip)
    const modelValue = computed(() => props.modelValue)

    return { mergeProps, label, modelValue, tooltip }
  },
})
</script>
