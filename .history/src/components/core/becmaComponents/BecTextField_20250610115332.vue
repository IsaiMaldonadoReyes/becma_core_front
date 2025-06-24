<template>
  <v-text-field
    v-model="model"
    :label="label"
    :placeholder="placeholder"
    :prepend-inner-icon="prependIcon"
    :rules="rules"
    clear-icon="mdi-close"
    clearable
    color="primary"
    density="compact"
    hide-details="auto"
    variant="outlined"
  >
    <template v-if="tooltip" v-slot:prepend>
      <v-tooltip interactive>
        <template v-slot:activator="{ props: tooltipProps }">
          <v-icon
            v-bind="mergeProps(tooltipProps)"
            icon="mdi-information-slab-circle-outline"
            size="20"
          />
        </template>
        <span v-html="tooltip"></span>
      </v-tooltip>
    </template>
  </v-text-field>
</template>

<script lang="ts">
import { defineComponent, computed, mergeProps, PropType } from 'vue'

export default defineComponent({
  name: 'BecTextField',
  props: {
    modelValue: {
      type: [String, Number, Object, Array] as PropType<any>,
      required: true,
    },
    label: String,
    placeholder: String,
    prependIcon: String,
    tooltip: String,
    rules: {
      type: Array as PropType<((v: any) => true | string)[]>,
      default: () => [],
    },
    onModelUpdate: Function as PropType<(val: any) => void>,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: (val) => {
        emit('update:modelValue', val) // 🔧 actualiza el v-model en el padre
        if (props.onModelUpdate) {
          props.onModelUpdate(val) // 🔧 llama  función personalizada desde el Padre
        }
      },
    })

    const label = computed(() => props.label)
    const placeholder = computed(() => props.placeholder)
    const prependIcon = computed(() => props.prependIcon)
    const rules = computed(() => props.rules)
    const tooltip = computed(() => props.tooltip)

    return {
      label,
      mergeProps,
      model,
      placeholder,
      prependIcon,
      rules,
      tooltip,
    }
  },
})
</script>
