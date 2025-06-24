<template>
  <v-select
    v-model="model"
    :items="['Quincenal', 'Semanal']"
    :label="label"
    :multiple="multiple"
    :placeholder="placeholder"
    :rules="rules"
    chips
    clear-icon="mdi-close"
    clearable
    color="primary"
    density="compact"
    hide-details="auto"
    item-color="primary"
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
    rules: {
      type: Array as PropType<((v: any) => true | string)[]>,
      default: () => [],
    },
    modelEvent: {
      type: String,
      default: 'update:modelValue',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const label = computed(() => props.label)
    const prependIcon = computed(() => props.prependIcon)
    const tooltip = computed(() => props.tooltip)
    const model = computed({
      get: () => props.modelValue,
      set: (val) => emit(props.modelEvent, val),
    })

    return { mergeProps, label, model, tooltip }
  },
})
</script>
